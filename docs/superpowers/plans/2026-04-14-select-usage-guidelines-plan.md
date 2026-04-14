# Select Field — Usage Guidelines Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the select field's old use-case guideline cards with 6 curated info-type usage guidelines, matching the pattern used by input field, checkbox, radio, and segmented button.

**Architecture:** Two files change. The spec file (`select-field.ts`) gets a new `usageGuidelines` array. The page file (`select-field/page.tsx`) gets a `label` prop on `FlowXSelectField`, a `FlowXTooltip` import, and an updated `renderGuidelinePreview` callback.

**Tech Stack:** TypeScript, React, Next.js

---

### Task 1: Add `label` prop to `FlowXSelectField`

**Files:**
- Modify: `flowx-design-system/src/app/components/select-field/page.tsx:25-45` (component signature)
- Modify: `flowx-design-system/src/app/components/select-field/page.tsx:176-210` (both render paths where `FlowXLabel` is used)

- [ ] **Step 1: Add `label` to the destructured props and type signature**

In the function signature at line 25, add `label = "Label"` to the destructured props and `label?: string;` to the type:

```tsx
function FlowXSelectField({
  state = "default",
  filled = false,
  fillMode = "chips",
  size = "medium",
  inverted = false,
  hasLabel = true,
  inlineLabel = false,
  hasDescription = false,
  placeholder = "Placeholder",
  label = "Label",
}: {
  state?: "default" | "focused" | "error" | "disabled";
  filled?: boolean;
  fillMode?: "chips" | "text";
  size?: "small" | "medium";
  inverted?: boolean;
  hasLabel?: boolean;
  inlineLabel?: boolean;
  hasDescription?: boolean;
  placeholder?: string;
  label?: string;
}) {
```

- [ ] **Step 2: Update both `FlowXLabel` calls to use the `label` prop**

In the inline-label render path (~line 182), change the hardcoded `"Label"` to `{label}`:

```tsx
<FlowXLabel
  label={label}
  size={size === "small" ? "small" : "medium"}
  inverted={inverted}
  disabled={state === "disabled"}
  hasLabel={hasLabel}
/>
```

In the vertical-label render path (~line 204), same change:

```tsx
<FlowXLabel
  label={label}
  size={size === "small" ? "small" : "medium"}
  inverted={inverted}
  disabled={state === "disabled"}
  hasLabel={hasLabel}
/>
```

- [ ] **Step 3: Verify the dev server still renders correctly**

Run: `cd flowx-design-system && npm run dev`
Open `http://localhost:3000/components/select-field` and confirm the interactive preview still shows "Label" by default. No visual change expected.

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/app/components/select-field/page.tsx
git commit -m "feat(select): add label prop to FlowXSelectField preview component"
```

---

### Task 2: Update `renderGuidelinePreview` to support new props

**Files:**
- Modify: `flowx-design-system/src/app/components/select-field/page.tsx:10-13` (imports — add `FlowXTooltip`)
- Modify: `flowx-design-system/src/app/components/select-field/page.tsx:335-344` (renderGuidelinePreview callback)

- [ ] **Step 1: Add `FlowXTooltip` to the shared-elements import**

Change line 13 from:

```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";
```

to:

```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon, FlowXTooltip } from "@/components/docs/shared-elements";
```

- [ ] **Step 2: Replace the `renderGuidelinePreview` callback**

Replace lines 335–344 (the current `renderGuidelinePreview`) with:

```tsx
      renderGuidelinePreview={(props) => {
        const field = (
          <FlowXSelectField
            state={(props.state as "default" | "focused" | "error" | "disabled") || "default"}
            size={(props.size as "small" | "medium") || "medium"}
            filled={props.filled === "on"}
            fillMode={(props.fillMode as "chips" | "text") || "text"}
            inverted={props.inverted === "on"}
            hasLabel={props.hasLabel !== "off"}
            inlineLabel={props.inlineLabel === "on"}
            hasDescription={props.hasDescription === "on"}
            placeholder={props.placeholder}
            label={props.label}
          />
        );
        if (props.errorTooltip) {
          return (
            <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <FlowXTooltip text={props.errorTooltip} useCase="error" />
              {field}
            </div>
          );
        }
        return field;
      }}
