# Component Create — Stage B Guide (Optimized)

Add a new component page to the FlowX Design System docs site. Follow autonomously.

## Prerequisites

- Vibma MCP connected (port 3055, channel "vibma")
- The **component SET** is selected in Figma (the parent, not a single variant)
- Dev server running (`npm run dev`)

---

## Step 1: Seven-Pass Figma Extraction

Complete ALL passes. Inspect EVERY variant — no sampling.

### Pass 1: Enumerate Variants

**Tool:** `mcp__Vibma__get_selection` — `depth: 1`

Extract: component set name, node ID, ALL child variant node IDs, variant axes parsed from child names (e.g. `"Selected=Off, State=Default, Size=Medium"` → axes map), boolean component properties (toggleable elements), instance swap properties.

✓ All variant IDs listed · All axes + values identified · Boolean/swap properties noted

### Pass 2: Structure & Layout (EVERY variant)

**Tool:** `mcp__Vibma__get_node_info` on every variant node ID. Batch 5–10 per call.

**Params:** `depth: -1`, `fields: ["name", "type", "visible", "children", "fills", "strokes", "strokeWeight", "cornerRadius", "absoluteBoundingBox", "relativeTransform", "layoutMode", "layoutSizingHorizontal", "layoutSizingVertical", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing", "primaryAxisAlignItems", "counterAxisAlignItems", "layoutWrap", "opacity", "constraints", "componentProperties"]`

Extract per element: name, type, visible, layoutMode, sizingH/V, padding, itemSpacing, counterAxisSpacing, alignment, wrap, fills (hex), strokes (hex), strokeWeight, cornerRadius, absoluteBoundingBox, opacity.

**If an element has NO fills, it is transparent. Do NOT invent a fill.**

✓ Every variant queried · Element trees documented · Fill/stroke hex recorded · Transparent elements noted

### Pass 3: Typography AND Text Colors (EVERY variant)

**Step 3a — Typography:** `mcp__Vibma__scan_text_nodes` on every variant. Extract: fontSize, fontFamily, fontStyle, fontWeight (numeric), lineHeight, letterSpacing. **Save all text node IDs for Step 3b.**

**Step 3b — Text Colors:** `mcp__Vibma__get_node_info` on every text node ID from 3a. Params: `fields: ["name", "fills"]`, `depth: 0`. Batch 10–15 per call. Extract: `fills[0].color` → hex.

**⛔ `scan_text_nodes` does NOT return text colors.** You MUST do Step 3b. This is the #1 cause of color mismatches. Never guess text colors from context or reuse from other components.

✓ Every variant scanned (3a) · Every text node queried for fills (3b) · Colors cross-checked across variants

### Pass 4: Token Bindings (EVERY variant)

**Tool:** `mcp__Vibma__get_node_variables` on every variant, walking the element tree.

Extract per binding: element name, property, variableName, resolvedValue (hex).

✓ Every element with fills/strokes checked · Token name + resolved value paired

### Pass 5: Icons & Vectors

**Tools:** `mcp__Vibma__search_nodes` (type `VECTOR` and `BOOLEAN_OPERATION`) → `mcp__Vibma__export_node_as_image` (format `PNG`, scale `2`) on each unique icon for visual reference.

**⚠️ Do NOT export as SVG — the Claude API cannot process SVG images and will return a 400 error.**

To get SVG path data: use `mcp__Vibma__get_node_info` with `depth: -1` on each vector/boolean-operation node to extract fill rules, stroke data, and geometry. For icons that need inline SVG in code, reconstruct the `<svg>` from the node's vector path data and dimensions.

Extract: icon dimensions (from absoluteBoundingBox), fill/stroke colors, icon-to-variant mapping. **Never approximate icons with basic shapes.**

✓ All vector nodes found · PNGs exported for reference · Node info queried for path data · Mapped to variants

### Pass 6: Screenshot

**Tool:** `mcp__Vibma__export_node_as_image` — format `PNG`, scale `2`, on component set node ID.

