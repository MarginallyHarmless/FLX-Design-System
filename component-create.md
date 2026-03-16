# Component Create — Stage B Guide (v2)

Instructions for adding a new component page to the FlowX Design System documentation site.
These instructions are designed to be followed autonomously by Claude Code.

---

## Prerequisites

- The Figma MCP plugin (Vibma) is connected (port 3055, channel "vibma")
- The component SET is selected in Figma (not a single variant — the parent component set)
- The dev server is running (`npm run dev`)

---

## Step 1: Seven-Pass Figma Extraction Pipeline

Every component must go through ALL seven passes. Do not skip passes or sample a subset of variants. Each pass has a completion checklist — tick every item before moving on.

### Pass 1: Enumerate All Variants

**Tool:** `mcp__Vibma__get_selection` with `depth: 1`

Extract:
- **Component set name** and **node ID** (the parent)
- **ALL child variant node IDs** — these are the direct children at depth 1
- **Variant axes** parsed from child names (e.g. `"Selected=Off, State=Default, Border=On, Size=Medium"` → axes: Selected, State, Border, Size)
- **Boolean component properties** — toggleable elements (e.g. "Show Label", "Show Helper Text")
- **Instance swap properties** — slots that accept different sub-components (e.g. "Icon" instance swap)

**Completion checklist:**
- [ ] Component set name recorded
- [ ] Component set node ID recorded
- [ ] ALL child variant node IDs listed (not a sample — every single one)
- [ ] All variant axes identified with their possible values
- [ ] Boolean component properties identified
- [ ] Instance swap properties identified

---

### Pass 2: Structure & Layout (EVERY Variant)

**Tool:** `mcp__Vibma__get_node_info` on **EVERY** variant node ID from Pass 1

**Parameters:**
- `depth: -1` (full subtree)
- `fields: ["name", "type", "visible", "children", "fills", "strokes", "strokeWeight", "cornerRadius", "absoluteBoundingBox", "relativeTransform", "layoutMode", "layoutSizingHorizontal", "layoutSizingVertical", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing", "primaryAxisAlignItems", "counterAxisAlignItems", "layoutWrap", "opacity", "constraints", "componentProperties"]`

**Batch in groups of 5–10** to avoid overloading the plugin.

**Extract per element:**
- `name`, `type`, `visible`
- `layoutMode` (HORIZONTAL / VERTICAL / NONE)
- `layoutSizingHorizontal`, `layoutSizingVertical` (FIXED / HUG / FILL)
- `paddingTop/Right/Bottom/Left`, `itemSpacing`, `counterAxisSpacing`
- `primaryAxisAlignItems`, `counterAxisAlignItems`
- `layoutWrap`
- `fills` (extract hex), `strokes` (extract hex), `strokeWeight`
- `cornerRadius`
- `absoluteBoundingBox` (x, y, width, height)
- `opacity`

**Completion checklist:**
- [ ] EVERY variant node queried (count matches Pass 1)
- [ ] Element tree documented for each variant
- [ ] Layout properties recorded for all auto-layout frames
- [ ] Fill and stroke hex values recorded for all elements
- [ ] Differences between variants noted

---

### Pass 3: Typography (EVERY Variant)

**Tool:** `mcp__Vibma__scan_text_nodes` on **EVERY** variant node ID

Extract:
- `fontSize`
- `fontFamily`
- `fontStyle` (e.g. "SemiBold", "Regular", "Bold")
- `fontWeight` (numeric: 400, 600, 700)
- `lineHeight` (px or %)
- `letterSpacing`

**NEVER guess font sizes or weights from bounding boxes.** The `scan_text_nodes` tool returns exact typographic data — always use it.

**Completion checklist:**
- [ ] EVERY variant scanned for text nodes
- [ ] fontSize, fontFamily, fontWeight, lineHeight recorded per text element per variant
- [ ] Variations across sizes noted (e.g. small = 12px, medium = 14px)
- [ ] No values guessed from bounding box dimensions

