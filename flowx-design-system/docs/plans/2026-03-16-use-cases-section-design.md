# Replace Variants with Use Cases Section

## Problem

The "Variants" section on component pages is arbitrary and overlaps heavily with the "States" section below it. For the target audience (designers, PMs browsing the design system), the distinction is unclear and the variants don't answer the key question: "when should I use this?"

## Decision

Replace "Variants" with "Use Cases" — each card answers "when would I use this?" with a short sentence. Keep "States" as a compact supplementary reference strip.

## Audience

Designers and product managers who want to check how design components look without navigating Figma.

## Design

### Data model change

The `variants` array in `ComponentSpec` renames `description` to `useCase` (required). Each use case is a short sentence explaining *when* to use this variant.

```ts
// Before
{ name: "Error", description: "Input in error state with red border.", props: { ... } }

// After
{ name: "Error State", useCase: "Show when validation fails after form submission.", props: { ... } }
```

### Card rendering

Each Use Case card shows:
1. Component preview (top)
2. Card title — `text-sm font-medium`
3. Use case description — `text-xs text-muted-foreground`

Same grid layout and background styling as current variant cards (grey fill for normal, dark fill for inverted).

### States section

- Heading changes: "States" -> "States Reference"
- Rendering unchanged — same layout, same label-below pattern
- Positioned as supplementary visual reference, not a primary section

### What doesn't change

- Interactive Preview section
- Sizes section
- Card grid layout and card styling (backgrounds, no borders)
- All sections below States (Props, Anatomy, Guidelines, etc.)

## Migration

Each component's `variants` array needs `useCase` strings written. ~6-10 use cases per component, one sentence each. Existing `description` values are starting points but need rewriting to answer "when to use this" rather than "what this looks like."

### Components to migrate

- input-field (6 variants)
- radio-v3 (10 variants)
- checkbox (6 variants)
- button (5 variants)
- radio / radio-v2 (legacy, migrate if still active)

## Files to modify

| File | Change |
|------|--------|
| `src/lib/components-data/types.ts` | Rename `description` to `useCase` in variant type, make required |
| `src/lib/components-data/*.ts` | Rewrite variant descriptions as use cases |
| `src/app/components/*/page.tsx` | Update variant card rendering (name + useCase), rename States heading |
| `component-create.md` | Update instructions for the Use Cases section |
