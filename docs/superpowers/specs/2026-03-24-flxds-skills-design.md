# FlowX Design System Skills — Design Document

> Two independent Claude Code skills for extracting Figma component data and creating/editing design system documentation pages.

---

## Problem

The current workflow uses a single monolithic instruction file (`component-create-v2.md`) that covers both Figma extraction and page creation. This means:
- Cannot re-extract Figma data without also rebuilding the page
- Cannot create/edit a page independently when the data file already exists
- No diff summary when re-extracting — hard to know what changed
- No smart edit detection — pages are rebuilt from scratch even for minor spec changes
- The instruction file isn't a proper skill — it doesn't auto-trigger from natural language

## Solution

Two project-local Claude Code skills with shared reference files.

### File Structure

```
.claude/skills/
├── flxds_extract.md              # Figma extraction skill
├── flxds_page.md                 # Page create/edit skill
└── references/
    ├── vibma-tools.md            # Vibma MCP tool reference
    ├── component-spec.md         # ComponentSpec type & conventions
    └── page-conventions.md       # Page styling & shared components
```

### Content Boundary: Skill Files vs. Reference Files

**Skill files** contain the **workflow** — step-by-step instructions, decision logic, precondition checks, and output format. They tell Claude Code *what to do and in what order*.

**Reference files** contain **lookup tables and conventions** — tool parameter references, type field descriptions, styling rules, API tables. They tell Claude Code *how to do specific sub-tasks correctly*. Each reference file should be kept under 300 lines to manage context window consumption.

Skills reference the files explicitly with `Read .claude/skills/references/[name].md` instructions at the step where the knowledge is needed.

---

## Skill 1: `flxds_extract`

### Purpose

Extract component properties from a selected Figma component set via Vibma MCP into a `ComponentSpec` data file. Produces a diff summary when re-extracting.

### Trigger Description

```
Extract component properties from Figma via Vibma MCP into a ComponentSpec data file.
Use when: extracting a component from Figma, pulling component data from Figma,
inspecting a Figma component, getting component properties, scanning a component,
"extract", "pull from Figma", "scan component", "get from Figma",
"add component from Figma", "re-extract", "update from Figma",
or any task involving reading a Figma component's variants/props/styles/tokens
into the FlowX design system data layer.
```

### Preconditions

1. Vibma MCP is connected (verify with `mcp__Vibma__get_selection`)
2. A component SET is selected in Figma (not a single variant — must have child variants)
3. If a data file already exists for this component, note it — we're in "re-extract" mode

### Slug Derivation

The component slug is derived from the Figma component set name by converting to lowercase kebab-case: "Input Field" becomes `input-field`, "Checkbox Group" becomes `checkbox-group`, "Button" becomes `button`.

### Workflow

```
1. PRECONDITION CHECK
   - Verify Vibma connected + component set selected
   - If selection is a single component (not a set), tell the user to select
     the parent component set and stop
   - Detect if data file already exists (re-extract mode)
   - If re-extract: read the existing .ts data file as source text and save
     it in memory as the "before" snapshot for later diff comparison

2. SEVEN-PASS EXTRACTION (Read .claude/skills/references/vibma-tools.md)
   Pass 1: Enumerate variants (get_selection depth:1)
   Pass 2: Structure & layout (get_node_info on EVERY variant)
   Pass 3: Typography + text colors (scan_text_nodes then get_node_info for fills)
   Pass 4: Token bindings (get_node_variables)
   Pass 5: Icons & vectors (search_nodes + get_node_info + PNG export)
   Pass 6: Screenshot (export_node_as_image PNG scale:2)
   Pass 7: Lint (lint_node)

3. DATA ASSEMBLY (Read .claude/skills/references/component-spec.md)
   - Choose base variant (all defaults, all toggles ON)
   - Build elements array from base variant
   - Build variantStyles — one per variant, only diffs from base
   - Build tokenBindings — deduplicated
   - Populate standard spec fields
   - Construct figmaLink: use mcp__Vibma__search_nodes with types: ["COMPONENT_SET"]
     to find the node ID, then build URL using file key from existing components
     (e.g., aGMqzHMsAiwCUU5DSgUe1S) and node ID (colon replaced with dash):
     https://www.figma.com/design/{fileKey}/?node-id={nodeId}
   - Run validation checklist

4. WRITE DATA FILE
   - Create/update src/lib/components-data/[slug].ts
   - Register in registry.ts (if new component)
   - If updating: warn that any manual edits to the data file will be overwritten

5. DIFF SUMMARY (if re-extract)
   - Compare the "before" snapshot (source text) against the newly written file
   - Report: added/removed variants, changed colors/fills/strokes, new/removed
     elements, modified token bindings, typography changes
   - Flag if page preview likely needs structural updates (new elements,
     new toggleable props, removed parts) vs. data-only changes
     (color/token value changes picked up automatically by variantStyles helpers)
```

