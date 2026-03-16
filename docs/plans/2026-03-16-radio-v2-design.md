# Radio v2 — Pixel-Perfect Figma Reference Page

## Problem

The Radio v1 page uses a custom React component (`FlowXRadio`) to approximate the Figma design. Some color values were estimated, the radio icon geometry differs from Figma's boolean operations, and there's no guarantee of pixel-level accuracy. We need a version that is 100% faithful to the Figma source.

## Approach

Replace the custom React preview component with **pre-exported Figma PNGs**. Every variant is exported as a static image at 2x scale, stored in the repo, and displayed directly. An image-swapping selector lets users pick any variant combination and see the exact Figma render.

## What Gets Created

### 1. Exported Images — `public/figma-exports/radio/`

- **48 individual PNGs** — one per variant combination, named `{selected}-{state}-{border}-{inverted}-{size}.png`
  - Example: `off-default-on-off-medium.png`, `on-error-on-off-small.png`
- **2 grid PNGs** — `grid-light.png` (all non-inverted variants) and `grid-inverted.png` (all inverted variants)
- All exported at `scale: 2` via `mcp__Vibma__export_node_as_image`

### 2. Variant Mapping — `src/lib/components-data/radio-v2-variants.ts`

Maps each variant combination to its Figma node ID and filename:

```ts
export const radioV2Variants = [
  { selected: "off", state: "default", border: "on", inverted: "off", size: "medium", nodeId: "360:642", file: "off-default-on-off-medium.png" },
  // ... 47 more
];
```

### 3. Spec File — `src/lib/components-data/radio-v2.ts`

Reuses props/anatomy/guidelines/accessibility from `radioSpec` with a different slug (`radio-v2`) and name (`Radio v2`).

### 4. Page — `src/app/components/radio-v2/page.tsx`

Sections in order:

1. **StatusBanner**
2. **Title + Description** — "Radio v2" with note about pixel-perfect Figma reference
3. **Interactive Variant Selector** — 5 `<select>` dropdowns (Selected, State, Border, Inverted, Size) swapping a displayed `<Image>` tag. Dark background when Inverted=On. Caption showing variant name.
4. **Light Variants Grid** — `grid-light.png` as a single large image
5. **Inverted Variants Grid** — `grid-inverted.png` on dark background
6. **PropsTable** — from spec
7. **AnatomyDiagram** — from spec
8. **DosAndDonts** — from spec
9. **Accessibility** — from spec
10. **Design Tokens** — same token list as v1
11. **Related Components** — includes link to Radio v1

### 5. Registry Update

Add `radioV2Spec` to `src/lib/components-data/registry.ts`.

### 6. Cross-link

Add `"radio-v2"` to `radioSpec.relatedComponents` in `src/lib/components-data/radio.ts`.

## Key Decisions

- **Static PNGs over runtime rendering** — guarantees pixel-perfect accuracy, works offline, no Figma dependency at page load
- **All 48 variants exported** — full coverage, user can inspect any combination
- **New route `/components/radio-v2`** — v1 remains intact for comparison
- **No custom React radio component** — the preview is purely image-based
- **2x scale exports** — sharp on retina displays

## Trade-offs

- ~50 images adds 3-7MB to the repo — acceptable for a design system reference
- Images need re-exporting when Figma changes — mitigated by the variant mapping file which documents all node IDs
