# FlowX Design System Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create two independent Claude Code skills (`flxds_extract` and `flxds_page`) with shared reference files for the FlowX Design System project.

**Architecture:** Two skill markdown files in `.claude/skills/` with three shared reference files in `.claude/skills/references/`. Skills contain workflow logic; references contain lookup tables and conventions extracted from the existing `component-create-v2.md`.

**Base path:** All relative paths like `flowx-design-system/...` are relative to `/Users/bogdandraghici/Desktop/vibes/FLX DS/`.

**Tech Stack:** Claude Code skills (markdown), Vibma MCP tools, Next.js/TypeScript (target codebase)

**Spec:** `docs/superpowers/specs/2026-03-24-flxds-skills-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `.claude/skills/flxds_extract.md` | Figma extraction workflow — preconditions, 7-pass pipeline, data assembly, diff summary |
| Create | `.claude/skills/flxds_page.md` | Page create/edit workflow — mode detection, create, smart edit, verification |
| Create | `.claude/skills/references/vibma-tools.md` | Vibma MCP tool reference table, critical warnings, batching guidance |
| Create | `.claude/skills/references/component-spec.md` | ComponentSpec type fields, data assembly rules, validation checklist, conventions |
| Create | `.claude/skills/references/page-conventions.md` | Section order, styling, shared sub-components, variant-style-helpers API, token array construction, reference pages |

**Source material:** Content extracted and reorganized from:
- `flowx-design-system/component-create-v2.md` (primary source)
- `flowx-design-system/src/lib/components-data/types.ts` (type definitions)
- `flowx-design-system/src/lib/components-data/variant-style-helpers.ts` (helper API)
- `flowx-design-system/src/components/docs/shared-elements.tsx` (shared components)
- `flowx-design-system/src/components/docs/component-page-template.tsx` (template API)
- Memory files: `feedback_figma_extraction.md`, `feedback_figma_link.md`

---

### Task 1: Create skill directory structure

**Files:**
- Create: `.claude/skills/references/` directory

The spec uses flat `.md` files (not subdirectories), so we skip the skill-creator init script and create the structure directly. The skill files themselves are written in Tasks 5 and 6.

- [ ] **Step 1: Create directories**

```bash
mkdir -p "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references"
```

- [ ] **Step 2: Verify directory structure**

```bash
ls -la "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/"
```

Expected: `references/` directory exists.

---

### Task 2: Create `references/vibma-tools.md`

**Files:**
- Create: `.claude/skills/references/vibma-tools.md`
- Source: `flowx-design-system/component-create-v2.md` (Steps 1, Quick Reference sections)

This file contains Vibma MCP tool parameters, critical warnings, and batching guidance. Target: <200 lines.

- [ ] **Step 1: Write vibma-tools.md**

Content to include (extracted from `component-create-v2.md`):

1. **Tool Reference Table** — all 7 Vibma tools with their purpose, key params, and gotchas:
   - `get_selection` (depth:1) — enumerate variant IDs + axes
   - `get_node_info` (depth:-1, full fields list from Pass 2) — layout, fills, strokes, dimensions
   - `scan_text_nodes` — typography only, NOT colors
   - `get_node_variables` — token bindings
   - `search_nodes` + `get_node_info` + `export_node_as_image` (PNG) — icon extraction
   - `export_node_as_image` (PNG, scale:2) — screenshot
   - `lint_node` — quality checks

2. **Critical Warnings** (boxed/emphasized):
   - `scan_text_nodes` does NOT return text colors — must follow up with `get_node_info` on every text node ID for fills
   - Never export as SVG format — causes API 400 errors. Always use PNG for reference images, `get_node_info` depth:-1 for vector path data
   - Never guess/estimate values — always query Figma directly
   - If an element has NO fills, it is transparent — do NOT invent a fill

3. **Batching Guidance**:
   - `get_node_info`: batch 5-10 variant node IDs per call
   - Text color fills (Step 3b): batch 10-15 text node IDs per call
   - `get_node_variables`: walk element tree per variant

4. **Pass 2 Fields List** (exact `fields` parameter for `get_node_info`):
   ```
   ["name", "type", "visible", "children", "fills", "strokes", "strokeWeight",
    "cornerRadius", "absoluteBoundingBox", "relativeTransform", "layoutMode",
    "layoutSizingHorizontal", "layoutSizingVertical", "paddingTop", "paddingRight",
    "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing",
    "primaryAxisAlignItems", "counterAxisAlignItems", "layoutWrap", "opacity",
    "constraints", "componentProperties"]
   ```

- [ ] **Step 2: Verify line count**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references/vibma-tools.md"
```

