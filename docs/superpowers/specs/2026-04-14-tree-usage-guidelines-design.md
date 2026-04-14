# Tree — Usage Guidelines Update

## Summary

Replace the tree component's old `type: "use-case"` usage guidelines with curated `type: "info"` guideline items, matching the pattern established across other components.

## Guideline Items (in order)

### 1. Showing the search header

- **Description:** "Show the search header when the list contains more than seven items so users can filter quickly. Hide it for short lists where all options are visible at a glance."
- **Previews:** Two tree components — one with header, one without.
- **Preview props:**
  - `{ type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off", showHeader: "on" }`
  - `{ type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off", showHeader: "off" }`

### 2. Choosing the right size

- **Description:** "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder)."
- **Previews:** Two tree components at different sizes, both without header.
- **Preview props:**
  - `{ type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off" }`
  - `{ type: "Select (Multi)", size: "Small", inverted: "off", nesting: "off" }`

### 3. Inverted on dark backgrounds

- **Description:** "Use the inverted variant when the component sits on a dark or strongly colored surface."
- **PreviewRows:** One row with dark background.
- **Preview props (inside dark row):**
  - `{ type: "Select (Multi)", size: "Medium", inverted: "on", nesting: "off" }`

## Changes Required

### 1. `tree.ts` (spec file)

Replace the `usageGuidelines` array: swap all `type: "use-case"` entries with the 3 `type: "info"` entries above.

### 2. `tree/page.tsx` (page file)

Update `renderGuidelinePreview` to handle the `showHeader` prop from guideline previews. Currently `showHeader` is hardcoded to `false`. It needs to read from `props.showHeader` when provided.

## Out of Scope

- No changes to the interactive preview, states reference, or sizes sections.
- No changes to the `guidelines` (do/don't) or `considerations` sections.
- No changes to variant styles or elements.