---

### Pass 4: Token Bindings (EVERY Variant)

**Tool:** `mcp__Vibma__get_node_variables` on every variant node ID, walking the element tree

Extract per binding:
- `element` — the layer name (e.g. "Container", "Label", "Icon")
- `property` — the CSS-like property bound (e.g. "fill", "stroke", "textColor")
- `variableName` — the design token name (e.g. "blue-500", "neutrals-100")
- `resolvedValue` — the computed value (e.g. "#006bd8", "#e3e8ed")

**Completion checklist:**
- [ ] EVERY variant's element tree walked for variable bindings
- [ ] Token name AND resolved value recorded for each binding
- [ ] Bindings cover fills, strokes, text colors, and any other bound properties
- [ ] Duplicate bindings noted (same token used in multiple variants)

---

### Pass 5: Icons & Vectors

**Tools:**
1. `mcp__Vibma__search_nodes` with type `VECTOR` and `BOOLEAN_OPERATION` to find all icon/vector nodes
2. `mcp__Vibma__export_node_as_image` with `format: "SVG"` on each icon node

Extract:
- SVG paths (`d` attributes)
- `viewBox` dimensions
- Icon-to-variant mapping (which icon appears in which variant)

**Do NOT approximate icons** with basic shapes (circles, rectangles). Always extract the exact SVG path data from Figma.

**Completion checklist:**
- [ ] All VECTOR and BOOLEAN_OPERATION nodes identified
- [ ] SVG path data exported for each unique icon
- [ ] viewBox recorded for each icon
- [ ] Icons mapped to the variants/states where they appear

---

### Pass 6: Screenshot

**Tool:** `mcp__Vibma__export_node_as_image` with `format: "PNG"`, `scale: 2` on the component set node ID

This screenshot is the **visual source of truth**. Every implementation decision must be visually verified against it.

**Completion checklist:**
- [ ] Screenshot exported at 2x resolution
- [ ] Screenshot reviewed and all visual states visible

---

### Pass 7: Lint

**Tool:** `mcp__Vibma__lint_node` on the component set node ID

Extract:
- All lint warnings and errors
- Note any warnings that should be documented (e.g. detached styles, missing descriptions)

**Completion checklist:**
- [ ] Lint run completed
- [ ] Warnings reviewed and relevant ones noted for documentation

---

## Step 2: Data Assembly

Using the extracted Figma data from all seven passes, assemble the `ComponentSpec` data structure.

### 2a. Choose a Base Variant

Pick the variant with **all default values** and **all boolean toggles set to ON** (i.e. all optional elements visible). This becomes the baseline from which all other variants' differences are described.

Example: for a Radio Button, the base variant might be `Selected=Off, State=Default, Border=On, Size=Medium, Inverted=Off` with all labels visible.

### 2b. Build the `elements` Array

Create one `ElementSpec` per named layer in the component anatomy. Each element captures its structural/layout properties (which are constant across variants) and its toggleable/swappable nature.

```ts
import type { ElementSpec } from "./types";

const elements: ElementSpec[] = [
  {
    part: "Container",
    description: "Outer wrapper frame",
    layout: {
      direction: "HORIZONTAL",
      sizingH: "FILL",
      sizingV: "HUG",
      padding: { top: 12, right: 16, bottom: 12, left: 16 },
      itemSpacing: 12,
      primaryAlign: "MIN",
      counterAlign: "CENTER",
    },
    dimensions: {
      cornerRadius: 8,
    },
  },
  {
    part: "Label",
    description: "Primary text label",
    typography: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
  },
  {
    part: "HelperText",
    description: "Optional helper text below label",
    typography: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: 400,
      fontFamily: "Open Sans",
    },
    toggleable: true,
    defaultVisible: true,
    toggleProperty: "Show Helper Text",
  },
  {
    part: "Icon",
    description: "Leading icon slot",
    swappable: true,
    swapProperty: "Icon",
    dimensions: {
      width: 20,
      height: 20,
    },
  },
];
```

