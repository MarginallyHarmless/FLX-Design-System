# Component Create v2 — Design Document

> Improve the `component-create.md` instructions so that Claude Code extracts 100% accurate properties from every Figma variant and builds data-driven preview components.

---

## Problem

The current instructions tell Claude to inspect "2-3 representative variants" and hardcode hex values in preview component conditionals. This leads to:
- Missed colors/dimensions in variant combinations not sampled
- No layout sizing data (fill/hug/fixed)
- No token variable bindings from Figma
- Brittle preview components with 20+ manually-written conditional branches
- Toggleable elements (e.g., optional icons) not systematically captured

## Solution

### 1. Extended `ComponentSpec` Type

Add three new concepts:

**`ElementSpec`** — replaces simple `anatomy` array. Each element includes:
- Layout: direction, sizingH/V (FIXED/HUG/FILL), padding, spacing, alignment, wrap
- Dimensions: width, height, minWidth, minHeight, cornerRadius
- Typography: fontSize, lineHeight, fontWeight, fontFamily, letterSpacing
- Toggleability: toggleable, defaultVisible, toggleProperty, swappable, swapProperty

**`VariantStyle`** — per-variant visual properties per element:
- variantProps: the axis values (e.g., `{ Selected: "On", State: "Error" }`)
- elements: keyed by part name, each with fill, fillToken, stroke, strokeToken, strokeWidth, textColor, textColorToken, opacity, cornerRadius, width, height, visible, svg

**`TokenBinding`** — records Figma variable bindings:
- element, property, variableName, resolvedValue

### 2. Seven-Pass Extraction Pipeline

| Pass | Tool | Scope | Extracts |
|------|------|-------|----------|
| 1. Enumerate | `get_selection` depth:1 | Component set | All variant IDs, axis names/values, boolean/swap properties |
| 2. Structure & layout | `get_node_info` depth:-1 | EVERY variant | Layout mode/sizing, padding, spacing, alignment, dimensions, fills, strokes, opacity, visibility, componentProperties |
| 3. Typography | `scan_text_nodes` | EVERY variant | fontSize, fontFamily, fontStyle, fontWeight, lineHeight, letterSpacing |
| 4. Token bindings | `get_node_variables` | EVERY variant (walk element tree) | Variable name → property mappings |
| 5. Icons & vectors | `search_nodes` + `export_node_as_image` SVG | Unique icon nodes | SVG path data, viewBox |
| 6. Screenshot | `export_node_as_image` PNG scale:2 | Component set | Visual source of truth |
| 7. Lint | `lint_node` | Component set | Hardcoded colors, WCAG, auto-layout warnings |

Every variant is inspected — no sampling.

### 3. Data Assembly

1. Build `elements` array from one base variant (all defaults, all toggles on)
2. Build `variantStyles` — one entry per variant, only recording properties that differ from base
3. Build `tokenBindings` — deduplicated, grouped by element
4. Populate standard spec fields (variants, props, states, sizes, guidelines, accessibility)
5. Validation: every axis value covered, every element has entries, every fill/stroke has hex + optional token

### 4. Data-Driven Preview Components

Preview components read from `variantStyles` instead of hardcoded conditionals:
- Look up matching variant style by props
- Apply base element layout from `elements` spec
- Override with variant-specific fills/strokes/visibility
- Toggleable elements conditionally rendered based on `visible` field
- Single source of truth = the spec data file

### 5. Updated Page Sections

- **Design Tokens Used** — auto-generated from `tokenBindings`
- **Anatomy** — enriched with layout sizing info from `elements`
- All other sections unchanged in structure

## Deliverable

Updated `component-create.md` instruction file that Claude Code follows autonomously when told to extract a Figma component and create a design system page.

## Scope

- Rewrite `component-create.md` with the new pipeline
- Extend `ComponentSpec` type in `types.ts`
- Add a variant style lookup helper utility
- Update existing component pages (checkbox, radio-v3) as migration examples (optional, separate task)
