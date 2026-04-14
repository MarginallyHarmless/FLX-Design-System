# Table (Values) — Usage Guidelines Update

## Summary

Replace the values table's old `type: "use-case"` usage guidelines with curated `type: "info"` guideline items, matching the pattern established across other components.

## Guideline Items (in order)

### 1. Value tables vs Entity tables

- **Description:** "Use a value table for simple items that don't have their own detail page, like variables or enumerations. For complex items that open into a detail page or modal, like workflows or integrations, use an entity table instead."
- **Previews:** One value table in default read-only state.
- **Preview props:**
  - `{ bordered: "on", batchEdit: "off" }`

### 2. Bordered vs Standalone

- **Description:** "Use the bordered variant when the table sits inside another container like a card or a settings panel. Use standalone when the table is the card itself -- it gets its own shadow and acts as the top-level surface."
- **Previews:** Two tables — one bordered, one standalone.
- **Preview props:**
  - `{ bordered: "on", batchEdit: "off" }`
  - `{ bordered: "off", batchEdit: "off" }`

### 3. Row editing vs Always-on editing

- **Description:** "Use row-by-row editing when users update individual rows independently. Use always-on editing when the page already has a save/discard mechanism and all rows should be editable at once."
- **Previews:** Two tables — one with row editing, one with batch editing.
- **Preview props:**
  - `{ bordered: "on", batchEdit: "off", editMode: "on" }`
  - `{ bordered: "on", batchEdit: "on" }`

### 4. Showing validation errors

- **Description:** "Errors appear inline on the affected cell with a red border and error icon. Disable the save button until all errors are resolved."
- **Previews:** One table with error state.
- **Preview props:**
  - `{ bordered: "on", batchEdit: "off", editMode: "on", error: "on" }`

## Changes Required

### 1. `values-table.ts` (spec file)

Replace the `usageGuidelines` array: swap all `type: "use-case"` entries with the 4 `type: "info"` entries above.

### 2. `values-table/page.tsx` (page file)

Update `renderGuidelinePreview` to handle the new preview props:
- Support `editMode` prop (currently not passed through)
- Support `error` prop (currently not passed through)
- Keep existing `bordered` and `batchEdit` support

## Out of Scope

- No changes to the interactive preview, states reference, or sizes sections.
- No changes to the `guidelines` (do/don't) or `considerations` sections.
- No changes to variant styles or elements.
