# Component Create v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite `component-create.md` as a precise, autonomous instruction file that Claude Code follows to extract 100% accurate Figma properties and build data-driven design system pages.

**Architecture:** Extend `ComponentSpec` with `ElementSpec`, `VariantStyle`, and `TokenBinding` types. Add a variant style lookup helper. Rewrite the instruction file with a 7-pass extraction pipeline, data assembly process, and data-driven preview component pattern.

**Tech Stack:** TypeScript, Next.js, Vibma MCP plugin (Figma)

---

## Task 1: Extend ComponentSpec Type

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/types.ts`

**Step 1: Add the new interfaces above `ComponentSpec`**

Add these interfaces to `types.ts` before the existing `ComponentSpec` interface:

```ts
export interface ElementLayout {
  direction?: "HORIZONTAL" | "VERTICAL" | "NONE";
  sizingH?: "FIXED" | "HUG" | "FILL";
  sizingV?: "FIXED" | "HUG" | "FILL";
  padding?: { top: number; right: number; bottom: number; left: number };
  itemSpacing?: number;
  counterAxisSpacing?: number;
  primaryAlign?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN";
  counterAlign?: "MIN" | "MAX" | "CENTER" | "BASELINE";
  wrap?: boolean;
}

export interface ElementDimensions {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  cornerRadius?: number | { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
}

export interface ElementTypography {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  fontFamily: string;
  letterSpacing?: number;
}

export interface ElementSpec {
  part: string;
  description: string;
  layout?: ElementLayout;
  dimensions?: ElementDimensions;
  typography?: ElementTypography;
  toggleable?: boolean;
  defaultVisible?: boolean;
  toggleProperty?: string;
  swappable?: boolean;
  swapProperty?: string;
}

export interface ElementStyle {
  fill?: string;
  fillToken?: string;
  stroke?: string;
  strokeToken?: string;
  strokeWidth?: number;
  textColor?: string;
  textColorToken?: string;
  opacity?: number;
  cornerRadius?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  svg?: string;
}

export interface VariantStyle {
  variantProps: Record<string, string>;
  elements: Record<string, ElementStyle>;
}

export interface TokenBinding {
  element: string;
  property: string;
  variableName: string;
  resolvedValue: string;
}
```

**Step 2: Add the new fields to `ComponentSpec`**

Add these fields to the existing `ComponentSpec` interface, keeping all existing fields unchanged:

```ts
export interface ComponentSpec {
  // ... all existing fields stay exactly as they are ...