**Rules:**
- Only record `width`/`height` in `dimensions` if the sizing is **FIXED** (not HUG or FILL)
- Set `toggleable: true` for elements controlled by boolean component properties
- Set `swappable: true` for elements that are instance swap slots
- Typography values MUST come from Pass 3 (`scan_text_nodes`), never estimated

### 2c. Build the `variantStyles` Array

Create one `VariantStyle` per variant combination. Each entry maps variant props to per-element visual styles (fills, strokes, text colors, visibility).

```ts
import type { VariantStyle } from "./types";

const variantStyles: VariantStyle[] = [
  {
    variantProps: { Selected: "Off", State: "Default", Border: "On", Size: "Medium", Inverted: "Off" },
    elements: {
      Container: {
        fill: "#ffffff",
        fillToken: "white",
        stroke: "#e3e8ed",
        strokeToken: "neutrals-100",
        strokeWidth: 1,
      },
      Label: {
        textColor: "#252b36",
        textColorToken: "neutrals-900",
      },
      HelperText: {
        textColor: "#5b6a7e",
        textColorToken: "neutrals-500",
        visible: true,
      },
      RadioIcon: {
        stroke: "#a6b0be",
        strokeToken: "neutrals-300",
        strokeWidth: 2,
        fill: "transparent",
      },
    },
  },
  {
    variantProps: { Selected: "On", State: "Default", Border: "On", Size: "Medium", Inverted: "Off" },
    elements: {
      Container: {
        fill: "#e6f0fb",
        fillToken: "blue-50",
        stroke: "#006bd8",
        strokeToken: "blue-500",
        strokeWidth: 1,
      },
      Label: {
        textColor: "#252b36",
        textColorToken: "neutrals-900",
      },
      RadioIcon: {
        fill: "#006bd8",
        fillToken: "blue-500",
      },
    },
  },
  // ... one entry for EVERY variant combination
];
```

**Rules:**
- **ALL variants must have an entry** — do not skip any combination
- Always include BOTH the hex value AND the token name: `fill` + `fillToken`, `stroke` + `strokeToken` + `strokeWidth`, `textColor` + `textColorToken`
- For toggleable elements, always include `visible: true` or `visible: false`
- Record visibility changes — if a helper text disappears in a specific variant, set `visible: false`

### 2d. Build the `tokenBindings` Array

Deduplicate the bindings from Pass 4 into a flat array. Each unique element+property+token combination appears once.

```ts
import type { TokenBinding } from "./types";

const tokenBindings: TokenBinding[] = [
  { element: "Container", property: "fill", variableName: "white", resolvedValue: "#ffffff" },
  { element: "Container", property: "fill", variableName: "blue-50", resolvedValue: "#e6f0fb" },
  { element: "Container", property: "stroke", variableName: "neutrals-100", resolvedValue: "#e3e8ed" },
  { element: "Container", property: "stroke", variableName: "blue-500", resolvedValue: "#006bd8" },
  { element: "Label", property: "textColor", variableName: "neutrals-900", resolvedValue: "#252b36" },
  // ... all unique bindings
];
```

### 2e. Populate Remaining Spec Fields

Fill in the rest of the `ComponentSpec`:

- **slug** — URL-safe kebab-case name (e.g. `"radio-button"`)
- **name** — display name (e.g. `"Radio Button"`)
- **description** — one-sentence summary of the component's purpose
- **status** — `"stable"`, `"beta"`, `"deprecated"`, or `"planned"`
- **figmaLink** — URL to the Figma component
- **lastUpdated** — today's date in `YYYY-MM-DD` format
- **variants** — array of `{ name, description, props }` for each meaningful variant
- **props** — array of prop definitions with name, type, default, options, description
- **states** — array of interaction states (e.g. `["default", "hover", "focus", "error", "disabled"]`)
- **sizes** — array of size variants if applicable (e.g. `["small", "medium"]`)
- **guidelines** — do/don't usage guidelines inferred from the component's purpose
- **accessibility** — role, keyboard interactions, ARIA attributes
- **relatedComponents** — slugs of related components in the system

