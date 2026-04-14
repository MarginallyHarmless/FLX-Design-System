# Tabs — Usage Guidelines Update

## Summary

Replace the tabs component's old `type: "use-case"` usage guidelines with curated `type: "info"` guideline items, matching the pattern established across other components.

## Guideline Items (in order)

### 1. Tabs vs Segmented button

- **Description:** "Use tabs when each option owns a distinct content panel below. Use a segmented button when the options toggle a mode or filter within the same view."
- **Previews:** One tabs component with 3 tabs.
- **Preview props:**
  - `{ size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" }`

### 2. With counter badges

- **Description:** "Add a counter badge to show how many items live inside each tab's panel. Hide the badge when the count is zero."
- **Previews:** One tabs component with counters enabled.
- **Preview props:**
  - `{ size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0", hasCounter: "on" }`

### 3. Tab label length

- **Description:** "Keep tab labels to one or two words so the bar stays compact and scannable. If a label needs more context, shorten it and let the panel content clarify."
- **Previews:** One tabs component with short labels.
- **Preview props:**
  - `{ size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" }`

### 4. Choosing the right size

- **Description:** "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder)."
- **Previews:** Two tabs components at different sizes.
- **Preview props:**
  - `{ size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" }`
  - `{ size: "small", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" }`

### 5. Inverted on dark backgrounds

- **Description:** "Use the inverted variant when the component sits on a dark or strongly colored surface."
- **PreviewRows:** One row with dark background.
- **Preview props (inside dark row):**
  - `{ size: "medium", inverted: "on", tabs: "Overview,Details,Activity", activeIndex: "0" }`

## Changes Required

### 1. `tabs.ts` (spec file)

Replace the `usageGuidelines` array: swap all `type: "use-case"` entries with the 5 `type: "info"` entries above.

### 2. `tabs/page.tsx` (page file)

Update `renderGuidelinePreview` to handle the new preview props:
- Support `tabs` prop as a comma-separated string (split into array)
- Support `activeIndex` prop (parse from string to number)
- Support `hasCounter` prop
- Keep existing `size` and `inverted` support

## Out of Scope

- No changes to the interactive preview, states reference, or sizes sections.
- No changes to the `guidelines` (do/don't) or `considerations` sections.
- No changes to variant styles or elements.