  // New fields for v2 extraction
  elements?: ElementSpec[];
  variantStyles?: VariantStyle[];
  tokenBindings?: TokenBinding[];
}
```

The existing `anatomy` field stays for backward compatibility. New components will use `elements` instead.

**Step 3: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes — all existing code still compiles since new fields are optional.

**Step 4: Commit**

```bash
git add src/lib/components-data/types.ts
git commit -m "feat: extend ComponentSpec with ElementSpec, VariantStyle, TokenBinding types"
```

---

## Task 2: Add Variant Style Lookup Helper

**Files:**
- Create: `flowx-design-system/src/lib/components-data/variant-style-helpers.ts`

**Step 1: Create the helper file**

```ts
import type { ComponentSpec, ElementSpec, ElementStyle, VariantStyle } from "./types";

/**
 * Find the VariantStyle entry matching the given variant props.
 * Returns undefined if no exact match is found.
 */
export function findVariantStyle(
  spec: ComponentSpec,
  props: Record<string, string>
): VariantStyle | undefined {
  return spec.variantStyles?.find((vs) =>
    Object.entries(props).every(
      ([key, value]) => vs.variantProps[key] === value
    )
  );
}

/**
 * Get the ElementSpec (layout/dimensions/typography) for a named element.
 */
export function getElementSpec(
  spec: ComponentSpec,
  part: string
): ElementSpec | undefined {
  return spec.elements?.find((e) => e.part === part);
}

/**
 * Get the resolved style for a specific element within a specific variant.
 * Returns the ElementStyle with fill/stroke/textColor etc for that variant.
 */
export function getElementStyle(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): ElementStyle | undefined {
  const vs = findVariantStyle(spec, variantProps);
  return vs?.elements[elementPart];
}

/**
 * Build a CSS-ready inline style object for an element, combining
 * base layout/dimensions from ElementSpec with variant-specific
 * colors/visibility from VariantStyle.
 */
export function buildElementStyle(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): React.CSSProperties {
  const element = getElementSpec(spec, elementPart);
  const style = getElementStyle(spec, variantProps, elementPart);

  const css: React.CSSProperties = {};

  // Layout
  if (element?.layout) {
    const l = element.layout;
    if (l.direction === "HORIZONTAL") css.display = "flex";
    else if (l.direction === "VERTICAL") { css.display = "flex"; css.flexDirection = "column"; }
    if (l.padding) {
      css.paddingTop = l.padding.top;
      css.paddingRight = l.padding.right;
      css.paddingBottom = l.padding.bottom;
      css.paddingLeft = l.padding.left;
    }
    if (l.itemSpacing != null) css.gap = l.itemSpacing;
    if (l.primaryAlign) {
      const map: Record<string, string> = {
        MIN: "flex-start", MAX: "flex-end", CENTER: "center", SPACE_BETWEEN: "space-between",
      };
      css.justifyContent = map[l.primaryAlign];
    }
    if (l.counterAlign) {
      const map: Record<string, string> = {
        MIN: "flex-start", MAX: "flex-end", CENTER: "center", BASELINE: "baseline",
      };
      css.alignItems = map[l.counterAlign];
    }
    if (l.wrap) css.flexWrap = "wrap";
  }

  // Dimensions
  if (element?.dimensions) {
    const d = element.dimensions;
    if (d.width != null) css.width = d.width;
    if (d.height != null) css.height = d.height;
    if (d.minWidth != null) css.minWidth = d.minWidth;
    if (d.minHeight != null) css.minHeight = d.minHeight;
    if (d.cornerRadius != null) {
      css.borderRadius = typeof d.cornerRadius === "number"
        ? d.cornerRadius
        : `${d.cornerRadius.topLeft}px ${d.cornerRadius.topRight}px ${d.cornerRadius.bottomRight}px ${d.cornerRadius.bottomLeft}px`;
    }
  }

  // Variant-specific styles
  if (style) {
    if (style.fill) css.backgroundColor = style.fill;
    if (style.stroke) { css.borderColor = style.stroke; css.borderStyle = "solid"; }
    if (style.strokeWidth != null) css.borderWidth = style.strokeWidth;
    if (style.opacity != null) css.opacity = style.opacity;
    if (style.cornerRadius != null) css.borderRadius = style.cornerRadius;
    if (style.width != null) css.width = style.width;
    if (style.height != null) css.height = style.height;
  }

  return css;
}

/**
 * Get the text color for a named element in a specific variant.
 */
export function getTextColor(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): string | undefined {
  return getElementStyle(spec, variantProps, elementPart)?.textColor;
}

/**
 * Check if a toggleable element is visible in a specific variant.
 * Returns true by default if no visibility data exists.
 */
export function isElementVisible(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): boolean {
  const style = getElementStyle(spec, variantProps, elementPart);
  if (style?.visible != null) return style.visible;
  const element = getElementSpec(spec, elementPart);
  if (element?.toggleable) return element.defaultVisible ?? true;
  return true;
}
```

**Step 2: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes.

**Step 3: Commit**

```bash
git add src/lib/components-data/variant-style-helpers.ts
git commit -m "feat: add variant style lookup helpers for data-driven previews"
```

---

## Task 3: Rewrite component-create.md

This is the main deliverable. The instruction file must be precise enough for Claude Code to follow autonomously.

**Files:**
- Modify: `flowx-design-system/component-create.md`

**Step 1: Replace the entire file with the v2 instructions**

The new file follows this structure (write the complete content):

### Section 1: Header & Prerequisites

```markdown
# Component Create — Stage B Guide (v2)

Instructions for adding a new component page to the FlowX Design System documentation site.
These instructions are designed to be followed autonomously by Claude Code.

---

## Prerequisites

- The Figma MCP plugin (Vibma) is connected (port 3055, channel "vibma")
- The component SET is selected in Figma (not a single variant — the parent component set)
- The dev server is running (`npm run dev`)

---
```

### Section 2: Step 1 — Seven-Pass Figma Extraction

Write the complete extraction pipeline. Each pass specifies:
- The exact MCP tool and parameters
- What to extract from the response
- A completion check

```markdown
## Step 1: Extract Figma Data (Seven-Pass Pipeline)

You MUST complete all seven passes. Do not skip any pass. Do not sample — inspect EVERY variant.

### Pass 1: Enumerate all variants

**Tool:** `mcp__Vibma__get_selection` with `depth: 1`

**Extract:**
- Component set name (this becomes the component name)
- Component set node ID (for screenshots later)
- ALL child variant node IDs — save every single one
- Variant property axes: parse from child names (e.g. `"Selected=Off, State=Default, Border=On, Size=Medium"`) to build a map of axis names → possible values
- Boolean component properties (toggleable elements like "Left Icon", "Right Icon")
- Instance swap properties (swappable slots like "Icon")

**Completion check:**
- [ ] You have the component set name and node ID
- [ ] You have a complete list of ALL variant node IDs
- [ ] You have identified all variant axes and their values
- [ ] You know the total expected variant count (product of all axis values)
- [ ] You have identified all boolean/instance swap properties

### Pass 2: Structure & layout (EVERY variant)

**Tool:** `mcp__Vibma__get_node_info` on EVERY variant node ID

**Parameters:**
- `depth: -1` (full tree traversal)
- `fields: ["name", "type", "visible", "children", "fills", "strokes", "strokeWeight", "cornerRadius", "absoluteBoundingBox", "relativeTransform", "layoutMode", "layoutSizingHorizontal", "layoutSizingVertical", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing", "primaryAxisAlignItems", "counterAxisAlignItems", "layoutWrap", "opacity", "constraints", "componentProperties"]`

**Batch in groups of 5-10 node IDs per call** to avoid overwhelming the response.

**Extract per element in each variant:**
- `name` — the element/layer name (e.g., "Container", "Label", "Icon")
- `type` — FRAME, TEXT, VECTOR, INSTANCE, BOOLEAN_OPERATION, etc.
- `visible` — whether the element is visible in this variant
- `layoutMode` — NONE, HORIZONTAL, or VERTICAL
- `layoutSizingHorizontal` / `layoutSizingVertical` — FIXED, HUG, or FILL
- `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- `itemSpacing` — gap between children
- `counterAxisSpacing` — gap on cross axis (for wrap layouts)
- `primaryAxisAlignItems` / `counterAxisAlignItems` — alignment
- `layoutWrap` — NO_WRAP or WRAP
- `fills` — array of fills, extract hex color from each (format: extract `color.r`, `color.g`, `color.b` and convert to hex)
- `strokes` — array of strokes, extract hex color
- `strokeWeight` — border width in px
- `cornerRadius` — border radius in px (may be per-corner)
- `absoluteBoundingBox` — { x, y, width, height } for dimensions
- `opacity` — 0-1

**Completion check:**
- [ ] Every variant node ID from Pass 1 has been queried
- [ ] For each variant, you have a complete tree of named elements
- [ ] Every element has layout, dimension, fill, stroke, and visibility data

### Pass 3: Typography (EVERY variant)

**Tool:** `mcp__Vibma__scan_text_nodes` on EVERY variant node ID

**Extract per text node:**
- `fontSize` — exact size in px
- `fontFamily` — should be "Open Sans" for FlowX components
- `fontStyle` — e.g., "SemiBold", "Regular", "Bold"
- `fontWeight` — numeric (400=Regular, 600=SemiBold, 700=Bold)
- `lineHeight` — exact value in px
- `letterSpacing` — if present

**NEVER guess font sizes or weights from bounding boxes.** This pass is the ONLY source of truth for typography.

**Completion check:**
- [ ] Every variant has been scanned
- [ ] Every text node across all variants has fontSize, fontWeight, lineHeight

### Pass 4: Token bindings (EVERY variant)

**Tool:** `mcp__Vibma__get_node_variables` on every variant node ID

For each variant, walk the element tree and call `get_node_variables` on each node that has fills or strokes. This returns which Figma variables are bound to which properties.

**Extract:**
- `element` — the node/layer name
- `property` — e.g., `fills/0/color`, `strokes/0/color`
- `variableName` — e.g., `blue/500`, `neutrals/100`
- `resolvedValue` — the resolved hex value

**Completion check:**
- [ ] Every element with a fill or stroke has been checked for variable bindings
- [ ] Each binding recorded as: element + property + variableName + resolvedValue

### Pass 5: Icons & vectors

**Tool:** `mcp__Vibma__search_nodes` with `type: "VECTOR"` and/or `type: "BOOLEAN_OPERATION"` within each variant to find icon nodes.

Then: `mcp__Vibma__export_node_as_image` with `format: "SVG"` on each **unique** icon node to get exact SVG markup.

**Extract:**
- SVG path data for each unique icon
- viewBox dimensions
- Which variants/states use which icon

**Do NOT approximate icons with basic shapes.** Always extract the actual SVG.

**Completion check:**
- [ ] All VECTOR and BOOLEAN_OPERATION nodes identified
- [ ] Unique icons exported as SVG
- [ ] Icon-to-variant mapping documented

### Pass 6: Screenshot

**Tool:** `mcp__Vibma__export_node_as_image` on the component set node ID

**Parameters:** `format: "PNG"`, `scale: 2`

This is the **visual source of truth** — use it to verify your implementation matches at the end.

**Completion check:**
- [ ] Screenshot received and reviewed

### Pass 7: Lint

**Tool:** `mcp__Vibma__lint_node` on the component set node ID

**Extract:**
- Any warnings about hardcoded colors (should be variable-bound)
- WCAG compliance issues
- Missing auto-layout warnings

Note any findings — include relevant ones in the component's guidelines or accessibility sections.

**Completion check:**
- [ ] Lint results reviewed
- [ ] Relevant findings noted for documentation

---
```

### Section 3: Step 2 — Data Assembly

```markdown
## Step 2: Assemble the ComponentSpec Data

### 2a. Choose a base variant

Pick the variant with all-default values and all toggleable elements turned ON (visible). This is the "base" from which you'll define element structure.

### 2b. Build the `elements` array

From the base variant's element tree (Pass 2), create one `ElementSpec` per named layer:

```ts
elements: [
  {
    part: "Label",
    description: "Text label above the input container.",
    layout: {
      direction: "HORIZONTAL",        // from layoutMode
      sizingH: "HUG",                 // from layoutSizingHorizontal
      sizingV: "HUG",                 // from layoutSizingVertical
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
      itemSpacing: 8,                 // from itemSpacing
    },
    dimensions: {
      width: 120,                     // from absoluteBoundingBox.width (only if FIXED)
      height: 24,                     // from absoluteBoundingBox.height (only if FIXED)
      cornerRadius: 0,
    },
    typography: {                     // from Pass 3
      fontSize: 14,
      lineHeight: 24,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    toggleable: false,
  },
  {
    part: "Leading Icon",
    description: "Optional icon before the text content.",
    toggleable: true,
    defaultVisible: false,
    toggleProperty: "Left Icon",      // the Figma boolean property name
    dimensions: { width: 16, height: 16 },
  },
  // ... one entry per element
]
```

**Rules:**
- Only record `width`/`height` in `dimensions` if the element's sizing mode is FIXED. If HUG or FILL, omit them — the sizing mode tells the story.
- `toggleable: true` for elements controlled by Figma boolean properties
- `swappable: true` + `swapProperty` for instance swap slots

### 2c. Build the `variantStyles` array

One entry per variant from Pass 1. For each variant, record the visual properties of every element **that differ from the base variant OR are essential for rendering** (fills, strokes, text colors, visibility):

```ts
variantStyles: [
  {
    variantProps: { Selected: "Off", State: "Default", Border: "On", Size: "Medium", Inverted: "Off" },
    elements: {
      "Container": {
        fill: "#ffffff",
        fillToken: "grays/50",
        stroke: "#e3e8ed",
        strokeToken: "neutrals/100",
        strokeWidth: 1,
      },
      "Radio Icon": {
        stroke: "#cbd1db",
        strokeToken: "neutrals/300",
        strokeWidth: 1.5,
        fill: "transparent",
      },
      "Label": {
        textColor: "#1d232c",
        textColorToken: "neutrals/900",
      },
      "Value": {
        textColor: "#1d232c",
        textColorToken: "neutrals/900",
      },
      "Error Icon": {
        visible: false,
      },
    },
  },
  // ... one entry per variant (ALL variants, not a sample)
]
```

**Rules:**
- Include ALL variants — do not sample or skip any
- Always include `fill` + `fillToken` (hex + variable name) when available
- Always include `stroke` + `strokeToken` + `strokeWidth` when the element has a stroke
- Always include `textColor` + `textColorToken` for text elements
- Always include `visible: false` for elements hidden in that variant
- Always include `visible: true` for toggleable elements that are shown

### 2d. Build the `tokenBindings` array

Flatten all variable bindings from Pass 4 into a deduplicated list:

```ts
tokenBindings: [
  { element: "Container", property: "fills/0/color", variableName: "grays/50", resolvedValue: "#ffffff" },
  { element: "Container", property: "strokes/0/color", variableName: "neutrals/100", resolvedValue: "#e3e8ed" },
  { element: "Radio Icon", property: "fills/0/color", variableName: "blue/500", resolvedValue: "#006bd8" },
  // ...
]
```

### 2e. Populate remaining spec fields

- `slug` — kebab-case component name
- `name` — display name from Figma
- `description` — brief description of the component's purpose
- `status` — "stable" (default for new components)
- `figmaLink` — the Figma file URL with node-id parameter
- `lastUpdated` — today's date (YYYY-MM-DD)
- `variants` — one entry per meaningful variant combination, with name, description, and props
- `props` — one prop per variant axis + one per toggleable element + text/content props
- `states` — from the "State" variant axis values
- `sizes` — from the "Size" variant axis values (if present)
- `guidelines` — do/don't rules inferred from component purpose + lint findings
- `accessibility` — role, keyboard interactions, ARIA attributes appropriate for the component type
- `relatedComponents` — slugs of related components already in the registry

### 2f. Validation checklist

Before writing the data file, verify:
- [ ] Every variant axis value appears in at least one `variantStyles` entry
- [ ] The number of `variantStyles` entries equals the total variant count from Pass 1
- [ ] Every element in `elements` has corresponding entries in `variantStyles`
- [ ] Every fill/stroke has a hex value, and a token name if a binding was found in Pass 4
- [ ] No placeholder, approximated, or guessed values — everything comes from MCP data
- [ ] All toggleable elements have `toggleable: true`, `defaultVisible`, and `toggleProperty`
- [ ] Typography values come from Pass 3 (`scan_text_nodes`), never from bounding boxes

---
```

### Section 4: Steps 3-5 (File creation, registration, route)

```markdown
## Step 3: Create Data File

Create `src/lib/components-data/[slug].ts`:

```ts
import { type ComponentSpec } from "./types";

export const [name]Spec: ComponentSpec = {
  // ... all fields from Step 2 ...
};
```

---

## Step 4: Register the Component

Edit `src/lib/components-data/registry.ts`:

```ts
import { [name]Spec } from "./[slug]";

// Add to the array:
export const componentRegistry: ComponentSpec[] = [
  // ... existing entries ...
  [name]Spec,
];
```

This auto-updates the sidebar nav and components index page.

---

## Step 5: Create the Route Page

Create `src/app/components/[slug]/page.tsx`.

### Build a Data-Driven Preview Component

The preview component reads from the spec's `variantStyles` — do NOT hardcode hex values in conditionals.

**Import the helpers:**

```tsx
import {
  findVariantStyle,
  getElementSpec,
  getElementStyle,
  buildElementStyle,
  getTextColor,
  isElementVisible,
} from "@/lib/components-data/variant-style-helpers";
```

**Preview component pattern:**

```tsx
function FlowX[Name]({
  [prop1] = defaultValue,
  [prop2] = defaultValue,
  state = "default",
  size = "medium",
}: {
  [prop1]?: type;
  [prop2]?: type;
  state?: "default" | "error" | "disabled";
  size?: "small" | "medium";
}) {
  const spec = [name]Spec;

  // Build the variant props object matching the Figma axis names
  const variantProps: Record<string, string> = {
    [AxisName1]: [prop1] ? "On" : "Off",
    State: state.charAt(0).toUpperCase() + state.slice(1),
    Size: size.charAt(0).toUpperCase() + size.slice(1),
    // ... map each component prop to its Figma axis name and value
  };

  // Get element styles from spec data
  const containerStyle = buildElementStyle(spec, variantProps, "Container");
  const labelColor = getTextColor(spec, variantProps, "Label");
  const valueColor = getTextColor(spec, variantProps, "Value");
  const showErrorIcon = isElementVisible(spec, variantProps, "Error Icon");
  const showLeadingIcon = isElementVisible(spec, variantProps, "Leading Icon");

  // Get base layout from element specs
  const containerSpec = getElementSpec(spec, "Container");
  const labelTypo = getElementSpec(spec, "Label")?.typography;

  return (
    <div style={{ fontFamily: "var(--font-flowx)" }}>
      {/* Label */}
      <span style={{
        fontSize: labelTypo?.fontSize,
        lineHeight: `${labelTypo?.lineHeight}px`,
        fontWeight: labelTypo?.fontWeight,
        color: labelColor,
      }}>
        {label}
      </span>

      {/* Container — style comes from spec data */}
      <div style={containerStyle}>
        {/* Toggleable leading icon */}
        {showLeadingIcon && (
          <svg>...</svg>
        )}

        {/* Content */}
        <span style={{ color: valueColor }}>
          {value}
        </span>
      </div>

      {/* Toggleable error icon */}
      {showErrorIcon && (
        <svg>...</svg>
      )}
    </div>
  );
}
```

**Key rules:**
- ALL colors come from `getTextColor()`, `getElementStyle()`, or `buildElementStyle()`
- ALL dimensions come from `getElementSpec()` layout/dimensions
- ALL toggleable elements use `isElementVisible()` for conditional rendering
- Use `font-family: var(--font-flowx)` on the preview wrapper
- SVG icons: use the exact SVG path data extracted in Pass 5

### Page structure

Follow the exact same section order as existing pages. Refer to `src/app/components/radio-v3/page.tsx` as the template for:
- Section order (StatusBanner → Title → Preview → Variants → States → Sizes → Props → Anatomy → Guidelines → Accessibility → Tokens → Related)
- Separator style: `<hr style={{ borderColor: "#f7f8f9" }} />`
- Variant card style: `backgroundColor: "#f7f8f9"`, no borders, inverted gets `bg-neutral-900`
- Labels below previews in States and Sizes sections
- Interactive preview with segment controllers for each prop

### Design Tokens Used section

Auto-generate from `tokenBindings`:

```tsx
const componentTokens = spec.tokenBindings
  ? [...new Map(spec.tokenBindings.map(tb => [
      tb.variableName,
      {
        name: `${tb.variableName} (${tb.resolvedValue})`,
        value: tb.element + " " + tb.property.replace("fills/0/color", "fill").replace("strokes/0/color", "stroke"),
        preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: tb.resolvedValue }} />,
      }
    ])).values()]
  : [];
