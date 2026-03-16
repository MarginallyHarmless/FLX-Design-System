# Component Create — Stage B Guide

Instructions for adding a new component page to the FlowX Design System documentation site.

---

## Prerequisites

- The Figma MCP plugin is connected (port 3055, channel "vibma")
- The component is selected in Figma
- The dev server is running (`npm run dev`)

---

## Step 1: Extract Figma Data

### 1a. Get the selection summary

Use `mcp__Vibma__get_selection` with `depth: 0` to get the component set and its variant children. This reveals:
- Component name
- All variant combinations (encoded in child names like `"Selected=Off, State=Default, Border=On, Size=Medium"`)

### 1b. Get structural details

Use `mcp__Vibma__get_node_info` on 2-3 representative variant node IDs with `depth: -1` and fields `["name", "type", "children", "fills", "strokes", "cornerRadius", "absoluteBoundingBox", "layoutMode", "itemSpacing"]`. This reveals:
- Anatomy (nested layers: containers, icons, text nodes)
- Colors (fill hex values, stroke hex values)
- Dimensions (bounding boxes, corner radius, spacing)

### 1b-2. Get text styles (REQUIRED)

Use `mcp__Vibma__scan_text_nodes` on 2+ representative variants (e.g. one medium, one small). This returns exact `fontSize`, `fontFamily`, and `fontStyle` (e.g. "SemiBold", "Regular") for every text node. **Never guess font sizes or weights from bounding boxes** — always use `scan_text_nodes`.

### 1b-3. Check icon assets

Before approximating icons with basic shapes (circles, rectangles), inspect the actual icon nodes in Figma. If a component uses a custom SVG icon (e.g. a circle-with-checkmark instead of a simple filled circle), extract or recreate the exact SVG path. Check the `src/app/Radio Button/` or similar asset directories for pre-exported SVGs.

### 1c. Get a screenshot

Use `mcp__Vibma__export_node_as_image` on the component set node ID (`format: "PNG"`, `scale: 2`). This is the **visual source of truth** — use it to verify your implementation matches.

### 1d. Analyze and document

From the Figma data, extract:
- **Variant properties**: the axes of variation (e.g., Selected, State, Size, Border, Inverted)
- **Props**: each variant property becomes a prop, plus any text/content props visible in the structure
- **States**: interaction states (default, hover, focus, error, disabled)
- **Sizes**: size variants if present
- **Anatomy**: the nested layer structure (Label → Container → Icon + Text, etc.)
- **Colors**: exact hex values for **every combination** of variant axes (e.g. disabled+inverted may differ from disabled+normal). Don't assume a single value covers all sub-variants — check each axis combination that affects color.
- **Text styles**: exact fontSize, fontWeight (from fontStyle: "SemiBold" = 600, "Regular" = 400, "Bold" = 700), and lineHeight for each size variant. Always sourced from `scan_text_nodes`, never approximated.
- **Dimensions**: heights, padding, gap, border-radius for each size
- **Icons**: identify whether icons are simple shapes or custom SVGs; extract the SVG path data if custom
- **Guidelines**: infer do/don't from the component's purpose and relationship to similar components

---

## Step 2: Install shadcn Component (if needed)

```bash
npx shadcn@latest add [component-name] -y
```

Only install if the shadcn component is useful as a base for the preview. Many FlowX components are custom enough that you'll build a local preview component instead.

---

## Step 3: Create Data File

Create `src/lib/components-data/[slug].ts` using the `ComponentSpec` interface.

```ts
import { type ComponentSpec } from "./types";

export const [name]Spec: ComponentSpec = {
  slug: "[slug]",
  name: "[Name]",
  description: "[description]",
  status: "stable",
  figmaLink: "https://figma.com/file/flowx-design-system/[slug]",
  lastUpdated: "YYYY-MM-DD",

  variants: [
    // One entry per meaningful variant combination from Figma
    { name: "...", description: "...", props: { ... } },
  ],

  props: [
    // Each variant property + content props
    { name: "...", type: "string", default: '"..."', options: [...], description: "..." },
  ],

  states: ["default", "hover", "focus", "error", "disabled"],
  sizes: ["small", "medium"],  // if applicable

  anatomy: [
    // From the Figma layer structure
    { part: "...", description: "..." },
  ],

  guidelines: {
    do: [{ description: "..." }],
    dont: [{ description: "..." }],
  },

  accessibility: {
    role: "...",
    keyboard: ["Key — Action."],
    ariaAttributes: ["aria-attr — Purpose."],
  },

  relatedComponents: ["..."],
};
```