This is the **visual source of truth** for verification.

### Pass 7: Lint

**Tool:** `mcp__Vibma__lint_node` on component set node ID.

Note relevant warnings for guidelines/accessibility sections.

---

## Step 2: Data Assembly

### 2a. Choose Base Variant

Pick the variant with all-default values and all toggleable elements ON (visible).

### 2b. Build `elements` Array

One `ElementSpec` per named layer (see `types.ts` for interface). Populate from base variant:
- `layout` — from Pass 2 (direction, sizingH/V, padding, spacing, alignment, wrap)
- `dimensions` — width/height ONLY if sizing is FIXED (not HUG/FILL), cornerRadius
- `typography` — from Pass 3a (fontSize, lineHeight, fontWeight, fontFamily)
- `toggleable: true` + `toggleProperty` for boolean-controlled elements
- `swappable: true` + `swapProperty` for instance swap slots

### 2c. Build `variantStyles` Array

One `VariantStyle` per variant (ALL variants, no exceptions). Each entry maps variant axis values to per-element visual styles:

```ts
{
  variantProps: { Selected: "Off", State: "Default", Size: "Medium" },
  elements: {
    Container: { fill: "#ffffff", fillToken: "white", stroke: "#e3e8ed", strokeToken: "neutrals-100", strokeWidth: 1 },
    Label: { textColor: "#252b36", textColorToken: "neutrals-900" },
    HelperText: { textColor: "#5b6a7e", textColorToken: "neutrals-500", visible: true },
  },
}
```

**Rules:**
- Every `fill` needs `fillToken`, every `stroke` needs `strokeToken` + `strokeWidth`, every `textColor` needs `textColorToken`
- Toggleable elements: always include `visible: true/false`
- Typography that varies by variant (e.g. different font size per size): add `fontSize`/`lineHeight`/`fontWeight` overrides in `ElementStyle`

### 2d. Build `tokenBindings` Array

Deduplicate bindings from Pass 4. One entry per unique element+property+token combination (see `TokenBinding` in `types.ts`).

### 2e. Populate Remaining Spec Fields

- **slug** — kebab-case URL-safe name
- **name** — display name from Figma
- **description** — one sentence
- **status** — `"stable"` for new components
- **figmaLink** — construct from node ID: `https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id with colon→dash}`
- **lastUpdated** — today's date (YYYY-MM-DD)
- **variants** — `{ name, useCase, props }` per use case
- **props** — one per variant axis + toggleable elements + text/content props
- **states** — from "State" axis values
- **sizes** — from "Size" axis values (if present)
- **guidelines** — do/don't rules from component purpose + lint findings
- **accessibility** — role, keyboard, ARIA attributes
- **relatedComponents** — slugs of related components in registry

### 2f. Validation Checklist

- [ ] `variantStyles` count matches total variant count from Pass 1
- [ ] Every axis value covered in `variantStyles`
- [ ] Every element in `elements` has entries in every `variantStyles` entry
- [ ] Every fill/stroke/textColor has paired token name
- [ ] No placeholder or guessed values — everything from MCP data
- [ ] All toggleable elements marked + have `visible` in variant styles
- [ ] Typography from `scan_text_nodes` only, never from bounding boxes
- [ ] Icons from SVG exports only, never approximated

---

## Step 3: Create Data File

Create `src/lib/components-data/[slug].ts` exporting `[name]Spec: ComponentSpec` with all fields from Step 2. See `src/lib/components-data/radio-v3.ts` or `input-field.ts` for reference.

---

## Step 4: Register

Add import + entry to `src/lib/components-data/registry.ts`. This auto-updates sidebar nav and `/components` index.

---

## Step 5: Create Route Page

Create `src/app/components/[slug]/page.tsx`. Use `src/app/components/input-field/page.tsx` as primary reference.

### Preview Component — Data-Driven (MANDATORY)

Build a local `FlowX[Name]` component. **Zero hardcoded hex values or font sizes.** All visual properties come from helpers:

