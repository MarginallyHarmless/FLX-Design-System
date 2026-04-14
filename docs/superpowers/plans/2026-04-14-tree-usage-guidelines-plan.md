# Tree — Usage Guidelines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tree component's old use-case guideline cards with 3 curated info-type usage guidelines, matching the pattern used across other components.

**Architecture:** Two files change. The page file (`tree/page.tsx`) gets an updated `renderGuidelinePreview` that reads `showHeader` from props instead of hardcoding it to `false`. The spec file (`tree.ts`) gets a new `usageGuidelines` array with 3 info-type items.

**Tech Stack:** TypeScript, React, Next.js

---

### Task 1: Update `renderGuidelinePreview` to support `showHeader` from props

**Files:**
- Modify: `flowx-design-system/src/app/components/tree/page.tsx:527-535` (renderGuidelinePreview callback)

- [ ] **Step 1: Update the `showHeader` prop in the callback**

Replace lines 527–535 (the current `renderGuidelinePreview`) with:

```tsx
      renderGuidelinePreview={(props) => (
        <FlowXTree
          type={props.type as "Select (Multi)" | "Select (Single)" | "Icons"}
          size={props.size as "Medium" | "Small"}
          inverted={props.inverted === "on"}
          nesting={props.nesting === "on"}
          showHeader={props.showHeader === "on"}
        />
      )}
```

The only change from the old version is `showHeader`: it was hardcoded to `false`, now it reads from `props.showHeader === "on"` (defaults to `false` when the prop is absent, since `undefined === "on"` is `false`).

- [ ] **Step 2: Commit**

```bash
git add flowx-design-system/src/app/components/tree/page.tsx
git commit -m "feat(tree): update renderGuidelinePreview to support showHeader from props"
```

---

### Task 2: Replace `usageGuidelines` in the spec file

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/tree.ts:153-160` (usageGuidelines array)

- [ ] **Step 1: Replace the entire `usageGuidelines` array**

Replace lines 153–160 (from `  usageGuidelines: [` through the closing `  ],`) with:

```ts
  usageGuidelines: [
    {
      type: "info",
      title: "Showing the search header",
      description:
        "Show the search header when the list contains more than seven items so users can filter quickly. Hide it for short lists where all options are visible at a glance.",
      previews: [
        { type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off", showHeader: "on" },
        { type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off", showHeader: "off" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder).",
      previews: [
        { type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off" },
        { type: "Select (Multi)", size: "Small", inverted: "off", nesting: "off" },
      ],
    },
    {
      type: "info",
      title: "Inverted on dark backgrounds",
      description:
        "Use the inverted variant when the component sits on a dark or strongly colored surface.",
      previewRows: [
        {
          background: "dark",
          items: [
            { type: "Select (Multi)", size: "Medium", inverted: "on", nesting: "off" },
          ],
        },
      ],
    },
  ],
```

- [ ] **Step 2: Verify the build passes**

Run: `cd flowx-design-system && npx next build`
Expected: Build succeeds.

- [ ] **Step 3: Verify visually in the browser**

Run: `cd flowx-design-system && npm run dev`
Open `http://localhost:3000/components/tree` and scroll to the "Usage Guidelines" section. Confirm:
- 3 guideline cards appear (not 6 old use-case cards)
- "Showing the search header" shows two tree previews — one with header, one without
- "Choosing the right size" shows medium and small tree previews
- "Inverted on dark backgrounds" shows a tree on a dark strip

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/lib/components-data/tree.ts
git commit -m "feat: replace tree use-cases with curated usage guidelines"
```