### 2f. Validation Checklist

Before proceeding to file creation, verify:

- [ ] Every variant axis value is covered in `variantStyles` (e.g. if Selected has On/Off and State has Default/Error/Disabled, all combinations exist)
- [ ] Variant count in `variantStyles` matches the total number of child variants from Pass 1
- [ ] Every element in `elements` has corresponding entries in every `variantStyles` entry (at minimum fill or textColor)
- [ ] Every `fill` has a `fillToken`, every `stroke` has a `strokeToken`, every `textColor` has a `textColorToken`
- [ ] No placeholder or "TODO" values remain
- [ ] All toggleable elements are marked with `toggleable: true` and have `visible` in their variant styles
- [ ] All typography values come from `scan_text_nodes` (Pass 3), not estimated
- [ ] Icon SVG paths are from actual exports (Pass 5), not approximated

---

## Step 3: Create Data File

Create `src/lib/components-data/[slug].ts` exporting the full `ComponentSpec`:

```ts
import type { ComponentSpec } from "./types";

export const [name]Spec: ComponentSpec = {
  slug: "[slug]",
  name: "[Display Name]",
  description: "[One-sentence description]",
  status: "stable",
  figmaLink: "https://figma.com/file/...",
  lastUpdated: "YYYY-MM-DD",

  elements: [
    // From Step 2b — one ElementSpec per named layer
  ],

  variantStyles: [
    // From Step 2c — one VariantStyle per variant combination
  ],

  tokenBindings: [
    // From Step 2d — deduplicated token bindings
  ],

  variants: [
    // { name, description, props } for each variant
  ],

  props: [
    // { name, type, default, options, description }
  ],

  states: ["default", "hover", "focus", "error", "disabled"],
  sizes: ["small", "medium"],

  anatomy: [
    // { part, description } — can be derived from elements
  ],

  guidelines: {
    do: [{ description: "..." }],
    dont: [{ description: "..." }],
  },

  accessibility: {
    role: "...",
    keyboard: ["Key — Action"],
    ariaAttributes: ["aria-attr — Purpose"],
  },

  relatedComponents: ["..."],
};
```

---

## Step 4: Register the Component

Edit `src/lib/components-data/registry.ts`:

```ts
import { [name]Spec } from "./[slug]";

// Add to the componentRegistry array:
export const componentRegistry: ComponentSpec[] = [
  buttonSpec,
  checkboxSpec,
  radioV3Spec,
  [name]Spec,  // ← add here
];
```

This auto-updates the sidebar navigation and the `/components` index page.

---

## Step 5: Create the Route Page

Create `src/app/components/[slug]/page.tsx`.

### Imports

```tsx
"use client";

import Link from "next/link";
import { [name]Spec } from "@/lib/components-data/[slug]";
import {
  findVariantStyle,
  getElementSpec,
  buildElementStyle,
  getTextColor,
  isElementVisible,
} from "@/lib/components-data/variant-style-helpers";
import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";
```

### Data-Driven Preview Component

Build a local `FlowX[Name]` component that reads ALL visual properties from the spec via helpers:

```tsx
function FlowX[Name]({
  // Variant props matching the component's axes
  selected = false,
  state = "default",
  size = "medium",
  // ... other variant props
  label = "Label",
}: {
  selected?: boolean;
  state?: "default" | "error" | "disabled";
  size?: "small" | "medium";
  label?: string;
}) {
  const spec = [name]Spec;

  // Build variant props object to look up styles
  const variantProps = {
    Selected: selected ? "On" : "Off",
    State: state.charAt(0).toUpperCase() + state.slice(1),
    Size: size.charAt(0).toUpperCase() + size.slice(1),
  };

  // Get variant-specific styles for each element
  const vs = findVariantStyle(spec, variantProps);

  // Build CSS for structural elements
  const containerStyle = buildElementStyle(spec, variantProps, "Container");
  const labelColor = getTextColor(spec, variantProps, "Label");

  // Check toggleable element visibility
  const showHelperText = isElementVisible(spec, variantProps, "HelperText");

  // Get typography from element spec
  const labelSpec = getElementSpec(spec, "Label");

  return (
    <div style={{ ...containerStyle, fontFamily: "var(--font-flowx)" }}>
      {/* Render elements using spec data */}
      <span style={{
        color: labelColor,
        fontSize: labelSpec?.typography?.fontSize,
        fontWeight: labelSpec?.typography?.fontWeight,
        lineHeight: `${labelSpec?.typography?.lineHeight}px`,
      }}>
        {label}
      </span>
      {showHelperText && (
        <span style={{
          color: getTextColor(spec, variantProps, "HelperText"),
          fontSize: getElementSpec(spec, "HelperText")?.typography?.fontSize,
        }}>
          Helper text
        </span>
      )}
    </div>
  );
}
```

**Key rules for the preview component:**
- **ALL colors** must come from helpers (`getTextColor`, `buildElementStyle`, `getElementStyle`) — never hardcode hex values
- **ALL dimensions** (padding, gap, border-radius, fixed sizes) come from the spec via `buildElementStyle` or `getElementSpec`
- **ALL toggleable elements** use `isElementVisible` to conditionally render
- **Font family** is always `var(--font-flowx)` for component previews
- **SVG icon paths** must be the exact paths extracted in Pass 5 — never approximated

### Page Structure

Follow this exact section order (same as Radio V3):

```tsx
export default function [Name]Page() {
  const spec = [name]Spec;

  return (
    <div className="space-y-10">
      {/* 1. StatusBanner */}
      <StatusBanner status={spec.status} />

      {/* 2. Title + Description */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{spec.name}</h1>
        <p className="text-muted-foreground">{spec.description}</p>
      </div>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 3. Interactive Preview */}
      {/* ComponentPreview with controls mapped from variant axes */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 4. Variants */}
      {/* Grid of all variant cards */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 5. States */}
      {/* Show each state with labels below */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 6. Sizes */}
      {/* Show each size with labels below */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 7. Props */}
      <PropsTable props={spec.props} />

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 8. Anatomy */}
      {/* AnatomyDiagram with layout info from elements when available */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 9. Guidelines */}
      {spec.guidelines && <DosAndDonts guidelines={spec.guidelines} />}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 10. Accessibility */}
      {/* Keyboard + ARIA info */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 11. Design Tokens */}
      {/* Auto-generated from tokenBindings */}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 12. Related Components */}
      {/* Links to related component pages */}
    </div>
  );
}
```

### Separator Style

Use `<hr style={{ borderColor: "#f7f8f9" }} />` (neutrals-50) between ALL sections. Do **not** use the `<Separator />` component.

### Variant Card Style

```tsx
<div
  className={`flex flex-col items-center gap-3 rounded-lg p-6 ${
    isInverted ? "bg-neutral-900 text-white" : ""
  }`}
  style={!isInverted ? { backgroundColor: "#f7f8f9" } : undefined}
>
  <FlowX[Name] {...variantProps} />
  <p className={`text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
    {variant.name}
  </p>