```tsx
import { findVariantStyle, getElementSpec, buildElementStyle, getTextColor, getElementTypography, isElementVisible } from "@/lib/components-data/variant-style-helpers";

// Colors: getTextColor(spec, variantProps, "Label")
// Layout + fills: buildElementStyle(spec, variantProps, "Container")
// Typography: getElementTypography(spec, variantProps, "Label")
// Visibility: isElementVisible(spec, variantProps, "HelperText")
// Font: style={{ fontFamily: "var(--font-flowx)" }} on wrapper
```

Map component props → Figma axis names in a `variantProps` object, then look up styles. If you catch yourself writing `inverted ? "#xxx" : "#yyy"`, STOP — that value belongs in `variantStyles`.

### Page Section Order

StatusBanner → Title + Description → `<hr style={{ borderColor: "#f7f8f9" }} />` → Interactive Preview → Use Cases (grid) → States (labels below preview) → Sizes (labels below preview) → PropsTable → Anatomy (from `elements` with layout info) → DosAndDonts → Accessibility → Design Tokens (auto from `tokenBindings`) → Related Components.

Separate ALL sections with `<hr style={{ borderColor: "#f7f8f9" }} />`.

### Styling Conventions

- **Use case cards**: `backgroundColor: "#f7f8f9"`, no borders. Inverted: `bg-neutral-900`. Title (`text-sm font-medium`) + useCase (`text-xs text-muted-foreground`) below preview.
- **States/Sizes**: label text below the component preview, not above.
- **Design Tokens table**: auto-generate from `spec.tokenBindings` — columns: Element, Property, Token, Value (with color swatch).
- **Anatomy**: use `spec.elements` with layout/typography info and toggleable/swappable badges.

---

## Step 6: Verify

```bash
npm run build
```

- [ ] Build passes
- [ ] Route resolves (`/components/[slug]`)
- [ ] Appears in sidebar nav and `/components` index
- [ ] **Preview matches Figma screenshot from Pass 6** — if not, re-query Figma and fix
- [ ] All interactive controls work
- [ ] Typography matches (size, weight, line height)
- [ ] Layout matches (padding, spacing, alignment)
- [ ] Toggleable elements show/hide correctly
- [ ] Design Tokens section populated

---

## Step 7: Commit

```bash
git add -A
git commit -m "feat: add [Name] component page (Stage B)"
git push
```

---

## Quick Reference

### Vibma Tools

| Tool | Use |
|------|-----|
| `get_selection` (depth:1) | Enumerate variant IDs + axes |
| `get_node_info` (depth:-1) | Layout, fills, strokes, dimensions |
| `scan_text_nodes` | Typography (NOT colors) |
| `get_node_variables` | Token bindings |
| `search_nodes` + `export_node_as_image` (PNG) + `get_node_info` | Icon extraction (never SVG format — causes API 400) |
| `export_node_as_image` (PNG, scale:2) | Screenshot |
| `lint_node` | Quality checks |

### Variant Style Helpers

Import from `@/lib/components-data/variant-style-helpers`:

| Function | Returns |
|----------|---------|
| `findVariantStyle(spec, props)` | `VariantStyle` matching props |
| `getElementSpec(spec, part)` | `ElementSpec` (layout/dimensions/typography) |
| `getElementStyle(spec, props, part)` | `ElementStyle` (fill/stroke/color for variant) |
| `buildElementStyle(spec, props, part)` | `React.CSSProperties` (layout + variant combined) |
| `getTextColor(spec, props, part)` | Text color hex |
| `getElementTypography(spec, props, part)` | Typography with variant overrides → base fallback |
| `isElementVisible(spec, props, part)` | Boolean visibility |

### Reference Pages

- **Input Field** (`src/app/components/input-field/page.tsx`) — primary reference for data-driven preview pattern
- **Radio** (`src/app/components/radio/page.tsx`) — segment controller previews, borderless variant cards
- **Select Field** (`src/app/components/select-field/page.tsx`) — latest component, complex toggleable elements