```

### Anatomy section

If `elements` exists, use it instead of `anatomy`. Show layout info:

```tsx
const anatomyFromElements = spec.elements?.map(e => ({
  part: e.part,
  description: `${e.description}${e.layout?.sizingH ? ` (${e.layout.sizingH} x ${e.layout.sizingV})` : ""}${e.toggleable ? " [toggleable]" : ""}`,
}));
```

---
```

### Section 5: Steps 6-7 (Verify, Commit)

```markdown
## Step 6: Verify

```bash
npm run build
```

Check:
- [ ] Build passes with no errors
- [ ] New route resolves (`/components/[slug]`)
- [ ] Component appears in sidebar nav (auto from registry)
- [ ] Component appears on `/components` index page
- [ ] **Preview visually matches Figma screenshot from Pass 6** — compare carefully
- [ ] All sections render from the ComponentSpec data
- [ ] Interactive controls work (each prop updates the preview)
- [ ] Variant cards show correct colors for each combination
- [ ] Toggleable elements appear/disappear correctly
- [ ] Typography matches (font size, weight, line height)
- [ ] Layout matches (spacing, padding, alignment, sizing)
- [ ] Design Tokens section shows all bound tokens

If the preview does NOT match the screenshot, go back to the extracted data and fix discrepancies. Do NOT approximate — re-query Figma if needed.

---

## Step 7: Commit & Push

```bash
git add -A
git commit -m "feat: add [Name] component page (Stage B)"
git push
```

---
```

