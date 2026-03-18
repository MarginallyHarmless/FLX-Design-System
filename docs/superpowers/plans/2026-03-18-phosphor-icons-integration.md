# Phosphor Icons Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all lucide-react imports and inline SVG icons with `@phosphor-icons/react`, add an icon picker control to ComponentPreview, and unify the entire site on one icon library.

**Architecture:** Install `@phosphor-icons/react`, create a shared icon helper with a curated icon map and `PhosphorIcon` wrapper component, add an `"icon"` control type to `ComponentPreview`, migrate all files from lucide/inline-SVG to Phosphor, then uninstall lucide-react.

**Tech Stack:** Next.js, TypeScript, `@phosphor-icons/react`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `package.json` | Modify | Add `@phosphor-icons/react`, later remove `lucide-react` |
| `src/lib/phosphor-icons.ts` | Create | Curated icon list, `PhosphorIcon` wrapper, `IconName` type |
| `src/components/docs/component-preview.tsx` | Modify | Add `"icon"` control type with dropdown rendering |
| `src/components/docs/shared-elements.tsx` | Modify | Replace `FlowXErrorIcon` SVG with `WarningCircle`, info icon with `Info` |
| `src/app/components/values-table/page.tsx` | Modify | Replace 6 inline SVG icon functions with direct Phosphor imports |
| `src/app/components/button/page.tsx` | Modify | Replace `CheckIcon`/`ArrowRightIcon` with `PhosphorIcon`, add icon picker |
| `src/app/components/input-field/page.tsx` | Modify | Replace search/chevron SVGs with `PhosphorIcon`, add icon picker |
| `src/app/components/tabs/page.tsx` | Modify | Replace user profile SVG with `PhosphorIcon`, add icon picker |
| `src/app/components/select-field/page.tsx` | Modify | Replace chip close/caret-down SVGs with Phosphor |
| `src/components/docs/breadcrumbs.tsx` | Modify | `ChevronRight` → `CaretRight` |
| `src/components/docs/theme-toggle.tsx` | Modify | `Moon`/`Sun` → Phosphor `Moon`/`Sun` |
| `src/components/docs/mobile-nav.tsx` | Modify | `Menu` → `List` |
| `src/components/docs/top-bar.tsx` | Modify | `ExternalLink` → `ArrowSquareOut` |
| `src/components/docs/status-banner.tsx` | Modify | `ExternalLink` → `ArrowSquareOut` |
| `src/components/docs/dos-and-donts.tsx` | Modify | `Check`/`X` → Phosphor `Check`/`X` |
| `src/components/ui/accordion.tsx` | Modify | `ChevronDownIcon`/`ChevronUpIcon` → `CaretDown`/`CaretUp` |
| `src/components/ui/sheet.tsx` | Modify | `XIcon` → `X` |
| `src/components/ui/checkbox.tsx` | Modify | `CheckIcon` → `Check` |
| `src/app/page.tsx` | Modify | `ArrowRight` → Phosphor `ArrowRight` |

---

## Task 1: Install `@phosphor-icons/react`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system"
npm install @phosphor-icons/react
```

- [ ] **Step 2: Verify install**

```bash
npm ls @phosphor-icons/react
```

Expected: Package listed with version.

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: Build succeeds (no changes to code yet).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install @phosphor-icons/react"
```

---

## Task 2: Create shared icon helper

**Files:**
- Create: `src/lib/phosphor-icons.ts`

- [ ] **Step 1: Create the icon helper module**