```

- [ ] **Step 3: Verify no build errors**

Run: `cd flowx-design-system && npx next build`
Expected: Build succeeds with no errors. (The page still shows old use-case cards — that's fine, we replace the data in Task 3.)

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/app/components/select-field/page.tsx
git commit -m "feat(select): update renderGuidelinePreview to support new guideline props"
```

---

### Task 3: Replace `usageGuidelines` in the spec file

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/select-field.ts:468-478` (usageGuidelines array)

- [ ] **Step 1: Replace the entire `usageGuidelines` array**

Replace lines 468–478 (from `usageGuidelines: [` through the closing `],` and `};`) with:

```ts
  usageGuidelines: [
    {
      type: "info",
      title: "Label placement",
      description:
        "Use a vertical label by default. Switch to a horizontal label in compact surfaces like the UI Designer config panel and Agent Builder nodes, where height is limited.",
      previews: [
        { state: "default", filled: "on", fillMode: "text", label: "Label", hasLabel: "on", inlineLabel: "off" },
        { state: "default", filled: "on", fillMode: "text", label: "Label", hasLabel: "on", inlineLabel: "on" },
      ],
    },
    {
      type: "info",
      title: "Single-select vs multi-select",
      description:
        "Use text mode for single-select fields where the user picks exactly one option. Use chip mode for multi-select so users can see and remove individual selections.",
      previews: [
        { state: "default", filled: "on", fillMode: "text", label: "Role" },
        { state: "default", filled: "on", fillMode: "chips", label: "Tags" },
      ],
    },
    {
      type: "info",
      title: "Displaying errors",
      description:
        "In most cases, display the error message under the select with red text. When space is very limited, like inside a table cell, show the error as a red tooltip that appears on hover over the error icon.",
      previews: [
        { state: "error", filled: "on", fillMode: "text", label: "Country", hasDescription: "on" },
        { state: "error", filled: "on", fillMode: "text", hasLabel: "off", size: "small", errorTooltip: "Please select a valid option" },
      ],
    },
    {
      type: "info",
      title: "When to use Select vs Radio/Checkbox",
      description:
        "Use a select when there are five or more options, or when screen space is tight. For fewer options, prefer radio buttons (single choice) or checkboxes (multiple choice) so all options are visible without opening a dropdown.",
      previews: [
        { state: "default", filled: "off", label: "Role", placeholder: "Select a role" },
        { state: "default", filled: "on", fillMode: "text", label: "Country" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder).",
      previews: [
        { state: "default", filled: "on", fillMode: "text", label: "Medium", size: "medium" },
        { state: "default", filled: "on", fillMode: "text", label: "Small", size: "small" },
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
            { state: "default", filled: "on", fillMode: "text", label: "Label", inverted: "on" },
          ],
        },
      ],
    },
  ],
};
```

- [ ] **Step 2: Verify the build passes**

Run: `cd flowx-design-system && npx next build`
Expected: Build succeeds.

- [ ] **Step 3: Verify visually in the browser**

Run: `cd flowx-design-system && npm run dev`
Open `http://localhost:3000/components/select-field` and scroll to the "Usage Guidelines" section. Confirm:
- 6 guideline cards appear (not 9 old use-case cards)
- Each card has a title, description, and 1–2 preview components
- "Label placement" shows vertical and horizontal label selects
- "Single-select vs multi-select" shows text vs chips mode
- "Displaying errors" shows one with red description, one with red tooltip above
- "When to use Select vs Radio/Checkbox" shows one empty, one filled
- "Choosing the right size" shows medium and small selects
- "Inverted on dark backgrounds" shows a select on a dark strip

- [ ] **Step 4: Commit**

```bash
git add flowx-design-system/src/lib/components-data/select-field.ts
git commit -m "feat: replace select-field use-cases with curated usage guidelines"
```
