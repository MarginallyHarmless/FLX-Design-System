# Table (Values) — Usage Guidelines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the values table's old use-case guideline cards with 4 curated info-type usage guidelines, matching the pattern used across other components.

**Architecture:** Two files change. The page file (`values-table/page.tsx`) gets an updated `renderGuidelinePreview` that passes `editMode` and `error` from props. The spec file (`values-table.ts`) gets a new `usageGuidelines` array with 4 info-type items.

**Tech Stack:** TypeScript, React, Next.js

---

### Task 1: Update `renderGuidelinePreview` to support `editMode` and `error`

**Files:**
- Modify: `flowx-design-system/src/app/components/values-table/page.tsx:671-676` (renderGuidelinePreview callback)

- [ ] **Step 1: Update the renderGuidelinePreview callback**

Replace lines 671–676 (the current `renderGuidelinePreview`) with:

```tsx
      renderGuidelinePreview={(props) => (
        <FlowXValuesTable
          bordered={props.bordered === "on"}
          batchEdit={props.batchEdit === "on"}
          editMode={props.editMode === "on"}
          error={props.error === "on"}
        />
      )}
```

Two new props added: `editMode` and `error`. Both default to `false` when absent (since `undefined === "on"` is `false`).

- [ ] **Step 2: Commit**

```bash
git add flowx-design-system/src/app/components/values-table/page.tsx
git commit -m "feat(values-table): update renderGuidelinePreview to support editMode and error props"
```

---

### Task 2: Replace `usageGuidelines` in the spec file

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/values-table.ts:108-112` (usageGuidelines array)

- [ ] **Step 1: Replace the entire `usageGuidelines` array**

Replace lines 108–112 (from `  usageGuidelines: [` through the closing `  ],`) with:

```ts
  usageGuidelines: [
    {
      type: "info",
      title: "Value tables vs Entity tables",
      description:
        "Use a value table for simple items that don't have their own detail page, like variables or enumerations. For complex items that open into a detail page or modal, like workflows or integrations, use an entity table instead.",
      previews: [
        { bordered: "on", batchEdit: "off" },
      ],
    },
    {
      type: "info",
      title: "Bordered vs Standalone",
      description:
        "Use the bordered variant when the table sits inside another container like a card or a settings panel. Use standalone when the table is the card itself -- it gets its own shadow and acts as the top-level surface.",
      previews: [
        { bordered: "on", batchEdit: "off" },
        { bordered: "off", batchEdit: "off" },
      ],
    },
    {
      type: "info",
      title: "Row editing vs Always-on editing",
      description:
        "Use row-by-row editing when users update individual rows independently. Use always-on editing when the page already has a save/discard mechanism and all rows should be editable at once.",
      previews: [
        { bordered: "on", batchEdit: "off", editMode: "on" },
        { bordered: "on", batchEdit: "on" },
      ],
    },
    {
      type: "info",
      title: "Showing validation errors",
      description:
        "Errors appear inline on the affected cell with a red border and error icon. Disable the save button until all errors are resolved.",
      previews: [
        { bordered: "on", batchEdit: "off", editMode: "on", error: "on" },
      ],
    },
  ],
```

- [ ] **Step 2: Verify the build passes**

Run: `cd flowx-design-system && npx next build`
Expected: Build succeeds.

- [ ] **Step 3: Verify visually in the browser**

Run: `cd flowx-design-system && npm run dev`
Open `http://localhost:3000/components/values-table` and scroll to the "Usage Guidelines" section. Confirm:
- 4 guideline cards appear (not 3 old use-case cards)
- "Value tables vs Entity tables" shows one read-only bordered table
- "Bordered vs Standalone" shows two tables — one with border, one with shadow
- "Row editing vs Always-on editing" shows two tables — one with single row editing, one with all rows editable
- "Showing validation errors" shows one table with error state on a cell

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/lib/components-data/values-table.ts
git commit -m "feat: replace values-table use-cases with curated usage guidelines"
```