```ts
import React from "react";
import {
  MagnifyingGlass,
  PencilSimple,
  Trash,
  Check,
  X,
  ArrowRight,
  Plus,
  Gear,
  User,
  Bell,
  CaretDown,
  Funnel,
  Eye,
  Download,
  Copy,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";

export const ICON_OPTIONS = [
  "MagnifyingGlass",
  "PencilSimple",
  "Trash",
  "Check",
  "X",
  "ArrowRight",
  "Plus",
  "Gear",
  "User",
  "Bell",
  "CaretDown",
  "Funnel",
  "Eye",
  "Download",
  "Copy",
  "DotsThreeVertical",
] as const;

export type IconName = (typeof ICON_OPTIONS)[number];

const ICON_MAP: Record<IconName, React.ComponentType<IconProps>> = {
  MagnifyingGlass,
  PencilSimple,
  Trash,
  Check,
  X,
  ArrowRight,
  Plus,
  Gear,
  User,
  Bell,
  CaretDown,
  Funnel,
  Eye,
  Download,
  Copy,
  DotsThreeVertical,
};

export function PhosphorIcon({
  name,
  size,
  color,
  weight = "regular",
  className,
}: {
  name: IconName;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return React.createElement(Icon, { size, color, weight, className });
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add src/lib/phosphor-icons.ts
git commit -m "feat: add shared Phosphor icon helper with curated icon list"
```

---

## Task 3: Add icon control type to ComponentPreview

**Files:**
- Modify: `src/components/docs/component-preview.tsx`

- [ ] **Step 1: Add the ICON_OPTIONS import and icon control rendering**

At the top of the file, add:

```ts
import { ICON_OPTIONS, PhosphorIcon } from "@/lib/phosphor-icons";
```

Update the `Control` interface `type` field:

```ts
type?: "boolean" | "icon";
```

In the `ComponentPreview` component's `useState` initializer, add a case for icon type:

```ts
} else if (c.type === "icon") {
  init[c.name] = c.default ?? ICON_OPTIONS[0];
}
```

In the controls rendering section, add a branch for `type === "icon"`. When `type === "icon"`, use a dropdown `<select>` element styled to match the existing control aesthetics. Each option shows the icon name. The select value is the icon name string:

```tsx
{c.type === "icon" ? (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    <PhosphorIcon name={segmentValue as any} size={16} />
    <select
      value={segmentValue}
      disabled={isDisabled}
      onChange={(e) => update(c.name, e.target.value)}
      style={{
        padding: "5px 8px",
        borderRadius: 6,
        border: "1px solid #e3e8ed",
        fontSize: 13,
        color: "#1d232c",
        backgroundColor: "#ffffff",
        cursor: isDisabled ? "default" : "pointer",
        opacity: isDisabled ? 0.4 : 1,
      }}
    >
      {ICON_OPTIONS.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
) : (
  <SegmentControl ... />  // existing segment control
)}
```

The full conditional structure in the controls rendering loop should be:

```tsx
{c.type === "icon" ? (
  // icon dropdown (code above)
) : (
  <SegmentControl
    options={segmentOptions}
    value={segmentValue}
    disabled={isDisabled}
    onChange={(val) => {
      if (c.type === "boolean") {
        update(c.name, val === "On");
      } else {
        update(c.name, val);
      }
    }}
  />
)}
```

This wraps the existing `<SegmentControl>` block in the else branch.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add src/components/docs/component-preview.tsx
git commit -m "feat: add icon picker control type to ComponentPreview"
```

---

## Task 4: Migrate shared-elements.tsx

**Files:**
- Modify: `src/components/docs/shared-elements.tsx`

- [ ] **Step 1: Replace FlowXErrorIcon and info icon**

Add import at the top:

```ts
import { WarningCircle, Info } from "@phosphor-icons/react";
```

Replace the `FlowXErrorIcon` function body. The current function (lines ~107-124) renders a custom SVG. Replace with:

```ts
export function FlowXErrorIcon({ size = 16 }: { size?: number }) {
  return <WarningCircle size={size} color="#e62200" weight="bold" style={{ flexShrink: 0 }} />;
}
```

Replace the inline info SVG inside `FlowXLabel` (the `<svg>` block around line 52-62 that draws a circle with "i") with:

```tsx
<Info size={16} color={color} weight="bold" style={{ flexShrink: 0 }} />
```

Where `color` is the existing variable already in scope (the label text color).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes. All pages using `FlowXErrorIcon` and `FlowXLabel` still render correctly.

- [ ] **Step 3: Commit**

```bash
git add src/components/docs/shared-elements.tsx
git commit -m "refactor: replace shared element SVGs with Phosphor icons"
```

---

## Task 5: Migrate values-table page

**Files:**
- Modify: `src/app/components/values-table/page.tsx`

- [ ] **Step 1: Replace inline SVG icon functions with Phosphor imports**

Add import at the top:

```ts
import { PencilSimple, Trash, Check, X, SortAscending, Funnel } from "@phosphor-icons/react";
```

Remove these functions entirely:
- `SortIcon()`
- `FilterIcon()`
- `PencilIcon()`
- `TrashIcon()`
- `CheckIcon()`
- `XIcon()`

Replace all usages:
- `<SortIcon />` → `<SortAscending size={12} color="#64748b" />`
- `<FilterIcon />` → `<Funnel size={12} color="#64748b" />`
- `<PencilIcon />` → `<PencilSimple size={16} color="currentColor" />`
- `<TrashIcon />` → `<Trash size={16} color="currentColor" />`
- `<CheckIcon color={...} />` → `<Check size={14} color={...} />`
- `<XIcon color={...} />` → `<X size={14} color={...} />`

Note: Where `CheckIcon`/`XIcon` accepted a `color` prop, pass it to the Phosphor `color` prop directly.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/values-table/page.tsx
git commit -m "refactor: replace values-table inline SVGs with Phosphor icons"
```