Expected: <200 lines.

---

### Task 3: Create `references/component-spec.md`

**Files:**
- Create: `.claude/skills/references/component-spec.md`
- Source: `flowx-design-system/src/lib/components-data/types.ts`, `component-create-v2.md` (Steps 2a-2f)

This file contains the ComponentSpec type reference, data assembly rules, and conventions. Target: <250 lines.

- [ ] **Step 1: Write component-spec.md**

Content to include:

1. **ComponentSpec Field Reference** — every field with type and description:
   - `slug` (string) — lowercase kebab-case, derived from Figma name
   - `name` (string) — display name from Figma
   - `description` (string) — one sentence
   - `status` ("stable" | "beta" | "deprecated" | "planned") — use "stable" for new components
   - `figmaLink` (string?) — URL constructed from file key + node ID
   - `lastUpdated` (string?) — YYYY-MM-DD format, today's date
   - `variants` — array of `{ name, useCase, props: Record<string, string> }`
   - `props` — array of `{ name, type, default?, options?, description }`
   - `states` (string[]) — from "State" axis values
   - `sizes` (string[]?) — from "Size" axis values
   - `anatomy` — array of `{ part, description }`
   - `elements` (ElementSpec[]?) — see below
   - `variantStyles` (VariantStyle[]?) — see below
   - `tokenBindings` (TokenBinding[]?) — see below
   - `guidelines` — `{ do: [{description, example?}], dont: [{description, example?}] }`
   - `accessibility` — `{ role?, keyboard?, ariaAttributes? }`
   - `relatedComponents` (string[]?) — slugs of related components

2. **ElementSpec Fields** — `part`, `description`, `layout` (ElementLayout), `dimensions` (ElementDimensions), `typography` (ElementTypography), `toggleable`, `defaultVisible`, `toggleProperty`, `swappable`, `swapProperty`

3. **VariantStyle Fields** — `variantProps: Record<string, string>`, `elements: Record<string, ElementStyle>`. ElementStyle fields: `fill`, `fillToken`, `stroke`, `strokeToken`, `strokeWidth`, `textColor`, `textColorToken`, `opacity`, `cornerRadius`, `width`, `height`, `visible`, `svg`, `fontSize`, `lineHeight`, `fontWeight`

4. **TokenBinding Fields** — `element`, `property`, `variableName`, `resolvedValue`

5. **Data Assembly Rules**:
   - Base variant = all-default values, all toggleable elements ON
   - `elements` array: one ElementSpec per named layer from base variant
   - `variantStyles`: one entry per variant (ALL variants), recording only properties that differ from base
   - Every `fill` must have paired `fillToken`, every `stroke` must have `strokeToken` + `strokeWidth`, every `textColor` must have `textColorToken`
   - Toggleable elements: always include `visible: true/false` in variant styles
   - Typography varying by variant: add `fontSize`/`lineHeight`/`fontWeight` overrides in ElementStyle
   - `tokenBindings`: deduplicated, one per unique element+property+token

6. **Validation Checklist**:
   - `variantStyles` count = total variant count from Pass 1
   - Every axis value covered
   - Every element has entries in every variant style
   - Every fill/stroke/textColor has paired token
   - No placeholder or guessed values
   - All toggleable elements marked + have `visible` in variant styles
   - Typography from `scan_text_nodes` only
   - Icons from node info only, never approximated

7. **Conventions**:
   - Slug: lowercase kebab-case from Figma name ("Input Field" → `input-field`)
   - figmaLink: `https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id}` (colon → dash in node ID). Use `mcp__Vibma__search_nodes` with `types: ["COMPONENT_SET"]` to find node ID.
   - Date: YYYY-MM-DD
   - File: `src/lib/components-data/[slug].ts` exporting `[camelCase]Spec: ComponentSpec`