### Failure Modes

| Failure | Detection | Action |
|---------|-----------|--------|
| Vibma MCP disconnected | `get_selection` fails or times out | Tell user to reconnect Vibma, stop |
| Single component selected (not set) | Selection has no child variants | Tell user to select the parent component set, stop |
| MCP disconnects mid-extraction | Any Vibma tool call fails after Pass 1 | Report which passes completed, save partial progress to a temp file, tell user to reconnect and re-run |
| Slug collision in registry | Import already exists for this slug | This is a re-extract — proceed with update, don't duplicate the registry entry |
| Existing data file has manual edits | Cannot detect automatically | Always warn before overwriting: "Data file already exists. Re-extracting will overwrite it." |

### Output

Summary of what was extracted (variant count, element count, token binding count). If re-extracting, a structured diff showing what changed and whether the page needs updating. Git commit is left to the user.

---

## Skill 2: `flxds_page`

### Purpose

Create or edit a FlowX design system documentation page for a component. Auto-detects create vs. edit mode. Smart editing preserves unchanged content.

### Trigger Description

```
Create or edit a FlowX design system documentation page for a component.
Use when: creating a component page, editing a component page, adding a page,
updating a page, building the docs page, "create page", "edit page",
"ds page", "design system page", "update the page", "rebuild page",
or any task involving creating/modifying files under src/app/components/
or working with the ComponentPageTemplate, component preview, or design system website.
```

### Entry Modes

1. **Slug provided as argument** — work on that specific component
2. **No slug** — scan and discover:
   - Data files in registry without corresponding pages (CREATE candidates)
   - Data files modified more recently than their page file (EDIT candidates — note: timestamp is a hint, not definitive; auto-formatting can cause false positives)
   - Present findings and ask user which to work on

### Workflow

```
1. DETECT MODE
   - If slug provided: locate data file + page file
   - If no slug: scan registry vs src/app/components/*/page.tsx
     - List components with data but no page (CREATE candidates)
     - List components where data file is newer than page (EDIT candidates)
     - Present findings to user and ask which to work on

2. DETERMINE ACTION
   - No page exists -> CREATE mode
   - Page exists -> EDIT mode

3. CREATE MODE (Read .claude/skills/references/page-conventions.md)
   - Read the spec data file
   - Check if spec has variantStyles populated:
     * If yes: build data-driven FlowX[Name] preview component using
       variant-style-helpers (findVariantStyle, buildElementStyle, getTextColor, etc.)
     * If no (legacy spec): build preview with inline style logic, following
       the pattern in the existing page for that component type
   - Import shared sub-components (FlowXLabel, FlowXDescription, FlowXErrorIcon)
     where the component's elements indicate label/description/error layers
   - Build tokens array from spec.tokenBindings:
     * Transform each binding to { name: "token-name (resolved)", value: "description",
       preview: <color swatch JSX> }
     * Deduplicate by token name, group descriptions
   - Build interactive controls from spec.props
   - Build use cases grid from spec.variants
   - Build states reference from spec.states
   - Build sizes reference from spec.sizes
   - Assemble page using ComponentPageTemplate
   - Export a Figma screenshot via Vibma MCP (export_node_as_image PNG scale:2)
     for visual comparison against the preview
   - Verify with npm run build

4. EDIT MODE (smart diff + guided edit)
   - Read current page file
   - Read current spec data file
   - Determine what the page currently renders by reading its source:
     * Which props are in the controls array?
     * Which variants are in the use cases grid?
     * Which states/sizes are rendered?
     * How is the preview component structured (what elements, what logic)?
   - Compare against the current spec data to identify gaps:
     * New variants in spec not in use cases grid -> add them
     * Removed variants -> remove from grid
     * New/removed props -> update interactive controls
     * New/removed states/sizes -> update those sections
     * Changed tokenBindings -> update tokens array
     * Changed elements/variantStyles -> assess preview component impact
   - For data-driven changes (colors, token values in variantStyles):
     confirm they're automatically picked up via helpers — no page edit needed
   - For structural changes (new elements, new toggleable props, removed parts):
     make targeted edits to the preview component
   - For legacy pages using hardcoded colors (not variant-style-helpers):
     if the edit is substantial, consider migrating to the data-driven pattern;
     if minor, make targeted edits matching the existing pattern
   - Preserve everything that didn't change
   - Export a Figma screenshot for visual comparison
   - Verify with npm run build

5. FINAL VERIFICATION
   - Build passes
   - Route resolves
   - Component appears in sidebar + index
   - Visual comparison: preview vs Figma screenshot — if mismatch, re-query
     Figma for the specific element and fix
```

