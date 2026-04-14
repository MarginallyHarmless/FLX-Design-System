# Select Field — Usage Guidelines Update

## Summary

Replace the select field's old `type: "use-case"` usage guidelines with curated `type: "info"` guideline items, matching the pattern established by the input field, checkbox, radio, and segmented-button components.

## Guideline Items (in order)

### 1. Label placement

- **Description:** "Use a vertical label by default. Switch to a horizontal label in compact surfaces like the UI Designer config panel and Agent Builder nodes, where height is limited."
- **Previews:** Two filled text-mode selects — one with vertical label, one with horizontal label.
- **Preview props:**
  - `{ state: "default", filled: "on", fillMode: "text", label: "Label", hasLabel: "on", inlineLabel: "off" }`
  - `{ state: "default", filled: "on", fillMode: "text", label: "Label", hasLabel: "on", inlineLabel: "on" }`

### 2. Single-select vs multi-select

- **Description:** "Use text mode for single-select fields where the user picks exactly one option. Use chip mode for multi-select so users can see and remove individual selections."
- **Previews:** Two filled selects — one text mode, one chips mode.
- **Preview props:**
  - `{ state: "default", filled: "on", fillMode: "text", label: "Role" }`
  - `{ state: "default", filled: "on", fillMode: "chips", label: "Tags" }`

### 3. Displaying errors

- **Description:** "In most cases, display the error message under the select with red text. When space is very limited, like inside a table cell, show the error as a red tooltip that appears on hover over the error icon."
- **Previews:** One error select with description, one small error select with tooltip.
- **Preview props:**
  - `{ state: "error", filled: "on", fillMode: "text", label: "Country", hasDescription: "on" }`
  - `{ state: "error", filled: "on", fillMode: "text", hasLabel: "off", size: "small", errorTooltip: "Please select a valid option" }`

### 4. When to use Select vs Radio/Checkbox

- **Description:** "Use a select when there are five or more options, or when screen space is tight. For fewer options, prefer radio buttons (single choice) or checkboxes (multiple choice) so all options are visible without opening a dropdown."
- **Previews:** Two default selects — one empty, one filled.
- **Preview props:**
  - `{ state: "default", filled: "off", label: "Role", placeholder: "Select a role" }`
  - `{ state: "default", filled: "on", fillMode: "text", label: "Country" }`

### 5. Choosing the right size

- **Description:** "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder)."
- **Previews:** Two filled text-mode selects at different sizes.
- **Preview props:**
  - `{ state: "default", filled: "on", fillMode: "text", label: "Medium", size: "medium" }`
  - `{ state: "default", filled: "on", fillMode: "text", label: "Small", size: "small" }`

### 6. Inverted on dark backgrounds

- **Description:** "Use the inverted variant when the component sits on a dark or strongly colored surface."
- **PreviewRows:** One row with dark background.
- **Preview props (inside dark row):**
  - `{ state: "default", filled: "on", fillMode: "text", label: "Label", inverted: "on" }`

## Changes Required

### 1. `select-field.ts` (spec file)

Replace the `usageGuidelines` array: swap all `type: "use-case"` entries with the 6 `type: "info"` entries above.

### 2. `select-field/page.tsx` (page file)

Update `renderGuidelinePreview` to handle the new preview props:
- Support `fillMode` prop (currently hardcoded to `"text"`)
- Support `label` prop for custom label text
- Support `placeholder` prop
- Support `errorTooltip` prop (render `FlowXTooltip` above the field, same pattern as input field)
- Support `size` prop
- Support `hasDescription` prop

## Out of Scope

- No changes to the interactive preview, states reference, or sizes sections.
- No changes to the `guidelines` (do/don't) or `considerations` sections.
- No changes to variant styles or elements.
