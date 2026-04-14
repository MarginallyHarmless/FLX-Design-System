# Tabs — Usage Guidelines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tabs component's old use-case guideline cards with 5 curated info-type usage guidelines, matching the pattern used across other components.

**Architecture:** Two files change. The page file (`tabs/page.tsx`) gets an updated `renderGuidelinePreview` that passes through `tabs`, `activeIndex`, and `hasCounter`. The spec file (`tabs.ts`) gets a new `usageGuidelines` array with 5 info-type items.

**Tech Stack:** TypeScript, React, Next.js

---

### Task 1: Update `renderGuidelinePreview` to support new props

**Files:**
- Modify: `flowx-design-system/src/app/components/tabs/page.tsx:228-233` (renderGuidelinePreview callback)

- [ ] **Step 1: Replace the `renderGuidelinePreview` callback**

Replace lines 228–233 (the current `renderGuidelinePreview`) with:

```tsx
      renderGuidelinePreview={(props) => (
        <FlowXTabs
          size={(props.size as "small" | "medium") || "medium"}
          inverted={props.inverted === "on"}
          tabs={props.tabs ? (props.tabs as string).split(",") : undefined}
          activeIndex={props.activeIndex ? parseInt(props.activeIndex as string, 10) : undefined}
          hasCounter={props.hasCounter === "on"}
        />
      )}
```

Key changes from the old version:
- `tabs` is parsed from a comma-separated string into a string array (e.g. `"Overview,Details,Activity"` becomes `["Overview", "Details", "Activity"]`)
- `activeIndex` is parsed from a string to a number
- `hasCounter` is passed through as a boolean

- [ ] **Step 2: Verify no build errors**

Run: `cd flowx-design-system && npx next build`
Expected: Build succeeds. The page still shows old use-case cards — that's expected, we replace the data in Task 2.

- [ ] **Step 3: Commit**

```bash
git add flowx-design-system/src/app/components/tabs/page.tsx
git commit -m "feat(tabs): update renderGuidelinePreview to support new guideline props"
```

---

### Task 2: Replace `usageGuidelines` in the spec file

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/tabs.ts:281-286` (usageGuidelines array)

- [ ] **Step 1: Replace the entire `usageGuidelines` array**

Replace lines 281–286 (from `  usageGuidelines: [` through the closing `  ],`) with:

```ts
  usageGuidelines: [
    {
      type: "info",
      title: "Tabs vs Segmented button",
      description:
        "Use tabs when each option owns a distinct content panel below. Use a segmented button when the options toggle a mode or filter within the same view.",
      previews: [
        { size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" },
      ],
    },
    {
      type: "info",
      title: "With counter badges",
      description:
        "Add a counter badge to show how many items live inside each tab's panel. Hide the badge when the count is zero.",
      previews: [
        { size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0", hasCounter: "on" },
      ],
    },
    {
      type: "info",
      title: "Tab label length",
      description:
        "Keep tab labels to one or two words so the bar stays compact and scannable. If a label needs more context, shorten it and let the panel content clarify.",
      previews: [
        { size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder).",
      previews: [
        { size: "medium", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" },
        { size: "small", inverted: "off", tabs: "Overview,Details,Activity", activeIndex: "0" },
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
            { size: "medium", inverted: "on", tabs: "Overview,Details,Activity", activeIndex: "0" },
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
Open `http://localhost:3000/components/tabs` and scroll to the "Usage Guidelines" section. Confirm:
- 5 guideline cards appear (not 4 old use-case cards)
- Each card has a title, description, and preview tabs component
- "Tabs vs Segmented button" shows a 3-tab bar with "Overview" active
- "With counter badges" shows a 3-tab bar with counter badges visible
- "Tab label length" shows a 3-tab bar with short labels
- "Choosing the right size" shows medium and small tab bars
- "Inverted on dark backgrounds" shows a tab bar on a dark strip

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/lib/components-data/tabs.ts
git commit -m "feat: replace tabs use-cases with curated usage guidelines"
```