- [ ] **Step 2: Verify line count**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references/component-spec.md"
```

Expected: <250 lines.

---

### Task 4: Create `references/page-conventions.md`

**Files:**
- Create: `.claude/skills/references/page-conventions.md`
- Source: `component-create-v2.md` (Steps 3-5), existing page files, shared-elements.tsx, variant-style-helpers.ts

This file contains page creation conventions, shared component APIs, and styling rules. Target: <300 lines.

- [ ] **Step 1: Write page-conventions.md**

Content to include:

1. **Page Section Order** (from ComponentPageTemplate):
   ```
   StatusBanner → Title + Description → <hr> → Interactive Preview → <hr> →
   Use Cases (grid) → <hr> → States Reference → <hr> → Sizes → <hr> →
   Props (PropsTable) → <hr> → Anatomy (AnatomyDiagram) → <hr> →
   Usage Guidelines (DosAndDonts) → <hr> → Accessibility → <hr> →
   Design Tokens (TokenTable) → <hr> → Related Components
   ```
   Separator: `<hr style={{ borderColor: "#f7f8f9" }} />`

2. **ComponentPageTemplate Props**:
   ```tsx
   interface ComponentPageTemplateProps {
     spec: ComponentSpec;
     tokens: { name: string; value: string; preview: ReactNode }[];
     interactivePreview: ReactNode;
     useCases: ReactNode;
     statesReference: ReactNode;
     sizes: ReactNode;
   }
   ```
   Import: `@/components/docs/component-page-template`

3. **Styling Conventions**:
   - Use case cards: `backgroundColor: "#f7f8f9"`, no borders. Inverted variants: `bg-neutral-900 text-white`.
   - Title: `text-sm font-medium`. UseCase: `text-xs text-muted-foreground`. Both below the preview.
   - States/sizes: label text below component preview, not above.

4. **Shared Sub-Components** (import from `@/components/docs/shared-elements`):

   | Component | Props | Use When |
   |-----------|-------|----------|
   | `FlowXLabel` | `label`, `size` ("small"\|"medium"), `inverted`, `disabled`, `showInfo`, `hasLabel` | Component has label text above it |
   | `FlowXDescription` | `text`, `state` ("default"\|"error"\|"disabled"\|"focused"), `inverted`, `visible` | Component has helper/error text below it |
   | `FlowXErrorIcon` | `size` (default 16) | Error state warning icon |
   | `FlowXTooltip` | `text`, `useCase` ("default"\|"error"), `inverted` | Tooltip display |

   **Rule:** If you find yourself writing `getLabelColor()`, inline label spans with hardcoded colors, inline error SVGs, or inline description text — STOP and use the shared component.

5. **Variant-Style-Helpers API** (import from `@/lib/components-data/variant-style-helpers`):

   | Function | Signature | Returns |
   |----------|-----------|---------|
   | `findVariantStyle` | `(spec, props)` | `VariantStyle` matching props |
   | `getElementSpec` | `(spec, part)` | `ElementSpec` (layout/dimensions/typography) |
   | `getElementStyle` | `(spec, props, part)` | `ElementStyle` (fill/stroke/color for variant) |
   | `buildElementStyle` | `(spec, props, part)` | `React.CSSProperties` (layout + variant combined) |
   | `getTextColor` | `(spec, props, part)` | Text color hex string |
   | `getElementTypography` | `(spec, props, part)` | `{ fontSize?, lineHeight?, fontWeight? }` with variant overrides → base fallback |
   | `isElementVisible` | `(spec, props, part)` | Boolean visibility |

6. **Token Array Construction** — transform `spec.tokenBindings` to `tokens` prop format:
   ```tsx
   const tokens = spec.tokenBindings
     ? [...new Map(spec.tokenBindings.map(b => [
         b.variableName,
         {
           name: `${b.variableName} (${b.resolvedValue})`,
           value: `${b.element} → ${b.property}`,
           preview: <div style={{ width: 20, height: 20, borderRadius: 4,
             backgroundColor: b.resolvedValue.startsWith("#") ? b.resolvedValue : undefined,
             border: !b.resolvedValue.startsWith("#") ? "2px solid #cbd1db" : undefined }} />,
         }
       ])).values()]
     : [];
   ```
   Deduplicate by `variableName`. For non-color tokens (spacing, radius), show a bordered box instead of a colored swatch.

7. **Preview Component Rules**:
   - When spec has `variantStyles`: zero hardcoded hex — all colors/typography from helpers
   - Map component props → Figma axis names in a `variantProps` object
   - Wrapper element: `style={{ fontFamily: "var(--font-flowx)" }}`
   - If you catch yourself writing `inverted ? "#xxx" : "#yyy"`, that value belongs in `variantStyles`

8. **Legacy Page Handling**:
   - Some existing pages (e.g., checkbox) use hardcoded hex values instead of variant-style-helpers
   - For minor edits to legacy pages: match the existing pattern
   - For substantial edits: consider migrating to data-driven pattern
   - All NEW pages must use variant-style-helpers

9. **Reference Pages**:
   - **Input Field** (`src/app/components/input-field/page.tsx`) — primary reference for data-driven preview
   - **Radio** (`src/app/components/radio/page.tsx`) — segment controller previews
   - **Select Field** (`src/app/components/select-field/page.tsx`) — complex toggleable elements

- [ ] **Step 2: Verify line count**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references/page-conventions.md"
```

