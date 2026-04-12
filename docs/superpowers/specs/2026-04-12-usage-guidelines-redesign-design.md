# Usage Guidelines Section Redesign

## Problem

The component page template has five related but scattered sections: Use Cases (preview grid), Usage Guidelines (Do/Don't), Considerations, Known Exceptions, and Decision Log. This fragments the documentation narrative — authors can't interleave a use case with a "don't do this" warning or a design decision that explains why the variant exists.

## Solution

Replace all five sections with a single **"Usage Guidelines"** section. Each item renders as a horizontal row — preview or illustration on the left, title + description on the right. Items are author-ordered (not grouped by type), giving full narrative control.

## Data Model

New discriminated union type added to `types.ts`:

```ts
export type UsageGuideline =
  | { type: "use-case"; title: string; description: string; props: Record<string, string> }
  | { type: "do"; title: string; description: string }
  | { type: "dont"; title: string; description: string }
  | { type: "decision"; title: string; description: string; date?: string }
  | { type: "exception"; title: string; description: string }
  | { type: "info"; title: string; description: string }
```

New optional field on `ComponentSpec`:

```ts
usageGuidelines?: UsageGuideline[];
```

The old fields (`guidelines`, `considerations`, `knownExceptions`, `decisionLog`) remain on the type for backward compatibility but are no longer rendered by the template. They are removed from `ComponentSpec` once all components are migrated.

### Ordering

Items appear in the order defined in the array. No automatic grouping by type. The author controls the narrative sequence — a use case can be followed by a "don't" warning, then a design decision, etc.

## Layout

Every item renders as a horizontal row with a two-column split.

### Use-case items (type: "use-case")

- **Left (~40%):** Live `FlowX[Name]` preview component rendered from the `props` record. Displayed on a `#f7f8f9` background with `rounded-lg p-6`. Inverted variants use `bg-neutral-900`.
- **Right (~60%):** Title (`text-sm font-medium`) + description paragraph(s) (`text-sm text-muted-foreground`).

### Text-only items (do, dont, decision, exception, info)

- **Left (~40%):** Illustration panel — colored background with a centered icon. Same `rounded-lg` treatment and min-height as preview panels for visual alignment.
- **Right (~60%):** Same text layout as use-case items. Decision items additionally show `date` in monospace below the description.

### Illustration panel color map

| Type | Background | Accent Color | Icon |
|------|-----------|-------------|------|
| `do` | `--flowx-green-50` | `--flowx-green-500` | Check |
| `dont` | `--flowx-red-50` | `--flowx-red-500` | X |
| `decision` | `--flowx-blue-50` | `--flowx-blue-500` | Lightbulb |
| `exception` | `--flowx-yellow-50` | `--flowx-yellow-500` | Warning |
| `info` | `#f7f8f9` | `#64748b` | Info |

Icons from `@phosphor-icons/react`, sized at 24px. Illustration panels use `minHeight: 80px` to maintain visual weight when adjacent to taller preview panels.

### Row separators

Subtle `border-b` with `borderColor: "#f7f8f9"` between rows. Last row has no border.

### Responsive

Below `sm` breakpoint, layout stacks vertically — illustration/preview on top, text below.

## Component Implementation

### New file: `src/components/docs/usage-guidelines-section.tsx`

```tsx
interface UsageGuidelinesSectionProps {
  guidelines: UsageGuideline[];
  renderPreview: (props: Record<string, string>) => ReactNode;
}
```

Exports `UsageGuidelinesSection` which maps over `guidelines` and renders a `GuidelineRow` for each item.

Internal `IllustrationPanel` component handles the colored icon panels for non-use-case items. The color/icon config is a lookup object keyed by `type`.

`GuidelineRow` checks `item.type === "use-case"` to decide between calling `renderPreview(item.props)` or rendering `IllustrationPanel`.

## Template Integration

### Changed props on `ComponentPageTemplate`:

```tsx
interface ComponentPageTemplateProps {
  spec: ComponentSpec;
  tokens: { name: string; value: string; preview: ReactNode }[];
  interactivePreview: ReactNode;
  renderGuidelinePreview?: (props: Record<string, string>) => ReactNode;  // NEW
  useCases?: ReactNode;          // DEPRECATED — kept for backward compatibility
  statesReference: ReactNode;
  sizes: ReactNode;
}
```

### Rendering logic in template:

- If `spec.usageGuidelines` exists and `renderGuidelinePreview` is provided: render the new `UsageGuidelinesSection`.
- Else if `useCases` is provided: render old Use Cases section (backward compat).
- Old standalone sections (DosAndDonts, Considerations, Known Exceptions, Decision Log) are only rendered when `spec.usageGuidelines` is NOT present — they serve as fallback for unmigrated pages.

### New section order:

```
Title + Status + Description → Interactive Preview →
Usage Guidelines (unified) →
States Reference → Sizes →
Props → Anatomy → Real Examples → Accessibility →
Design Tokens → Related Components
```

## Page-Level Changes (per component)

Each component page provides a `renderGuidelinePreview` callback:

```tsx
const renderGuidelinePreview = (props: Record<string, string>) => (
  <FlowXRadio
    selected={props.selected === "on"}
    state={(props.state as "default" | "error" | "disabled") || "default"}
    border={props.border === "on"}
    inverted={props.inverted === "on"}
  />
);
```

This callback maps the generic `props` record to the component-specific preview. Each page defines this once.

## Scope

### Built in this iteration:

1. `UsageGuideline` type in `types.ts`
2. `UsageGuidelinesSection` component (new file)
3. Updated `ComponentPageTemplate` with backward-compatible dual rendering
4. Migrate **radio** component end-to-end as proof of pattern

### Follow-up work:

- Migrate remaining 9 component pages
- Update `flxds_page` skill and `page-conventions.md` reference
- Remove old fields from `ComponentSpec` and deprecated `useCases` prop from template
- Update CLAUDE.md

## Migration Path

1. Template accepts both old and new props — build never breaks.
2. Migrate one page at a time: add `usageGuidelines` to spec, add `renderGuidelinePreview` to page, remove old `useCases` JSX.
3. Suggested order: radio (clean test, 10 use cases) → input-field (has manual cards) → rest.
4. Once all pages migrated: remove old fields from `ComponentSpec`, remove `useCases` prop and fallback rendering from template.