---

## Task 6: Migrate button page with icon picker

**Files:**
- Modify: `src/app/components/button/page.tsx`

- [ ] **Step 1: Replace inline SVG icons and add icon picker**

Add import:

```ts
import { PhosphorIcon, type IconName } from "@/lib/phosphor-icons";
```

Remove the `CheckIcon` and `ArrowRightIcon` functions.

Update `FlowXButton` props to accept optional `iconStart` and `iconEnd` as `IconName`:

```ts
iconStart?: IconName;
iconEnd?: IconName;
```

Replace the icon rendering inside `FlowXButton`:

```tsx
{hasIconStart && iconStart && (
  <PhosphorIcon name={iconStart} size={sizeTokens.iconSize} color={colors.iconColor ?? colors.textColor} />
)}
// ... label ...
{hasIconEnd && iconEnd && (
  <PhosphorIcon name={iconEnd} size={sizeTokens.iconSize} color={colors.iconColor ?? colors.textColor} />
)}
```

Add icon picker controls to the `ComponentPreview`:

```tsx
{
  name: "iconStart",
  type: "icon",
  default: "Check",
  disabledUnless: "hasIconStart",
},
{
  name: "iconEnd",
  type: "icon",
  default: "ArrowRight",
  disabledUnless: "hasIconEnd",
},
```

Update the `render` callback to pass icon names:

```tsx
iconStart={values.hasIconStart ? (values.iconStart as IconName) : undefined}
iconEnd={values.hasIconEnd ? (values.iconEnd as IconName) : undefined}
```

Also update the use-cases and states sections to pass default icon names where needed (e.g., `iconStart="Check"` for variants that show icons).

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 3: Commit**

```bash
git add src/app/components/button/page.tsx
git commit -m "refactor: replace button inline SVGs with Phosphor icon picker"
```

---

## Task 7: Migrate input-field page with icon picker

**Files:**
- Modify: `src/app/components/input-field/page.tsx`

- [ ] **Step 1: Replace inline SVGs and add icon picker**

Add import:

```ts
import { PhosphorIcon, type IconName } from "@/lib/phosphor-icons";
```

Remove the inline search SVG (magnifying glass around line 116) and the chevron-down SVG (around line 173).

Update `FlowXInputField` to accept `iconStartName?: IconName` and `iconEndName?: IconName` instead of rendering fixed SVGs. Render via:

```tsx
{hasIconStart && iconStartName && (
  <PhosphorIcon name={iconStartName} size={iconStartStyle?.width ?? 16} color={prefixSuffixColor} />
)}
// ...
{hasIconEnd && iconEndName && (
  <PhosphorIcon name={iconEndName} size={iconEndStyle?.width ?? 16} color={prefixSuffixColor} />
)}
```

Add icon picker controls:

```tsx
{
  name: "iconStartName",
  type: "icon",
  default: "MagnifyingGlass",
  disabledUnless: "hasIconStart",
},
```