Expected: <300 lines.

---

### Task 5: Create `flxds_extract.md` skill

**Files:**
- Create: `.claude/skills/flxds_extract.md`
- Source: Spec document sections on Skill 1

- [ ] **Step 1: Write flxds_extract.md**

The skill file needs YAML frontmatter (`name`, `description`) and a markdown body containing the workflow. Content structure:

**Frontmatter:**
```yaml
---
name: flxds_extract
description: >
  Extract component properties from Figma via Vibma MCP into a ComponentSpec data file.
  Use when: extracting a component from Figma, pulling component data from Figma,
  inspecting a Figma component, getting component properties, scanning a component,
  "extract", "pull from Figma", "scan component", "get from Figma",
  "add component from Figma", "re-extract", "update from Figma",
  or any task involving reading a Figma component's variants/props/styles/tokens
  into the FlowX design system data layer.
---
```

**Body sections:**

1. **Purpose** — one line: Extract component properties from a selected Figma component set via Vibma MCP into a `ComponentSpec` data file.

2. **Preconditions** — numbered list:
   - Vibma MCP connected (verify with `mcp__Vibma__get_selection`)
   - Component SET selected (not single variant — must have child variants). If single component, tell user to select parent set and stop.
   - If data file exists at `src/lib/components-data/[slug].ts`, this is re-extract mode. Read file as text for diff comparison.

3. **Slug Derivation** — Figma name → lowercase kebab-case

4. **Workflow** — numbered steps with explicit Read instructions:

   ```
   Step 1: PRECONDITION CHECK
   Step 2: SEVEN-PASS EXTRACTION
     → Read .claude/skills/references/vibma-tools.md for tool params and warnings
     → Execute all 7 passes (enumerate, structure, typography+colors, tokens, icons, screenshot, lint)
     → Every variant must be inspected — no sampling
   Step 3: DATA ASSEMBLY
     → Read .claude/skills/references/component-spec.md for type fields and rules
     → Build elements, variantStyles, tokenBindings
     → Populate all spec fields
     → Construct figmaLink via search_nodes
     → Run validation checklist from component-spec.md
   Step 4: WRITE DATA FILE
     → Create/update src/lib/components-data/[slug].ts
     → Register in registry.ts if new (add import + array entry)
     → Warn before overwriting existing file
   Step 5: DIFF SUMMARY (re-extract only)
     → Compare before/after source text
     → Report changes: variants, colors, elements, tokens, typography
     → Flag structural vs data-only changes
   ```

5. **Failure Modes** — table from spec (5 rows)

6. **Output Format** — what to report: variant count, element count, token count, diff if re-extract, whether page needs updating

- [ ] **Step 2: Verify the skill file is under 150 lines**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/flxds_extract.md"
```

---

### Task 6: Create `flxds_page.md` skill

**Files:**
- Create: `.claude/skills/flxds_page.md`
- Source: Spec document sections on Skill 2

- [ ] **Step 1: Write flxds_page.md**

**Frontmatter:**
```yaml
---
name: flxds_page
description: >
  Create or edit a FlowX design system documentation page for a component.
  Use when: creating a component page, editing a component page, adding a page,
  updating a page, building the docs page, "create page", "edit page",
  "ds page", "design system page", "update the page", "rebuild page",
  or any task involving creating/modifying files under src/app/components/
  or working with the ComponentPageTemplate, component preview, or design system website.
