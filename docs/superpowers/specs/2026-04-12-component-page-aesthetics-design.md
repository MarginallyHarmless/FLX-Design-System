# Component Page Aesthetics Refresh

## Problem

The component documentation pages feel dense and flat. Too many sections compete for attention at equal visual weight, and the flat styling (uniform spacing, HR separators, no depth) makes the pages feel utilitarian rather than polished.

## Solution

Introduce a three-tier visual hierarchy that guides the eye from the hero preview down through core content to reference material. Add subtle depth through shadows, card wrappers, and spacing alone — no heavy visual elements.

## Visual Tiers

### Tier 1 — Hero Preview (title + status + description + interactive preview)

The centerpiece of every component page. Gets the most visual prominence.

**Title/status/description area:**
- Title → status banner spacing: `mt-3` (was `mt-2`)
- Status banner → description spacing: `mt-3` (was `mt-2`)
- Description → preview gap: `mt-8`

**Preview component (`ComponentPreview`):**
- Canvas min-height: 280px (was 200px)
- Canvas padding: `p-8` (was `p-6`)
- Border: `border border-neutral-100 dark:border-neutral-800`
- Shadow: `shadow-sm`
- Border radius: `rounded-xl` (was `rounded-lg`)
- Controls bar: subtle `border-t border-neutral-100` separator above controls
- Segment pill controls: padding `px-3 py-1.5`, `rounded-lg`
- Remove emoji footer text ("Toggle controls...") — controls are self-explanatory
- Dark mode canvas: slightly lighter border (`border-neutral-700`) for definition

**Gap below tier 1:** 4rem before tier 2 content.

### Tier 2 — Core Content (usage guidelines, states reference, sizes)

The main documentation content. Each section wrapped in a soft card.

**Card styling:**
- `bg-white dark:bg-neutral-900/50`
- `border border-neutral-100 dark:border-neutral-800`
- `shadow-[0_1px_3px_rgba(0,0,0,0.04)]`
- `rounded-xl`
- Entire `CollapsibleSection` (title + content) wrapped in the card with internal padding `p-6`
- Sections open by default

**Spacing:**
- 3rem gap between tier 2 sections
- 3rem gap between last tier 2 section and tier 3, with a thin `border-t border-neutral-100 dark:border-neutral-800` divider at the boundary

### Tier 3 — Reference (props, anatomy, accessibility, tokens, considerations, known exceptions, decision log, related components)

Supplementary reference material. Visually lighter, all collapsed by default.

**Styling:**
- No card wrapper — content sits on page background
- Section titles: `text-xl font-semibold text-muted-foreground` (muted color signals "supplementary")
- All sections collapsed by default
- No separators between individual tier 3 sections

**Spacing:**
- 2rem gap between tier 3 sections

## Separator Changes

Remove all `<hr style={{ borderColor: "#f7f8f9" }} />` separators throughout the template. Spacing and card boundaries provide visual separation. The only remaining divider is the single `border-t` at the tier 2→3 boundary.

## Files Changed

1. **`flowx-design-system/src/components/docs/component-page-template.tsx`**
   - Replace `space-y-10` with tiered spacing structure
   - Remove all `{separator}` / `<hr>` elements
   - Wrap tier 2 sections (usage guidelines, states, sizes) in card divs
   - Add tier 2→3 divider
   - Mute tier 3 section heading color
   - Ensure tier 3 sections default to collapsed

2. **`flowx-design-system/src/components/docs/component-preview.tsx`**
   - Increase canvas min-height to 280px
   - Increase canvas padding to `p-8`
   - Add `shadow-sm`, `rounded-xl`, border styling to canvas
   - Add `border-t` separator above controls
   - Adjust segment pill padding and border radius
   - Remove emoji footer text
   - Improve dark mode canvas border

3. **`flowx-design-system/src/app/globals.css`** (if needed)
   - Add utility class for tier 2 card shadow if Tailwind arbitrary value is too verbose inline

## What Doesn't Change

- Individual component page files (button, radio, etc.)
- Spec data files
- `UsageGuidelinesSection`, `PropsTable`, `TokenTable`, or other section components
- Sidebar, layout, homepage
