# Phosphor Icons Integration — Design Spec

> Replace all inline SVGs and lucide-react with `@phosphor-icons/react` across the entire FlowX Design System site. Add an icon picker control to ComponentPreview for interactive icon selection.

---

## Scope

1. Install `@phosphor-icons/react`, uninstall `lucide-react`
2. Replace all inline SVG icon functions in component preview pages with Phosphor components
3. Replace all lucide-react imports in docs UI with Phosphor equivalents
4. Add a shared icon helper module with a curated icon list
5. Add an `"icon"` control type to `ComponentPreview`
6. Update component pages to use the icon picker where applicable

**Out of scope:** Radio dot and checkbox checkmark SVGs — these are component-specific graphics, not icons from a library.

---

## 1. Package Changes

**Install:**
```bash
npm install @phosphor-icons/react
```

**Uninstall (after migration):**
```bash
npm uninstall lucide-react
```

---

## 2. Icon Mapping

### Lucide → Phosphor (docs UI)

| File | Current (lucide) | Replacement (Phosphor) |
|---|---|---|
| `src/app/page.tsx` | `ArrowRight` | `ArrowRight` |
| `src/components/ui/checkbox.tsx` | `CheckIcon` | `Check` |
| `src/components/ui/sheet.tsx` | `XIcon` | `X` |
| `src/components/ui/accordion.tsx` | `ChevronDownIcon`, `ChevronUpIcon` | `CaretDown`, `CaretUp` |
| `src/components/docs/breadcrumbs.tsx` | `ChevronRight` | `CaretRight` |
| `src/components/docs/dos-and-donts.tsx` | `Check`, `X` | `Check`, `X` |
| `src/components/docs/status-banner.tsx` | `ExternalLink` | `ArrowSquareOut` |
| `src/components/docs/theme-toggle.tsx` | `Moon`, `Sun` | `Moon`, `Sun` |
| `src/components/docs/mobile-nav.tsx` | `Menu` | `List` |
| `src/components/docs/top-bar.tsx` | `ExternalLink` | `ArrowSquareOut` |

### Inline SVG → Phosphor (component previews)

| File | Current inline SVG | Replacement (Phosphor) |
|---|---|---|
| `values-table/page.tsx` | `PencilIcon()` | `PencilSimple` |
| `values-table/page.tsx` | `TrashIcon()` | `Trash` |
| `values-table/page.tsx` | `CheckIcon()` | `Check` |
| `values-table/page.tsx` | `XIcon()` | `X` |
| `values-table/page.tsx` | `SortIcon()` | `SortAscending` |
| `values-table/page.tsx` | `FilterIcon()` | `Funnel` |
| `button/page.tsx` | `CheckIcon()` | `Check` |
| `button/page.tsx` | `ArrowRightIcon()` | `ArrowRight` |
| `input-field/page.tsx` | Search inline SVG (icon start) | `MagnifyingGlass` |
| `input-field/page.tsx` | Chevron-down inline SVG (icon end) | `CaretDown` |
| `tabs/page.tsx` | User profile inline SVG | `User` |
| `select-field/page.tsx` | Chip close inline SVG | `X` |
| `select-field/page.tsx` | Caret-down inline SVG | `CaretDown` |

### Shared elements

| File | Current | Replacement (Phosphor) |
|---|---|---|
| `shared-elements.tsx` | `FlowXErrorIcon` (custom SVG) | `WarningCircle` with `color="#e62200"` |
| `shared-elements.tsx` | Info icon in `FlowXLabel` (inline SVG) | `Info` |

### Unchanged

- `radio/page.tsx` — Radio dot SVG (component-specific graphic, not an icon)
- `checkbox/page.tsx` — Checkbox checkmark SVG (component-specific graphic, not an icon)
- `src/app/Radio Button/RadioIcon.svg` — Standalone SVG asset file

---

## 3. Shared Icon Helper