### Section 6: Reference & Pitfalls

```markdown
## Reference: Existing Component Pages

- **Radio V3** (`src/app/components/radio-v3/page.tsx`) — primary reference for page structure, section order, card styling, labels-below-preview pattern
- **Checkbox** (`src/app/components/checkbox/page.tsx`) — reference for toggle states and bordered containers
- **Button** (`src/app/components/button/page.tsx`) — simplest example using shadcn directly

## Reference: Vibma MCP Tools

| Tool | Purpose |
|------|---------|
| `get_selection` | Get selected component set + variant children |
| `get_node_info` | Detailed properties: layout, fills, strokes, dimensions |
| `scan_text_nodes` | Typography: fontSize, fontWeight, lineHeight |
| `get_node_variables` | Token bindings: which variables are bound to properties |
| `search_nodes` | Find nodes by type (VECTOR, BOOLEAN_OPERATION) |
| `export_node_as_image` | Screenshot (PNG) or icon export (SVG) |
| `lint_node` | Quality check: hardcoded colors, WCAG, auto-layout |

## Reference: Variant Style Helpers

Import from `@/lib/components-data/variant-style-helpers`:

| Function | Purpose |
|----------|---------|
| `findVariantStyle(spec, props)` | Find VariantStyle entry matching variant props |
| `getElementSpec(spec, part)` | Get ElementSpec (layout/dimensions) by part name |
| `getElementStyle(spec, props, part)` | Get fill/stroke/color for element in variant |
| `buildElementStyle(spec, props, part)` | Build CSS inline style object for element |
| `getTextColor(spec, props, part)` | Get text color hex for element in variant |
| `isElementVisible(spec, props, part)` | Check if toggleable element is visible |

## Common Pitfalls

1. **Don't sample variants** — inspect ALL of them. Colors may differ across variant combinations you didn't check.
2. **Don't guess typography** — always use `scan_text_nodes`. SemiBold=600, Regular=400, Bold=700.
3. **Don't approximate icons** — export as SVG from Figma. Check for custom paths vs simple shapes.
4. **Don't hardcode colors in the preview component** — all colors come from `variantStyles` via helper functions.
5. **Don't skip token bindings** — call `get_node_variables` on every element with fills/strokes.
6. **Don't forget toggleable elements** — check for boolean component properties in Pass 1.
7. **Don't ignore layout sizing** — capture FIXED/HUG/FILL for every element. This determines whether to set explicit width/height.
8. **Don't skip validation** — compare preview against Figma screenshot. If they don't match, fix it.
9. **Use `font-family: var(--font-flowx)`** — component previews render in Open Sans, not the docs font.
10. **Labels go below previews** — in States and Sizes sections, label sits below the component.
```

