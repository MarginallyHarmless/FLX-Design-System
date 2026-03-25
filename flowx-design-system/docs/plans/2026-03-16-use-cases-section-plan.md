# Use Cases Section — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the "Variants" section with "Use Cases" on all component pages, making each card answer "when would I use this?"

**Architecture:** Rename `description` → `useCase` in the variant type, rewrite all variant data with use-case text, update all 4 page files to render name + useCase, rename States heading to "States Reference".

**Tech Stack:** TypeScript, Next.js, React

---

### Task 1: Update ComponentSpec type

**Files:**
- Modify: `src/lib/components-data/types.ts:82-86`

**Step 1: Change the variant type**

```ts
// Current (lines 82-86):
variants: {
  name: string;
  description?: string;
  props: Record<string, string>;
}[];

// Target:
variants: {
  name: string;
  useCase: string;
  props: Record<string, string>;
}[];
```

Change `description?: string` to `useCase: string` (required, not optional).

**Step 2: Run build to see what breaks**

Run: `npm run build 2>&1 | head -40`
Expected: Type errors in all 4 component data files (missing `useCase`, unknown `description`)

**Step 3: Commit**

```bash
git add src/lib/components-data/types.ts
git commit -m "refactor: rename variant description to useCase in ComponentSpec type"
```

---

### Task 2: Rewrite input-field variants with use cases

**Files:**
- Modify: `src/lib/components-data/input-field.ts`

**Step 1: Replace the variants array**

```ts
variants: [
  { name: "Default", useCase: "The standard empty input, ready for user entry.", props: { state: "default", filled: "off", inverted: "off" } },
  { name: "Filled", useCase: "Shows user-entered content in its resting state.", props: { state: "default", filled: "on", inverted: "off" } },
  { name: "Focused", useCase: "Active typing state with focus ring — shown for visual reference.", props: { state: "focused", filled: "off", inverted: "off" } },
  { name: "With Validation Error", useCase: "Show when form validation fails after submission.", props: { state: "error", filled: "off", inverted: "off" } },
  { name: "Disabled", useCase: "Use when the field should be visible but not editable.", props: { state: "disabled", filled: "off", inverted: "off" } },
  { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { state: "default", filled: "off", inverted: "on" } },
],
```

**Step 2: Verify no type errors for this file**

Run: `npm run build 2>&1 | grep "input-field"`
Expected: No errors for input-field (other files may still error)

---

### Task 3: Rewrite radio-v3 variants with use cases

**Files:**
- Modify: `src/lib/components-data/radio-v3.ts`

**Step 1: Replace the variants array**

```ts
variants: [
  { name: "Default Unselected", useCase: "Standard unchecked radio, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
  { name: "Default Selected", useCase: "Checked state showing the user's active selection.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
  { name: "Without Border", useCase: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
  { name: "Selected Without Border", useCase: "Checked state in borderless compact layouts.", props: { selected: "on", state: "default", border: "off", inverted: "off" } },
  { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
  { name: "Selected on Dark Background", useCase: "Checked state on dark surfaces.", props: { selected: "on", state: "default", border: "on", inverted: "on" } },
  { name: "Error Unselected", useCase: "Show when form validation requires a selection.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
  { name: "Error Selected", useCase: "Selected but still in error — e.g. group-level validation failure.", props: { selected: "on", state: "error", border: "on", inverted: "off" } },
  { name: "Disabled Unselected", useCase: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
  { name: "Disabled Selected", useCase: "Use when showing a locked-in selection the user cannot change.", props: { selected: "on", state: "disabled", border: "on", inverted: "off" } },
],
```

---

### Task 4: Rewrite checkbox variants with use cases

**Files:**
- Modify: `src/lib/components-data/checkbox.ts`

**Step 1: Replace the variants array**

```ts
variants: [
  { name: "Default Unselected", useCase: "Standard unchecked checkbox, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
  { name: "Default Selected", useCase: "Checked state confirming the user's choice.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
  { name: "Without Border", useCase: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
  { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
  { name: "With Validation Error", useCase: "Show when a required checkbox has not been checked.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
  { name: "Disabled", useCase: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
],
```

---

### Task 5: Rewrite button variants with use cases

**Files:**
- Modify: `src/lib/components-data/button.ts`

**Step 1: Replace the variants array**

