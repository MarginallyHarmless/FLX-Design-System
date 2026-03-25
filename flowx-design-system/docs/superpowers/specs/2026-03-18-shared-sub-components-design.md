# Shared Sub-Components: Label, Description, Error Icon

## Problem

Three UI elements — Label, Description (helper/error text), and Error Icon — are duplicated across component preview pages (Input Field, Select Field, Radio, Checkbox). This causes:

1. **Bug:** Radio and Checkbox interactive previews don't render the error description text in error state, while Input Field and Select Field do.
2. **Maintenance burden:** Changing any of these elements requires updating 4+ files with slightly different implementations.
3. **Inconsistency risk:** Hardcoded color values drift between pages over time.

## Solution

Extract three shared React components into `src/components/docs/shared-elements.tsx`, then replace all inline implementations across the four component pages.

## Components

### `<FlowXLabel>`

Renders the label text above a component with an optional info icon.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Label"` | Label text content |
| `size` | `"small" \| "medium"` | `"medium"` | Controls font size and line height |
| `inverted` | `boolean` | `false` | Dark background color scheme |
| `disabled` | `boolean` | `false` | Disabled state color |
| `showInfo` | `boolean` | `false` | Show info icon next to label |
| `hasLabel` | `boolean` | `true` | Toggle visibility — returns null when false |

**Typography:**
- Medium: 14px Open Sans SemiBold (600), lineHeight 24px
- Small: 12px Open Sans SemiBold (600), lineHeight 16px

**Colors:**

| State | Inverted=Off | Inverted=On |
|-------|-------------|-------------|
| Default | `#1d232c` | `#ffffff` |
| Disabled | `#8390a2` | `#64748b` |

**Info icon:** 16x16 circle-i icon, same color as label text. Only rendered when `showInfo` is true.

### `<FlowXDescription>`

Renders helper or error text below a component.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | State-dependent default | Text content |
| `state` | `"default" \| "error" \| "disabled"` | `"default"` | Determines color |
| `inverted` | `boolean` | `false` | Dark background color scheme |
| `visible` | `boolean` | `true` | Toggle visibility — returns null when false |

**Default text values:**
- Error state: `"Error message goes here"`
- Default/disabled: `"Helper text goes here"`

**Typography:** 12px Open Sans Regular (400), lineHeight 16px (both sizes).

**Colors:**

| State | Inverted=Off | Inverted=On |
|-------|-------------|-------------|
| Default | `#6b7789` | `#8390a2` |
| Error | `#e62200` | `#e62200` |
| Disabled | `#64748b` | `#64748b` |

### `<FlowXErrorIcon>`

Renders the 16x16 warning circle SVG icon shown next to the input container in error state.

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `16` | Icon size in px |

**Implementation:** Inline SVG with circle, exclamation line, and dot. Stroke color `#e62200`, strokeWidth `1`.

## Design Decision: Colors Owned by Shared Components

All three shared components own their color logic internally — they derive colors from their props (state, inverted, disabled) rather than reading from per-component spec data files. This means changing a color in `shared-elements.tsx` updates it everywhere instantly. No per-component data file updates needed.

The existing `Description` entries in `input-field.ts` and `select-field.ts` variant styles remain for documentation/token reference purposes but are not read by the shared components at render time.

## Rollout

### Files created

1. **`src/components/docs/shared-elements.tsx`** — New file with all three components. Single source of truth for Label, Description, and Error Icon colors/typography.

### Files modified

2. **`src/app/components/input-field/page.tsx`** — Replace inline Label, Description, Error Icon with shared imports.
3. **`src/app/components/select-field/page.tsx`** — Same.
4. **`src/app/components/radio/page.tsx`** — Replace inline Label and Error Icon. Add `<FlowXDescription>` and `hasDescription` control to interactive preview (currently missing — fixes the bug).
5. **`src/app/components/checkbox/page.tsx`** — Same as Radio.

### Files NOT modified

- Component data files (`src/lib/components-data/*.ts`) — no changes needed.
- `ComponentPageTemplate`, `ComponentPreview`, and other shared doc components — unchanged.
- Switch and Segmented Button pages — these don't use Label/Description/Error Icon in the same way.

## Migration pattern

For each component page:
1. Import `FlowXLabel`, `FlowXDescription`, `FlowXErrorIcon` from `@/components/docs/shared-elements`
2. Remove the inline label rendering code and replace with `<FlowXLabel>`
3. Remove the inline description/helper text rendering code and replace with `<FlowXDescription>`
4. Remove the inline error icon SVG and replace with `<FlowXErrorIcon>`
5. Pass the appropriate props from the existing state/variant logic (state, inverted, size, disabled)
6. For Radio and Checkbox: add `hasDescription` boolean control to the interactive preview and render `<FlowXDescription>` in the preview component (new functionality)

## Testing

- All four component pages render correctly at `/components/{slug}`
- Interactive preview shows description text in error state for all components
- Label, Description, Error Icon colors match existing behavior for Input Field and Select Field
- Radio and Checkbox now show error description text (new behavior)
- Inverted variants display correct colors
- Disabled state shows correct muted colors
- `npm run build` passes with no errors