Update the render callback to pass the icon name.

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/input-field/page.tsx
git commit -m "refactor: replace input-field inline SVGs with Phosphor icon picker"
```

---

## Task 8: Migrate tabs page with icon picker

**Files:**
- Modify: `src/app/components/tabs/page.tsx`

- [ ] **Step 1: Replace inline user SVG and add icon picker**

Add import:

```ts
import { PhosphorIcon, type IconName } from "@/lib/phosphor-icons";
```

Remove the inline user profile SVG function.

Update the tab component to accept an `iconName?: IconName` prop and render:

```tsx
{hasIcon && iconName && (
  <PhosphorIcon name={iconName} size={16} color={nameStyle?.textColor} />
)}
```

Add icon picker control to ComponentPreview:

```tsx
{
  name: "iconName",
  type: "icon",
  default: "User",
  disabledUnless: "hasIcon",
},
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/tabs/page.tsx
git commit -m "refactor: replace tabs inline SVG with Phosphor icon picker"
```

---

## Task 9: Migrate select-field page

**Files:**
- Modify: `src/app/components/select-field/page.tsx`

- [ ] **Step 1: Replace inline SVGs with Phosphor**

Add import:

```ts
import { X, CaretDown } from "@phosphor-icons/react";
```

Remove the inline chip-close SVG and the caret-down SVG.

Replace usages:
- Chip close: `<X size={chipCloseSize} color={chipCloseColor} />` (match current size/color/opacity)
- Caret-down: `<CaretDown size={caretSize} color={caretColor} />` (match current size/color)

- [ ] **Step 2: Verify build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/app/components/select-field/page.tsx
git commit -m "refactor: replace select-field inline SVGs with Phosphor icons"
```

---

## Task 10: Migrate docs UI files (lucide → Phosphor)

**Files:**
- Modify: `src/components/docs/breadcrumbs.tsx`
- Modify: `src/components/docs/theme-toggle.tsx`
- Modify: `src/components/docs/mobile-nav.tsx`
- Modify: `src/components/docs/top-bar.tsx`
- Modify: `src/components/docs/status-banner.tsx`
- Modify: `src/components/docs/dos-and-donts.tsx`
- Modify: `src/components/ui/accordion.tsx`
- Modify: `src/components/ui/sheet.tsx`
- Modify: `src/components/ui/checkbox.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Migrate breadcrumbs.tsx**

Replace:
```ts
import { ChevronRight } from "lucide-react";
```
With:
```ts
import { CaretRight } from "@phosphor-icons/react";
```

Replace usage (line 33):
```tsx
<ChevronRight className="h-3.5 w-3.5" />
```
With:
```tsx
<CaretRight size={14} />
```

- [ ] **Step 2: Migrate theme-toggle.tsx**

Replace:
```ts
import { Moon, Sun } from "lucide-react";
```
With:
```ts
import { Moon, Sun } from "@phosphor-icons/react";
```

Replace usages — **important:** Phosphor icons don't accept `className` for sizing; use `size` prop. Keep the Tailwind transform/transition classes on a wrapper `<span>`:

```tsx
<span className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
  <Sun size={16} />
</span>
<span className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">
  <Moon size={16} />
