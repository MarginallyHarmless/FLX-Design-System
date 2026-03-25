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

## Purpose

Extract component properties from a selected Figma component set via Vibma MCP into a `ComponentSpec` data file. Produces a diff summary when re-extracting.

## Preconditions

1. Vibma MCP connected — verify with `mcp__Vibma__get_selection`. If fails, tell user to reconnect and stop.
2. A component SET is selected (not a single variant). If selection has no child variants, tell user to select the parent component set and stop.
3. Derive slug from Figma component set name: lowercase kebab-case ("Input Field" -> `input-field`).
4. Check if `src/lib/components-data/[slug].ts` exists. If yes, this is re-extract mode — read file as source text for diff comparison later.

## Step 1: Seven-Pass Extraction

Read `.claude/skills/references/vibma-tools.md` for tool parameters and warnings.

Execute ALL 7 passes. Inspect EVERY variant — no sampling.

- **Pass 1 — Enumerate variants:** `get_selection` depth:1. Record all variant node IDs and property combinations.
- **Pass 2 — Structure & layout:** `get_node_info` on EVERY variant. Record frame hierarchy, auto-layout, constraints, padding, spacing, sizes.
- **Pass 3a — Typography:** `scan_text_nodes` on EVERY variant. Save all text node IDs plus font family, weight, size, line height, letter spacing.
- **Pass 3b — Text colors:** `get_node_info` with `fields: ["name", "fills"]`, `depth: 0` on EVERY text node ID from Pass 3a. Record fill colors.
- **Pass 4 — Token bindings:** `get_node_variables` on EVERY variant. Record all variable bindings (color, spacing, radius, etc.).
- **Pass 5 — Icons & vectors:** `search_nodes` for VECTOR/INSTANCE types + `get_node_info` + PNG export for each icon found.
- **Pass 6 — Screenshot:** `export_node_as_image` PNG scale:2 on the component set node.
- **Pass 7 — Lint:** `lint_node` on the component set node. Record any warnings.

## Step 2: Data Assembly

Read `.claude/skills/references/component-spec.md` for type fields, assembly rules, and validation checklist.

1. Choose base variant (all-default values, all toggles ON).
2. Build `elements` array from base variant — one entry per visual node (frames, text, icons, shapes).
3. Build `variantStyles` — one entry per variant, only recording diffs from base.
4. Build `tokenBindings` — deduplicated across all variants.
5. Populate standard spec fields: `slug`, `name`, `description`, `status`, `variants`, `props`, `states`, `sizes`, `guidelines`, `accessibility`, `relatedComponents`.
6. Construct `figmaLink`: use `mcp__Vibma__search_nodes` with `types: ["COMPONENT_SET"]` to find node ID, then format as `https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id}` (replace colon with dash in ID).
7. Run validation checklist from component-spec.md.

## Step 3: Write Data File

1. Create or update `src/lib/components-data/[slug].ts` exporting `[camelCase]Spec: ComponentSpec`.
2. If new component: add import + entry to `src/lib/components-data/registry.ts`.
3. If updating: warn user that manual edits will be overwritten before proceeding.

## Step 4: Diff Summary (re-extract only)

Compare the "before" snapshot against the newly written file. Report:

- Added/removed variants
- Changed colors/fills/strokes
- New/removed elements
- Modified token bindings
- Typography changes

Flag whether page preview needs structural updates (new elements, new toggleable props, removed parts) vs. data-only changes (automatically picked up by variantStyles helpers).

## Failure Modes

| Failure | Detection | Action |
|---------|-----------|--------|
| Vibma MCP disconnected | `get_selection` fails | Tell user to reconnect, stop |
| Single component selected | No child variants | Tell user to select component set, stop |
| MCP disconnects mid-extraction | Vibma tool call fails after Pass 1 | Report completed passes, save partial progress, tell user to reconnect |
| Slug collision in registry | Import already exists | This is re-extract — update, don't duplicate |
| Existing data file | File exists at expected path | Warn before overwriting |

## Output

Report: component name, variant count, element count, token binding count. If re-extract: structured diff and whether page needs updating. Git commit is left to the user.