---
```

**Body sections:**

1. **Purpose** — one line

2. **Entry Modes**:
   - Slug provided as argument → work on that component
   - No slug → scan registry vs `src/app/components/*/page.tsx`, list CREATE and EDIT candidates, ask user

3. **Workflow** — numbered steps:

   ```
   Step 1: DETECT MODE
     → If slug: check for data file + page file
     → If no slug: read registry.ts for all slugs, glob for existing pages,
       compare file timestamps (hint only), present findings

   Step 2: DETERMINE ACTION
     → No page → CREATE
     → Page exists → EDIT

   Step 3: CREATE MODE
     → Read .claude/skills/references/page-conventions.md
     → Read spec data file
     → Check if variantStyles populated → data-driven vs legacy pattern
     → Build FlowX[Name] preview component
     → Import shared sub-components where applicable
     → Build tokens array (transformation in page-conventions.md)
     → Build interactive controls, use cases grid, states, sizes
     → Assemble with ComponentPageTemplate
     → Export Figma screenshot for comparison (if Vibma connected)
     → npm run build

   Step 4: EDIT MODE
     → Read .claude/skills/references/page-conventions.md
     → Read current page + current spec
     → Analyze page source: controls, variants grid, states, sizes, preview structure
     → Compare against spec data → identify gaps
     → Data-driven changes: no page edit needed (helpers pick up automatically)
     → Structural changes: targeted edits to preview component
     → Legacy pages: match existing pattern or migrate if substantial
     → Preserve unchanged content
     → Export Figma screenshot for comparison
     → npm run build

   Step 5: FINAL VERIFICATION
     → Build passes
     → Route resolves
     → Sidebar + index updated
     → Visual comparison vs Figma screenshot
   ```

4. **Failure Modes** — table from spec (5 rows)

5. **Skill Chaining** — disambiguation rules from spec

6. **Output Format** — what to report

- [ ] **Step 2: Verify the skill file is under 200 lines**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/flxds_page.md"
```

---

### Task 7: Validate and package skills

**Files:**
- Validate: `.claude/skills/flxds_extract.md`, `.claude/skills/flxds_page.md`
- Validate: all reference files

- [ ] **Step 1: Validate skill files have correct frontmatter**

Read both skill files and verify:
- YAML frontmatter has `name` and `description` fields
- Description is comprehensive enough to trigger on all intended phrases
- Body contains workflow steps with explicit Read instructions for reference files

- [ ] **Step 2: Verify all reference file paths are correct**

Check that every `Read .claude/skills/references/...` instruction in both skill files points to an existing file:

```bash
ls "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references/"
```

Expected: `vibma-tools.md`, `component-spec.md`, `page-conventions.md`

- [ ] **Step 3: Verify reference files are under size limits**

```bash
wc -l "/Users/bogdandraghici/Desktop/vibes/FLX DS/.claude/skills/references/"*.md
```

Expected: each under 300 lines.

- [ ] **Step 4: Manual validation of skill structure**

Since we use flat `.md` files (not subdirectories), the skill-creator's `quick_validate.py` won't work. Validate manually:

For each skill file, verify:
- Line 1-N: YAML frontmatter between `---` delimiters
- `name:` field matches filename (without `.md`)
- `description:` field is present and multi-line
- Body has numbered workflow steps
- Every `Read .claude/skills/references/...` instruction points to an existing file

- [ ] **Step 5: Smoke test — verify skills appear in Claude Code**

Start a new Claude Code conversation in the FLX DS project directory and check if both skills appear in the available skills list. Test trigger matching by typing a relevant phrase.

---

### Task 8: Clean up old instruction file

**Files:**
- Evaluate: `flowx-design-system/component-create-v2.md`
- Evaluate: `flowx-design-system/component-create.md`

- [ ] **Step 1: Verify coverage**

Confirm that all content from `component-create-v2.md` is represented in either the skill files or reference files. Do a section-by-section comparison:

| component-create-v2.md Section | Covered In |
|-------------------------------|------------|
| Prerequisites | flxds_extract.md (Preconditions) |
| Step 1: Seven-Pass Extraction | flxds_extract.md (Step 2) + references/vibma-tools.md |
| Step 2: Data Assembly | flxds_extract.md (Step 3) + references/component-spec.md |
| Step 3: Create Data File | flxds_extract.md (Step 4) |
| Step 4: Register | flxds_extract.md (Step 4) |
| Step 5: Create Route Page | flxds_page.md (Step 3) + references/page-conventions.md |
| Step 6: Verify | flxds_page.md (Step 5) + flxds_extract.md (validation) |
| Step 7: Commit | Left to user (noted in both skills) |
| Quick Reference: Vibma Tools | references/vibma-tools.md |
| Quick Reference: Variant Style Helpers | references/page-conventions.md |
| Quick Reference: Shared Sub-Components | references/page-conventions.md |
| Quick Reference: Reference Pages | references/page-conventions.md |

- [ ] **Step 2: Ask user about old files**

Ask the user whether to:
- A) Delete `component-create-v2.md` and `component-create.md` (fully replaced by skills)
- B) Keep them as archived reference (rename to `component-create-v2.archive.md`)
- C) Leave as-is for now

Do NOT delete without user confirmation.

- [ ] **Step 3: Notify user about committing**

All skill files are created. Remind the user to commit when ready. The new files are:
```
.claude/skills/flxds_extract.md
.claude/skills/flxds_page.md
.claude/skills/references/vibma-tools.md
.claude/skills/references/component-spec.md
.claude/skills/references/page-conventions.md
```