**Step 2: Verify the new instructions file is well-formed**

Read through the entire file. Check that:
- All MCP tool names are correct (`mcp__Vibma__` prefix)
- All field names match Figma API conventions
- Code examples are syntactically valid TypeScript/TSX
- No references to removed/old approaches

**Step 3: Verify build still passes**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes (the .md file doesn't affect build, but we want to make sure nothing else broke).

**Step 4: Commit**

```bash
git add component-create.md
git commit -m "docs: rewrite component-create.md with v2 seven-pass extraction pipeline"
```

---

## Task 4: Final Integration Verification

**Step 1: Verify all three deliverables exist and are consistent**

- `src/lib/components-data/types.ts` — has `ElementSpec`, `VariantStyle`, `TokenBinding`, and updated `ComponentSpec`
- `src/lib/components-data/variant-style-helpers.ts` — has all 6 helper functions, imports from `types.ts`
- `component-create.md` — references the correct type names and helper function names

**Step 2: Full build check**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Clean build, no errors, no warnings related to new code.

**Step 3: Final commit (if any fixups needed)**

```bash
git add -A && git commit -m "chore: integration fixups for component-create v2"
```

---

## Acceptance Checklist

- [ ] `ComponentSpec` type extended with `ElementSpec`, `VariantStyle`, `TokenBinding`
- [ ] All new type fields are optional (backward compatible with existing components)
- [ ] Variant style helpers compile and export 6 functions
- [ ] `component-create.md` specifies all 7 extraction passes with exact MCP tool names and parameters
- [ ] Instructions require inspecting EVERY variant (no sampling)
- [ ] Instructions capture layout sizing (FILL/HUG/FIXED) for every element
- [ ] Instructions capture token bindings via `get_node_variables`
- [ ] Instructions capture toggleable/swappable elements
- [ ] Preview component pattern uses helper functions, not hardcoded hex
- [ ] Validation checklist included before writing data file
- [ ] `npm run build` passes