---

## Step 4: Register the Component

Edit `src/lib/components-data/registry.ts`:

```ts
import { [name]Spec } from "./[slug]";

// Add to the array:
export const componentRegistry: ComponentSpec[] = [
  buttonSpec,
  checkboxSpec,
  [name]Spec,  // ← add here
];
```

This auto-updates the sidebar nav and components index page.

---

## Step 5: Create the Route Page

Create `src/app/components/[slug]/page.tsx`.

### CRITICAL: Build a Custom Preview Component

**Do NOT just use the shadcn component as-is.** The FlowX Figma components have custom visual designs (specific colors, containers, layouts, icons) that rarely match shadcn defaults. You must build a **local preview component** (`FlowX[Name]`) that visually matches the Figma screenshot.

The preview component:
- Is defined at the top of the page file (not a separate component file — it's docs-only)
- Uses inline styles with exact hex values from Figma for colors, dimensions, border-radius
- Accepts props matching the component's variant properties
- Renders each visual state accurately (colors change based on selected/error/disabled/inverted)
- Uses `font-family: var(--font-flowx)` (Open Sans) for text inside the preview

### How to build the preview component

1. **Study the Figma screenshot** — identify the visual structure (what's nested inside what)
2. **Map variant properties to visual changes** — e.g., when `selected=on`, the container bg changes from white to blue-50, border changes to blue-500
3. **Extract exact colors** from the `get_node_info` fills/strokes for each state
4. **Use inline styles** (not Tailwind classes) for Figma-accurate colors:

```tsx
function FlowX[Name]({
  [prop1] = defaultValue,
  [prop2] = defaultValue,
  state = "default",
  size = "medium",
}: {
  [prop1]?: type;
  [prop2]?: type;
  state?: "default" | "error" | "disabled" | "hover" | "focus";
  size?: "small" | "medium";
}) {
  const isDisabled = state === "disabled";
  const isError = state === "error";

  // Determine colors from Figma data per state
  const containerBg = /* logic based on state/selected/inverted */;
  const containerBorder = /* logic based on state/selected/inverted */;
  const textColor = /* ... */;

  return (
    <div className={isDisabled ? "opacity-50" : ""}>
      {/* Match the Figma layer structure exactly */}
    </div>
  );
}
```

### Page structure

Follow this exact section order (each section hides if data is undefined):

```tsx
"use client";

import Link from "next/link";
import { [name]Spec } from "@/lib/components-data/[slug]";
import { getComponent } from "@/lib/components-data/registry";
import { Separator } from "@/components/ui/separator";
import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

// 1. Local preview component (FlowX[Name]) — matches Figma design
// 2. Token list for this component

export default function [Name]Page() {
  const spec = [name]Spec;

  return (
    <div className="space-y-10">
      {/* 1.  StatusBanner */}
      {/* 2.  Title + Description */}
      {/* 3.  Interactive Preview (ComponentPreview + FlowX[Name]) */}
      {/* 4.  Variants grid */}
      {/* 5.  States (show unchecked + checked or default + active per state) */}
      {/* 6.  Sizes */}
      {/* 7.  PropsTable */}
      {/* 8.  AnatomyDiagram */}
      {/* 9.  DosAndDonts */}
      {/* 10. Accessibility */}
      {/* 11. Design Tokens Used (TokenTable) */}
      {/* 12. Related Components */}
    </div>
  );
}
```

### Interactive Preview controls

Map the component's variant properties to `ComponentPreview` controls (rendered as segment controllers):
- String options → `{ name: "propName", options: ["a", "b", "c"] }`
- Boolean toggles → `{ name: "propName", type: "boolean" }` (renders as "Off" / "On" segments)

The `render` function receives control values and passes them to `FlowX[Name]`.

### Section separators

Use `<hr style={{ borderColor: "#f7f8f9" }} />` (neutrals-50) between all sections. Do **not** use the `<Separator />` component.

### Variants grid

- No borders on variant cards. Use `backgroundColor: "#f7f8f9"` (same light gray as the preview canvas).
- For inverted variants, use `bg-neutral-900 text-white` (no border).
- Show **only the variant name** below the preview, styled as `text-xs text-muted-foreground` (small grey subtitle). Do not include the description.

```tsx
<div
  className={`flex flex-col items-center gap-3 rounded-lg p-6 ${isInverted ? "bg-neutral-900 text-white" : ""}`}
  style={!isInverted ? { backgroundColor: "#f7f8f9" } : undefined}
>
  <FlowX[Name] ... />
  <p className={`text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>{v.name}</p>
</div>
```

### States section

State labels go **below** the component preview (not above), matching the Sizes section pattern:
```tsx
<div className="flex flex-col items-center gap-3">
  <div className="flex gap-3">
    <FlowX[Name] selected={false} state={s} value="Unchecked" />
    <FlowX[Name] selected={true} state={s} value="Checked" />
  </div>
  <span className="text-xs text-muted-foreground capitalize">{s}</span>
</div>
```

---

## Step 6: Verify

```bash
npm run build
```

Check:
- [ ] Build passes
- [ ] New route resolves (`/components/[slug]`)
- [ ] Component appears in sidebar nav (auto from registry)
- [ ] Component appears on `/components` index page
- [ ] Preview visually matches Figma screenshot
- [ ] All sections render from the ComponentSpec data
- [ ] Interactive controls work

---

## Step 7: Commit & Push

```bash
git add -A
git commit -m "feat: add [Name] component page (Stage B)"
git push
```

---

## Reference: Existing Component Pages

- **Button** (`src/app/components/button/page.tsx`) — uses shadcn Button directly (simple enough to match)
- **Checkbox** (`src/app/components/checkbox/page.tsx`) — uses a custom `FlowXCheckbox` local component with inline styles matching Figma (form field with bordered container, blue selection state, error icon, inverted variant)
- **Radio V3** (`src/app/components/radio-v3/page.tsx`) — best current reference: segment controller previews, neutrals-50 separators, borderless variant cards with gray fill, labels-below-preview pattern, custom SVG icon usage

Use the Radio V3 page as the primary reference for new component pages.

---

## Common Pitfalls

1. **Don't assume shadcn matches Figma** — always export a screenshot and compare. FlowX components are custom designs; shadcn is just the docs UI toolkit.
2. **Use exact hex values from Figma** — don't approximate. Get fills/strokes from `get_node_info`.
3. **Map colors to FlowX tokens** — e.g., `#006bd8` = `blue-500`, `#e6f0fb` = `blue-50`, `#e3e8ed` = `neutrals-100`.
4. **Don't forget the error icon** — many FlowX components show an error indicator (circle-i) outside the container in error state.
5. **Handle inverted variants** — these need dark backgrounds in the preview and different color logic.
6. **Use `font-family: var(--font-flowx)`** — component previews must render in Open Sans, not the docs font.
7. **Always use `scan_text_nodes`** — never guess font sizes or weights from bounding box dimensions. Labels are often SemiBold (600), not Regular (400). Small sizes often use 12px, not 10px.
8. **Check every variant axis combination for colors** — a color that looks uniform (e.g. disabled icon fill) may differ across sub-axes (e.g. inverted vs normal). Query all `Selected=On` state variants, not just 2-3 samples.
9. **Don't approximate icon shapes** — if Figma uses a custom SVG (e.g. circle-with-checkmark vs circle-with-dot), extract the exact SVG path. Check for pre-exported SVG files in the repo.
10. **Labels go below previews** — in States and Sizes sections, the label/title sits below the component preview, not above.
