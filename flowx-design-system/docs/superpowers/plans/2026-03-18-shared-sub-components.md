# Shared Sub-Components Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract Label, Description, and Error Icon into shared components, then roll out across Input Field, Select Field, Radio, and Checkbox — fixing the missing error description text in Radio and Checkbox.

**Architecture:** Three exported React components in a single shared file. Each component owns its color/typography logic internally (no spec data file reads). Component pages import and use them instead of inline implementations.

**Tech Stack:** React, TypeScript, inline styles (no Tailwind for preview components)

**Spec:** `docs/superpowers/specs/2026-03-18-shared-sub-components-design.md`

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/docs/shared-elements.tsx` | Create | `FlowXLabel`, `FlowXDescription`, `FlowXErrorIcon` components |
| `src/app/components/input-field/page.tsx` | Modify | Replace inline label/description/error icon with shared imports |
| `src/app/components/select-field/page.tsx` | Modify | Same as input-field |
| `src/app/components/radio/page.tsx` | Modify | Replace inline label/error icon, add description (new) |
| `src/app/components/checkbox/page.tsx` | Modify | Same as radio |

---

### Task 1: Create shared-elements.tsx

**Files:**
- Create: `src/components/docs/shared-elements.tsx`

- [ ] **Step 1: Create FlowXLabel component**

```tsx
// src/components/docs/shared-elements.tsx

/* ------------------------------------------------------------------ */
/*  Shared sub-components for FlowX Design System component previews   */
/*  Single source of truth for Label, Description, and Error Icon      */
/* ------------------------------------------------------------------ */