</div>
```

- No borders on variant cards
- `backgroundColor: "#f7f8f9"` for normal variants
- `bg-neutral-900` for inverted variants
- Labels **below** previews, styled as `text-xs text-muted-foreground`

### States Section

Labels go **below** the component preview:

```tsx
{spec.states.map((s) => (
  <div key={s} className="flex flex-col items-center gap-3">
    <div className="flex gap-3">
      <FlowX[Name] selected={false} state={s} />
      <FlowX[Name] selected={true} state={s} />
    </div>
    <span className="text-xs text-muted-foreground capitalize">{s}</span>
  </div>
))}
```

### Design Tokens Section

Auto-generate from `tokenBindings`:

```tsx
{spec.tokenBindings && spec.tokenBindings.length > 0 && (
  <section>
    <h2 className="text-xl font-semibold mb-4">Design Tokens</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="pb-2 pr-4">Element</th>
            <th className="pb-2 pr-4">Property</th>
            <th className="pb-2 pr-4">Token</th>
            <th className="pb-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {spec.tokenBindings.map((tb, i) => (
            <tr key={i} className="border-b">
              <td className="py-2 pr-4">{tb.element}</td>
              <td className="py-2 pr-4">{tb.property}</td>
              <td className="py-2 pr-4 font-mono text-xs">{tb.variableName}</td>
              <td className="py-2 font-mono text-xs flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-sm border"
                  style={{ backgroundColor: tb.resolvedValue }}
                />
                {tb.resolvedValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
)}
```

### Anatomy Section

Use the `elements` array to provide layout information alongside the standard anatomy:

```tsx
<section>
  <h2 className="text-xl font-semibold mb-4">Anatomy</h2>
  <div className="space-y-3">
    {spec.elements?.map((el, i) => (
      <div key={i} className="flex items-start gap-3">
        <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{i + 1}</span>
        <div>
          <p className="font-medium">{el.part}</p>
          <p className="text-sm text-muted-foreground">{el.description}</p>
          {el.layout && (
            <p className="text-xs text-muted-foreground mt-1">
              Layout: {el.layout.direction}, spacing: {el.layout.itemSpacing}px
              {el.layout.padding && `, padding: ${el.layout.padding.top}/${el.layout.padding.right}/${el.layout.padding.bottom}/${el.layout.padding.left}`}
            </p>
          )}
          {el.typography && (
            <p className="text-xs text-muted-foreground mt-1">
              Typography: {el.typography.fontSize}px / {el.typography.lineHeight}px, weight {el.typography.fontWeight}
            </p>
          )}
          {el.toggleable && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded mt-1 inline-block">
              Toggleable ({el.toggleProperty})
            </span>
          )}
          {el.swappable && (
            <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded mt-1 inline-block">
              Swappable ({el.swapProperty})
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
</section>
```

---

## Step 6: Verify

```bash
npm run build
```

**Visual comparison checklist:**

- [ ] Build passes without errors
- [ ] New route resolves (`/components/[slug]`)
- [ ] Component appears in sidebar navigation (auto from registry)
- [ ] Component appears on `/components` index page
- [ ] Preview visually matches the Figma screenshot from Pass 6
- [ ] Typography matches — font sizes, weights, and line heights are correct per size variant
- [ ] Layout matches — padding, spacing, alignment match Figma
- [ ] All toggleable elements show/hide correctly across variants
- [ ] Design tokens section is populated from tokenBindings
- [ ] All interactive controls work in the preview
- [ ] All sections render correctly from the ComponentSpec data

---

## Step 7: Commit & Push

```bash
git add -A
git commit -m "feat: add [Name] component page (Stage B)"
git push
```

---

## Reference: Existing Component Pages

- **Radio V3** (`src/app/components/radio-v3/page.tsx`) — **best current reference**: data-driven preview, segment controller previews, neutrals-50 separators, borderless variant cards with gray fill, labels-below-preview pattern, custom SVG icon usage
- **Checkbox** (`src/app/components/checkbox/page.tsx`) — custom `FlowXCheckbox` local component with inline styles, form field with bordered container, blue selection state, error icon, inverted variant
- **Button** (`src/app/components/button/page.tsx`) — uses shadcn Button directly (simpler component where shadcn aligns with Figma)

Use the **Radio V3 page** as the primary reference for new component pages.

---

## Reference: Vibma MCP Tools

| Tool | Purpose | Key Parameters |
|------|---------|---------------|
| `mcp__Vibma__get_selection` | Get selected component set and children | `depth: 1` for variant enumeration |
| `mcp__Vibma__get_node_info` | Get structural/layout/visual properties | `depth: -1`, `fields: [...]` |
| `mcp__Vibma__scan_text_nodes` | Get exact typography data | Node ID |
| `mcp__Vibma__get_node_variables` | Get design token bindings | Node ID |
| `mcp__Vibma__search_nodes` | Find vector/icon nodes | `type: "VECTOR"` or `"BOOLEAN_OPERATION"` |
| `mcp__Vibma__export_node_as_image` | Export screenshot or SVG | `format: "PNG"/"SVG"`, `scale: 2` |
| `mcp__Vibma__lint_node` | Run lint checks | Node ID |

---

## Reference: Variant Style Helpers

All helpers are imported from `@/lib/components-data/variant-style-helpers`.

| Helper | Signature | Purpose |
|--------|-----------|---------|
| `findVariantStyle` | `(spec, props) → VariantStyle \| undefined` | Find the VariantStyle entry matching given variant props |
| `getElementSpec` | `(spec, part) → ElementSpec \| undefined` | Get the ElementSpec (layout/dimensions/typography) for a named element |
| `getElementStyle` | `(spec, variantProps, part) → ElementStyle \| undefined` | Get the resolved style for a specific element within a specific variant |
| `buildElementStyle` | `(spec, variantProps, part) → React.CSSProperties` | Build a CSS-ready inline style object combining layout + variant styles |
| `getTextColor` | `(spec, variantProps, part) → string \| undefined` | Get the text color for a named element in a specific variant |
| `isElementVisible` | `(spec, variantProps, part) → boolean` | Check if a toggleable element is visible in a specific variant |

---

## Common Pitfalls

1. **Don't sample — extract ALL variants.** Every variant in the component set must be queried in Passes 2–4. Sampling 2–3 "representative" variants misses color/visibility differences. Query them all.

2. **Don't guess typography from bounding boxes.** Always use `mcp__Vibma__scan_text_nodes` (Pass 3). Labels are often SemiBold (600), not Regular (400). Small sizes often use 12px, not 10px. Guessing leads to subtle mismatches.

3. **Don't approximate icons.** If Figma uses a custom SVG (e.g. circle-with-checkmark vs circle-with-dot), extract the exact SVG path in Pass 5. Never substitute basic shapes.

4. **Don't hardcode colors in the preview component.** All colors must come from the helpers (`buildElementStyle`, `getTextColor`, `getElementStyle`). The preview component should have zero hardcoded hex values.

5. **Don't skip token bindings.** Pass 4 is essential for the Design Tokens section and for pairing every hex value with its semantic token name in `variantStyles`.

6. **Don't forget toggleable elements.** Boolean component properties from Pass 1 control element visibility. Mark these elements as `toggleable: true` in `elements` and include `visible: true/false` in every `variantStyles` entry.

7. **Don't ignore layout sizing modes.** Only record `width`/`height` in `dimensions` when the sizing is FIXED. Elements with HUG or FILL sizing should not have explicit width/height — they size from content or parent.

8. **Don't skip the validation checklist (Step 2f).** Verify variant count matches, every element has entries in every variant style, and every fill/stroke has both hex and token before creating files.

9. **Use `font-family: var(--font-flowx)`** for all text in preview components. The docs site uses a different font; component previews must use Open Sans via the CSS variable.

10. **Labels go below previews.** In States and Sizes sections, the label/title text sits below the component preview, not above. Match the pattern from Radio V3.