</span>
```

- [ ] **Step 3: Migrate mobile-nav.tsx**

Replace:
```ts
import { Menu } from "lucide-react";
```
With:
```ts
import { List } from "@phosphor-icons/react";
```

Replace usage:
```tsx
<Menu className="size-5" />
```
With:
```tsx
<List size={20} />
```

- [ ] **Step 4: Migrate top-bar.tsx**

Replace:
```ts
import { ExternalLink } from "lucide-react";
```
With:
```ts
import { ArrowSquareOut } from "@phosphor-icons/react";
```

Replace usage:
```tsx
<ExternalLink className="h-4 w-4" />
```
With:
```tsx
<ArrowSquareOut size={16} />
```

- [ ] **Step 5: Migrate status-banner.tsx**

Replace:
```ts
import { ExternalLink } from "lucide-react";
```
With:
```ts
import { ArrowSquareOut } from "@phosphor-icons/react";
```

Replace usage:
```tsx
<ExternalLink className="size-3" />
```
With:
```tsx
<ArrowSquareOut size={12} />
```

- [ ] **Step 6: Migrate dos-and-donts.tsx**

Replace:
```ts
import { Check, X } from "lucide-react";
```
With:
```ts
import { Check, X } from "@phosphor-icons/react";
```

Replace usages — convert className sizing to `size` prop, keep color/margin classes on a wrapper:

- `<Check className="size-4 text-green-600 dark:text-green-400" />` → `<Check size={16} className="text-green-600 dark:text-green-400" />`
- `<Check className="mt-0.5 size-3.5 shrink-0 text-green-500" />` → `<Check size={14} className="mt-0.5 shrink-0 text-green-500" />`
- `<X className="size-4 text-red-600 dark:text-red-400" />` → `<X size={16} className="text-red-600 dark:text-red-400" />`
- `<X className="mt-0.5 size-3.5 shrink-0 text-red-500" />` → `<X size={14} className="mt-0.5 shrink-0 text-red-500" />`

Note: Phosphor components accept `className` for non-sizing utilities (color, margin, etc).

- [ ] **Step 7: Migrate accordion.tsx**

Replace:
```ts
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
```
With:
```ts
import { CaretDown, CaretUp } from "@phosphor-icons/react"
```

Replace usages — keep the existing `data-slot` and className attributes. The sizing is controlled by a parent CSS selector `**:data-[slot=accordion-trigger-icon]:size-4` which sets the element to 16px. Add explicit `size={16}` on the Phosphor components:

```tsx
<CaretDown data-slot="accordion-trigger-icon" size={16} className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
<CaretUp data-slot="accordion-trigger-icon" size={16} className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
```

- [ ] **Step 8: Migrate sheet.tsx**

Replace:
```ts
import { XIcon } from "lucide-react"
```
With:
```ts
import { X } from "@phosphor-icons/react"
```

Replace usage:
```tsx
<XIcon />
```
With:
```tsx
<X size={16} />
```

- [ ] **Step 9: Migrate checkbox.tsx (UI component)**

Replace:
```ts
import { CheckIcon } from "lucide-react"
```
With:
```ts
import { Check } from "@phosphor-icons/react"
```

Replace usage:
```tsx
<CheckIcon />
```
With:
```tsx
<Check size={14} />
```

The parent selector `[&>svg]:size-3.5` (14px) was controlling size before. The explicit `size={14}` handles it now. Consider removing or keeping the CSS selector for safety.

- [ ] **Step 10: Migrate page.tsx (home page)**

Replace:
```ts
import { ArrowRight } from "lucide-react";
```
With:
```ts
import { ArrowRight } from "@phosphor-icons/react";
```

Replace usage:
```tsx
<ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
```
With:
```tsx
<ArrowRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

Expected: Build passes with zero lucide-react imports remaining.

- [ ] **Step 12: Verify no remaining lucide imports**

```bash
grep -r "lucide-react" src/
```

Expected: No results.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "refactor: migrate all docs UI files from lucide-react to Phosphor icons"
```

---

## Task 11: Uninstall lucide-react

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Uninstall**

```bash
npm uninstall lucide-react
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: Build passes — no remaining references to lucide-react.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: uninstall lucide-react — fully replaced by @phosphor-icons/react"
```

---

## Acceptance Checklist

- [ ] `@phosphor-icons/react` installed, `lucide-react` removed
- [ ] `src/lib/phosphor-icons.ts` exports `ICON_OPTIONS`, `IconName`, `PhosphorIcon`
- [ ] `ComponentPreview` supports `type: "icon"` controls with dropdown
- [ ] `shared-elements.tsx` uses Phosphor for error and info icons
- [ ] Values table page uses Phosphor for all 6 icon types
- [ ] Button page has icon picker for start/end icons
- [ ] Input field page has icon picker for start/end icons
- [ ] Tabs page has icon picker for tab icon
- [ ] Select field page uses Phosphor for chip close and caret
- [ ] All 10 docs UI files migrated from lucide to Phosphor
- [ ] `grep -r "lucide-react" src/` returns zero results
- [ ] `npm run build` passes
- [ ] No inline SVG icon functions remain (except radio dot and checkbox checkmark)