```ts
variants: [
  { name: "Default", useCase: "Primary call to action — use for the most important action on the page.", props: { variant: "default" } },
  { name: "Secondary", useCase: "Use for supporting actions that don't compete with the primary action.", props: { variant: "secondary" } },
  { name: "Outline", useCase: "Use for tertiary actions or when a lighter visual weight is needed.", props: { variant: "outline" } },
  { name: "Ghost", useCase: "Use for inline or contextual actions with minimal visual presence.", props: { variant: "ghost" } },
  { name: "Destructive", useCase: "Use for dangerous or irreversible actions like delete or remove.", props: { variant: "destructive" } },
],
```

**Step 2: Commit all data file changes**

```bash
git add src/lib/components-data/input-field.ts src/lib/components-data/radio-v3.ts src/lib/components-data/checkbox.ts src/lib/components-data/button.ts
git commit -m "refactor: rewrite variant descriptions as use cases for all components"
```

---

### Task 6: Update input-field page rendering

**Files:**
- Modify: `src/app/components/input-field/page.tsx`

**Step 1: Update Variants section heading and card label**

Change heading from `"Variants"` to `"Use Cases"`.

In the variant card, replace the single `<p>` label with name + useCase:

```tsx
// Current:
<p className={`text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
  {v.name}
</p>

// Target:
<div className="text-center">
  <p className={`text-sm font-medium ${isInverted ? "text-neutral-200" : ""}`}>
    {v.name}
  </p>
  <p className={`mt-0.5 text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
    {v.useCase}
  </p>
</div>
```

**Step 2: Update States section heading**

Change `"States"` to `"States Reference"`.

---

### Task 7: Update radio-v3 page rendering

**Files:**
- Modify: `src/app/components/radio-v3/page.tsx`

**Step 1: Update Variants section heading and card label**

Same pattern as Task 6 — change heading to `"Use Cases"`, replace single `<p>` with name + useCase div.

**Step 2: Update States section heading**

Change `"States"` to `"States Reference"`.

---

### Task 8: Update checkbox page rendering

**Files:**
- Modify: `src/app/components/checkbox/page.tsx`

**Step 1: Update Variants section heading and card label**

Change heading to `"Use Cases"`. Replace the current card label (which uses the old `v.description` pattern) with:

```tsx
<div className="text-center">
  <p className={`text-sm font-medium ${isInverted ? "text-neutral-200" : ""}`}>
    {v.name}
  </p>
  <p className={`mt-0.5 text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
    {v.useCase}
  </p>
</div>
```

Also update card styling to match Radio V3 pattern (remove borders, add background fills) since checkbox still uses the old style.

**Step 2: Update States section heading**

Change `"States"` to `"States Reference"`.

---

### Task 9: Update button page rendering

**Files:**
- Modify: `src/app/components/button/page.tsx`

**Step 1: Update Variants section heading and card label**

Change heading to `"Use Cases"`. Replace the current card label (which uses old `v.description` pattern with `text-sm font-medium`) with the same name + useCase pattern.

Also update card styling to match Radio V3 pattern (remove `border` class, add `backgroundColor: "#f7f8f9"` inline style).

**Step 2: Update States section heading**

Change `"States"` to `"States Reference"`.

**Step 3: Commit all page changes**

```bash
git add src/app/components/input-field/page.tsx src/app/components/radio-v3/page.tsx src/app/components/checkbox/page.tsx src/app/components/button/page.tsx
git commit -m "feat: replace Variants with Use Cases section on all component pages"
```

---

### Task 10: Update component-create.md

**Files:**
- Modify: `component-create.md`

**Step 1: Update the variant data instructions**

In Step 2e, change the `variants` bullet to reference `useCase` instead of `description`:

```
- **variants** — array of `{ name, useCase, props }` for each meaningful use case
```

**Step 2: Update the Variant Card Style section**

Change the heading from "Variant Card Style" to "Use Case Card Style". Update the example to show name + useCase rendering.

**Step 3: Update the Page Structure template**

Change section 4 comment from `{/* 4. Variants */}` to `{/* 4. Use Cases */}` and section 5 from `{/* 5. States */}` to `{/* 5. States Reference */}`.

**Step 4: Commit**

```bash
git add component-create.md
git commit -m "docs: update component-create.md for Use Cases section pattern"
```

---

### Task 11: Build verification

**Step 1: Run full build**

Run: `npm run build`
Expected: Clean build, no errors

**Step 2: Visually verify**

Check each page:
- `/components/input-field` — Use Cases section shows name + use case text per card
- `/components/radio-v3` — Same pattern
- `/components/checkbox` — Same pattern, cards now have grey fill instead of borders
- `/components/button` — Same pattern, cards now have grey fill instead of borders
- All pages show "States Reference" heading for the states section