export function FlowXLabel({
  label = "Label",
  size = "medium",
  inverted = false,
  disabled = false,
  showInfo = false,
  hasLabel = true,
}: {
  label?: string;
  size?: "small" | "medium";
  inverted?: boolean;
  disabled?: boolean;
  showInfo?: boolean;
  hasLabel?: boolean;
}) {
  if (!hasLabel) return null;

  const isSmall = size === "small";

  const getColor = () => {
    if (disabled) return inverted ? "#64748b" : "#8390a2";
    return inverted ? "#ffffff" : "#1d232c";
  };

  const color = getColor();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? 4 : 8,
      }}
    >
      <span
        style={{
          fontSize: isSmall ? 12 : 14,
          lineHeight: isSmall ? "16px" : "24px",
          fontWeight: 600,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {showInfo && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1" />
          <path d="M8 7V11" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <circle cx="8" cy="5" r="0.75" fill={color} />
        </svg>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add FlowXDescription component**

Append to the same file:

```tsx
export function FlowXDescription({
  text,
  state = "default",
  inverted = false,
  visible = true,
}: {
  text?: string;
  state?: "default" | "error" | "disabled" | "focused";
  inverted?: boolean;
  visible?: boolean;
}) {
  if (!visible) return null;

  const isError = state === "error";
  const isDisabled = state === "disabled";

  const getColor = () => {
    if (isError) return "#e62200";
    if (isDisabled) return "#64748b";
    return inverted ? "#8390a2" : "#6b7789";
  };

  const defaultText = isError ? "Error message goes here" : "Helper text goes here";

  return (
    <span
      style={{
        fontSize: 12,
        lineHeight: "16px",
        fontWeight: 400,
        color: getColor(),
        whiteSpace: "nowrap",
      }}
    >
      {text ?? defaultText}
    </span>
  );
}
```

- [ ] **Step 3: Add FlowXErrorIcon component**

Append to the same file:

```tsx
export function FlowXErrorIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="7" stroke="#e62200" strokeWidth="1" />
      <path
        d="M8 5V8.5"
        stroke="#e62200"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11" r="0.75" fill="#e62200" />
    </svg>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds (new file with no consumers yet is fine)

- [ ] **Step 5: Commit**

```bash
git add src/components/docs/shared-elements.tsx
git commit -m "feat: add shared FlowXLabel, FlowXDescription, FlowXErrorIcon components"
```

---

### Task 2: Migrate Input Field page

**Files:**
- Modify: `src/app/components/input-field/page.tsx`

**Context:** This page currently uses spec helpers (`getTextColor`) for Label and Description colors, and has a hardcoded error icon SVG. The migration replaces all three with shared imports while keeping the same visual output.

- [ ] **Step 1: Add import**

At the top of the file, add:
```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";
```

- [ ] **Step 2: Replace inline Label rendering**

Find the label `<span>` block (around lines 88-114) that renders the label text and info icon. Replace with:
```tsx
<FlowXLabel
  label="Label"
  size={size === "small" ? "small" : "medium"}
  inverted={inverted}
  disabled={state === "disabled"}
  hasLabel={hasTopLabel}
/>
```

Remove the `labelColor` variable and associated `getTextColor(spec, variantProps, "Label")` call if it's no longer used elsewhere.

- [ ] **Step 3: Replace inline Error Icon SVG**

Find the error icon SVG block (around lines 206-224). Replace with:
```tsx
{isError && <FlowXErrorIcon />}
```

- [ ] **Step 4: Replace inline Description rendering**

Find the description block (around lines 228-239). Replace with:
```tsx
<FlowXDescription
  state={state}
  inverted={inverted}
  visible={hasDescription}
/>
```

Remove the `descriptionColor` variable and associated `getTextColor(spec, variantProps, "Description")` call if no longer used.

- [ ] **Step 5: Verify build and visual output**

Run: `npm run build`
Expected: Build passes. Visit `/components/input-field` — visual output unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/input-field/page.tsx
git commit -m "refactor: input-field uses shared Label, Description, ErrorIcon"
```

---

### Task 3: Migrate Select Field page

**Files:**
- Modify: `src/app/components/select-field/page.tsx`

**Context:** Same pattern as Input Field — uses spec helpers for colors.

- [ ] **Step 1: Add import**

```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";
```

- [ ] **Step 2: Replace inline Label rendering**

Replace the label block with `<FlowXLabel>`, using `hasLabel` prop from the component.

- [ ] **Step 3: Replace inline Error Icon SVG**

Replace with `{isError && <FlowXErrorIcon />}`.

- [ ] **Step 4: Replace inline Description rendering**

Replace with:
```tsx
<FlowXDescription
  state={state}
  inverted={inverted}
  visible={hasDescription}
/>
```

- [ ] **Step 5: Verify build and visual output**

Run: `npm run build`
Expected: Build passes. Visit `/components/select-field` — visual output unchanged.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/select-field/page.tsx
git commit -m "refactor: select-field uses shared Label, Description, ErrorIcon"
```

---

### Task 4: Migrate Radio page (+ add Description)

**Files:**
- Modify: `src/app/components/radio/page.tsx`

**Context:** Radio currently has hardcoded label colors via `getLabelColor()` and a hardcoded error icon SVG. It does NOT have description text — this task adds it, fixing the bug.

- [ ] **Step 1: Add import**

```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";
```

- [ ] **Step 2: Add `hasDescription` prop to FlowXRadio**

Add `hasDescription = false` to the component's props interface and destructuring.

- [ ] **Step 3: Replace inline Label rendering**

Remove the `getLabelColor()` function. Replace the label `<span>` with:
```tsx
<FlowXLabel
  label={label}
  size={size}
  inverted={inverted}
  disabled={state === "disabled"}
/>
```

- [ ] **Step 4: Replace inline Error Icon SVG**

Replace the error icon SVG block with:
```tsx
{isError && <FlowXErrorIcon />}
```

- [ ] **Step 5: Add Description rendering**

After the input row `<div>` (the one containing the Input container + error icon), add:
```tsx
<FlowXDescription
  state={state}
  inverted={inverted}
  visible={hasDescription}
/>
```

This goes inside the outermost component wrapper div, after the input row.

- [ ] **Step 6: Add `hasDescription` control to interactive preview**

In the controls array of the `ComponentPreview`, add:
```tsx
{
  name: "hasDescription",
  type: "boolean",
},
```

And update the render callback to pass it:
```tsx
hasDescription={values.hasDescription === true}
```

- [ ] **Step 7: Verify build and visual output**

Run: `npm run build`
Expected: Build passes. Visit `/components/radio` — label and error icon look the same. Toggling `hasDescription` in the interactive preview now shows/hides the description text. Error state shows red "Error message goes here" text.

- [ ] **Step 8: Commit**

```bash
git add src/app/components/radio/page.tsx
git commit -m "refactor: radio uses shared Label, Description, ErrorIcon

Adds error description text to radio preview (was missing)."
```

---

### Task 5: Migrate Checkbox page (+ add Description)

**Files:**
- Modify: `src/app/components/checkbox/page.tsx`

**Context:** Same pattern as Radio — hardcoded label colors, no description text.

- [ ] **Step 1: Add import**

```tsx
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";
```

- [ ] **Step 2: Add `hasDescription` prop to FlowXCheckbox**

Add `hasDescription = false` to the component's props interface and destructuring.

- [ ] **Step 3: Replace inline Label rendering**

Remove the `getLabelColor()` function. Replace the label `<span>` with:
```tsx
<FlowXLabel
  label={label}
  size={size}
  inverted={inverted}
  disabled={state === "disabled"}
/>
```

- [ ] **Step 4: Replace inline Error Icon SVG**

Replace the error icon SVG block with:
```tsx
{isError && <FlowXErrorIcon />}
```

- [ ] **Step 5: Add Description rendering**

After the input row div, add:
```tsx
<FlowXDescription
  state={state}
  inverted={inverted}
  visible={hasDescription}
/>
```

- [ ] **Step 6: Add `hasDescription` control to interactive preview**

In the controls array, add:
```tsx
{
  name: "hasDescription",
  type: "boolean",
},
```

And pass it in render:
```tsx
hasDescription={values.hasDescription === true}
```

- [ ] **Step 7: Verify build and visual output**

Run: `npm run build`
Expected: Build passes. Visit `/components/checkbox` — same behavior as radio migration.

- [ ] **Step 8: Commit**

```bash
git add src/app/components/checkbox/page.tsx
git commit -m "refactor: checkbox uses shared Label, Description, ErrorIcon

Adds error description text to checkbox preview (was missing)."
```

---

### Task 6: Final verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: All routes build successfully.

- [ ] **Step 2: Visual check all 4 pages**

Start dev server and visit:
- `/components/input-field` — label, description, error icon look the same as before
- `/components/select-field` — same
- `/components/radio` — label and error icon same, description text now appears in error state
- `/components/checkbox` — same as radio

- [ ] **Step 3: Test interactive previews**

For each page, toggle error state in the interactive preview and verify:
- Error icon appears
- Description text shows "Error message goes here" in red (#e62200)
- Switching to inverted keeps error text red
- Switching to disabled shows muted description text

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: shared sub-components for Label, Description, ErrorIcon

Extracts FlowXLabel, FlowXDescription, FlowXErrorIcon into
src/components/docs/shared-elements.tsx. Rolls out across
Input Field, Select Field, Radio, and Checkbox pages.

Fixes: Radio and Checkbox now show error description text
in their interactive previews."
git push
```