**File:** `src/lib/phosphor-icons.ts`

### Curated icon list

A single constant defining the icons available in the ComponentPreview icon picker:

```ts
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
```

### PhosphorIcon wrapper

A component that renders a Phosphor icon by string name. Used in component preview render functions where the icon name comes from a control value.

```ts
export function PhosphorIcon({
  name,
  size,
  color,
  weight,
}: {
  name: IconName;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}): React.ReactElement | null
```

Implementation: a `Record<IconName, ComponentType>` map that maps each name string to its Phosphor React component. Lazy-friendly since the curated set is small (~16 icons).

---

## 4. ComponentPreview Icon Control

### New control type

Add `type: "icon"` to the existing `Control` interface in `component-preview.tsx`:

```ts
interface Control {
  name: string;
  options?: string[];
  type?: "boolean" | "icon";  // add "icon"
  default?: any;
  disabledUnless?: string;
  forcedOnWhen?: string;
}
```

### Rendering

When `type === "icon"`, render a dropdown or segment control showing the curated icon names from `ICON_OPTIONS`. Each option displays the icon + its name. Default value: the first icon in the list.

### Usage in render callbacks

The selected icon name is passed as a string to the `render` callback. Component pages use `PhosphorIcon` to render it:

```tsx
controls={[
  { name: "hasIconStart", type: "boolean" },
  { name: "iconStart", type: "icon", disabledUnless: "hasIconStart" },
]}
render={(values) => (
  <FlowXButton
    iconStart={values.hasIconStart ? values.iconStart : undefined}
  />
)}
```

---

## 5. Component Page Updates

### Button (`button/page.tsx`)
- Remove `CheckIcon` and `ArrowRightIcon` inline SVG functions
- Add `iconStart` and `iconEnd` icon picker controls (disabled unless `hasIconStart`/`hasIconEnd`)
- `FlowXButton` receives icon name string, renders via `PhosphorIcon`

### Input Field (`input-field/page.tsx`)
- Remove inline search SVG (icon start) and chevron-down SVG (icon end)
- Add icon picker control for icon start/end
- Render via `PhosphorIcon`

### Tabs (`tabs/page.tsx`)
- Remove inline user profile SVG
- Add icon picker control for tab icon
- Render via `PhosphorIcon`

### Values Table (`values-table/page.tsx`)
- Remove all 6 inline SVG icon functions
- Import Phosphor components directly for fixed icons: `PencilSimple`, `Trash`, `Check`, `X`, `SortAscending`, `Funnel`
- These are not user-selectable — they're fixed table UI elements

### Select Field (`select-field/page.tsx`)
- Remove inline chip close SVG and caret-down SVG
- Use `X` and `CaretDown` from Phosphor directly

### Shared Elements (`shared-elements.tsx`)
- `FlowXErrorIcon` → `WarningCircle` from Phosphor with `color="#e62200"` and configurable `size`
- `FlowXLabel` info icon → `Info` from Phosphor

### Docs UI files
- Replace lucide-react imports 1:1 per the mapping table in Section 2
- **API difference:** Lucide uses `className="h-4 w-4"` for sizing; Phosphor uses `size={16}` prop. Each migration must convert the sizing approach accordingly.
- No behavioral changes, only import swaps + size prop conversion

---

## 6. Migration Order

1. Install `@phosphor-icons/react`
2. Create `src/lib/phosphor-icons.ts` (helper + curated list)
3. Add `"icon"` control type to `ComponentPreview`
4. Update `shared-elements.tsx` (FlowXErrorIcon, FlowXLabel info icon)
5. Update component preview pages one by one (values-table, button, input-field, tabs, select-field)
6. Update docs UI files (breadcrumbs, theme-toggle, mobile-nav, top-bar, status-banner, dos-and-donts, accordion, sheet, checkbox UI, home page)
7. Uninstall `lucide-react`
8. Verify build passes, all icons render correctly