### Failure Modes

| Failure | Detection | Action |
|---------|-----------|--------|
| Data file doesn't exist for slug | File not found at expected path | Tell user to run `flxds_extract` first, stop |
| Component not in registry | Slug not found in registry.ts imports | Tell user to run `flxds_extract` first (it handles registration), stop |
| `npm run build` fails | Non-zero exit code | Read the error, fix the issue (usually TypeScript/import errors), rebuild |
| Spec has no variantStyles (legacy) | `spec.variantStyles` is undefined or empty | Use inline style logic pattern instead of variant-style-helpers |
| Vibma MCP not connected (screenshot step) | export_node_as_image fails | Skip screenshot comparison, warn user to verify visually in browser |

### Output

Confirmation of page created/edited, build status, and visual comparison result. Git commit is left to the user.

### Skill Chaining & Trigger Disambiguation

If both extraction and page creation are needed (e.g., "extract checkbox from Figma and create its page"), run `flxds_extract` first to completion, then run `flxds_page`. The extract skill must finish before the page skill starts, since the page skill depends on the data file.

**Disambiguation rules** when user intent is ambiguous:
- Phrases like "add component from Figma" or "extract and create" → chain both skills (extract first, then page)
- Phrases about Figma data/properties/variants/tokens → `flxds_extract` only
- Phrases about the page/website/docs/preview → `flxds_page` only
- When in doubt, ask the user whether they want extraction, page creation, or both

---

## Shared Reference Files

### `references/vibma-tools.md`

Used primarily by `flxds_extract`, also by `flxds_page` for screenshot export. Contains:
- Tool table: tool name, purpose, key params, gotchas
- Critical warnings (scan_text_nodes doesn't return colors, never export SVG format, never guess values)
- Batching guidance (5-10 nodes per get_node_info call, 10-15 for text color fills)

### `references/component-spec.md`

Used by both skills. Contains:
- Full ComponentSpec type field reference with descriptions
- ElementSpec, ElementStyle, VariantStyle, TokenBinding field reference
- Data assembly rules (every fill needs fillToken, every variant must have entries, etc.)
- Validation checklist
- Conventions: slug format (lowercase kebab-case), figmaLink construction (file key + node ID with colon->dash), status values, date format (YYYY-MM-DD)

### `references/page-conventions.md`

Used primarily by `flxds_page`. Contains:
- Section order (StatusBanner -> Title -> hr -> Interactive Preview -> ... -> Related Components)
- Styling conventions (use case card backgrounds `#f7f8f9`, separator `borderColor: "#f7f8f9"`, label placement below previews)
- Shared sub-components table (FlowXLabel, FlowXDescription, FlowXErrorIcon) with props and import path
- Variant-style-helpers API table (findVariantStyle, buildElementStyle, getTextColor, getElementTypography, isElementVisible)
- Token array construction: how to transform `tokenBindings` into the `{ name, value, preview }` format used by TokenTable
- Preview component rules (zero hardcoded hex when variantStyles available, data-driven, fontFamily: var(--font-flowx))
- Reference pages: input-field (primary data-driven reference), radio (segment controller), select-field (complex toggleable elements)
- Legacy page handling: how to work with older pages that use hardcoded colors

---

## Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Independence | Skills work independently | Re-extract without rebuilding page; create page from existing data |
| Re-extract diff | Text-based comparison of old vs new data file | Know what changed without version tracking infrastructure |
| Edit intelligence | Compare page source against current spec data | No need for snapshot files or hash tracking — the page source IS the previous state |
| Auto-discovery | `flxds_page` with no slug scans for work | Reduces friction — timestamps are hints, user confirms |
| Trigger breadth | Wide trigger descriptions with many phrase variations | Skills fire reliably from natural language |
| Project-local | `.claude/skills/` in repo | Tied to this specific design system project |
| Shared references | Three companion files, no duplication, <300 lines each | Both skills share knowledge without duplicating content |
| Git commits | Left to user | Skills focus on file creation/editing; user decides when to commit |
| Legacy pages | Targeted edits matching existing pattern, or migrate if edit is substantial | Pragmatic approach — don't force migration for small changes |
