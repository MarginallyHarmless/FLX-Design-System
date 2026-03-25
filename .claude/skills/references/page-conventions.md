# Page Conventions Reference

## 1. Page Section Order

Every component page uses `ComponentPageTemplate` (import from `@/components/docs/component-page-template`):

```
StatusBanner -> Title + Description -> <hr> ->
Interactive Preview -> <hr> -> Use Cases (grid) -> <hr> ->
States Reference -> <hr> -> Sizes -> <hr> ->
Usage Guidelines (DosAndDonts) -> <hr> -> Considerations -> <hr> ->
Props (PropsTable) -> <hr> -> Anatomy (AnatomyDiagram) -> <hr> ->
Real Examples -> <hr> -> Accessibility -> <hr> ->
Design Tokens (TokenTable) -> <hr> -> Known Exceptions -> <hr> ->
Decision Log -> <hr> -> Related Components
```

Separator: `<hr style={{ borderColor: "#f7f8f9" }} />`

Each section gracefully hides if its `ComponentSpec` field is undefined.

## 2. ComponentPageTemplate Props

```tsx
interface ComponentPageTemplateProps {
  spec: ComponentSpec;
  tokens: { name: string; value: string; preview: ReactNode }[];
  interactivePreview: ReactNode;
  useCases: ReactNode;
  statesReference: ReactNode;
  sizes: ReactNode;
}
```

The new guidance sections (When to Use, Considerations, Real Examples, Known Exceptions, Decision Log) are read directly from `ComponentSpec` fields — no extra props needed. They auto-hide when their field is `undefined`.

Imports:
```tsx
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
```

## 3. Styling Conventions

- **Use case cards**: `backgroundColor: "#f7f8f9"`, no borders. Inverted variants: `className="bg-neutral-900 text-white"`. Title: `text-sm font-medium`. UseCase: `text-xs text-muted-foreground`. Both below the preview.
- **States/Sizes sections**: label text below component preview, not above.
- **All pages**: `"use client";` directive at top.

## 4. Shared Sub-Components

Import from `@/components/docs/shared-elements`:

| Component | Props | Use When |
|-----------|-------|----------|
| `FlowXLabel` | `label`, `size` ("small"\|"medium"), `inverted`, `disabled`, `showInfo`, `hasLabel` | Component has label text above it |
| `FlowXDescription` | `text`, `state` ("default"\|"error"\|"disabled"\|"focused"), `inverted`, `visible` | Component has helper/error text below it |
| `FlowXErrorIcon` | `size` (default 16) | Error state warning icon |
| `FlowXTooltip` | `text`, `useCase` ("default"\|"error"), `inverted` | Tooltip display |

**Rule**: If you find yourself writing `getLabelColor()`, inline label spans with hardcoded colors, inline error SVGs, or inline description text -- STOP and use the shared component.

## 5. Variant-Style-Helpers API

Import from `@/lib/components-data/variant-style-helpers`:

| Function | Signature | Returns |
|----------|-----------|---------|
| `findVariantStyle` | `(spec, props)` | `VariantStyle` matching variant props |
| `getElementSpec` | `(spec, part)` | `ElementSpec` (layout/dimensions/typography) |
| `getElementStyle` | `(spec, props, part)` | `ElementStyle` (fill/stroke/color for variant) |
| `buildElementStyle` | `(spec, props, part)` | `React.CSSProperties` (layout + variant combined) |
| `getTextColor` | `(spec, props, part)` | Text color hex string |
| `getElementTypography` | `(spec, props, part)` | `{ fontSize?, lineHeight?, fontWeight? }` with variant overrides falling back to base |
| `isElementVisible` | `(spec, props, part)` | Boolean visibility for toggleable elements |

Usage pattern:
```tsx
const variantProps = { State: "Default", Size: "Medium", Inverted: "Off" };
const containerStyle = getElementStyle(spec, variantProps, "Container");
const labelColor = getTextColor(spec, variantProps, "Label");
const labelTypo = getElementTypography(spec, variantProps, "Label");
const iconVisible = isElementVisible(spec, variantProps, "LeadingIcon");
```

## 6. Token Array Construction

Transform `spec.tokenBindings` into the `tokens` prop:

```tsx
const tokens = spec.tokenBindings
  ? [...new Map(spec.tokenBindings.map(b => [
      b.variableName,
      {
        name: `${b.variableName} (${b.resolvedValue})`,
        value: `${b.element} -> ${b.property}`,
        preview: <div style={{
          width: 20, height: 20, borderRadius: 4,
          backgroundColor: b.resolvedValue.startsWith("#") ? b.resolvedValue : undefined,
          border: !b.resolvedValue.startsWith("#") ? "2px solid #cbd1db" : undefined
        }} />,
      }
    ])).values()]
  : [];
```

Deduplicate by `variableName`. Non-color tokens (spacing, radius) show a bordered box instead of a color swatch.

## 7. Preview Component Rules

**When spec has `variantStyles` (all new pages):**
- Zero hardcoded hex values -- all colors/typography from variant-style-helpers
- Map component props to Figma axis names in a `variantProps` object
- Wrapper: `style={{ fontFamily: "var(--font-flowx)" }}`
- If you catch yourself writing `inverted ? "#xxx" : "#yyy"`, that value belongs in `variantStyles`

**When spec has NO `variantStyles` (legacy):**
- Use inline style logic matching existing component patterns
- Hardcoded hex values are acceptable for legacy previews

## 8. Legacy Page Handling

Some existing pages (e.g., checkbox) use hardcoded hex values instead of variant-style-helpers. When editing:
- **Minor edits**: match the existing pattern (hardcoded hex)
- **Substantial edits**: consider migrating to data-driven pattern
- **All NEW pages**: must use variant-style-helpers

## 9. New Guidance Sections

### Considerations

Placed after Usage Guidelines (DosAndDonts). **Only include this section if the component has edge cases someone would realistically get wrong or overlook.** Rules:
- Skip considerations that restate general best practices or feel like common sense.
- Format: "When [specific condition] → [concrete action]."
- Aim for 3–5 maximum.
- If you're struggling to fill them, omit the section entirely — pass `undefined` so `ComponentPageTemplate` hides it. An empty considerations section is worse than none.

### Real Examples

Placed after Considerations. Shows 2–3 screenshots of this component as it actually appears in the product. Rules:
- Annotate **context**, not the component itself: why this variation, why here, what surrounds it.
- Skip screens where usage is straightforward.
- Prioritize examples that would be hard to infer from the guidelines alone.
- Screenshots should be actual product screens, not fabricated.

### Known Exceptions

Placed after Design Tokens. Lists places in the product where this component is intentionally used outside the standard guidelines. Rules:
- For each entry: name the location and the reason.
- This section exists to prevent exceptions from becoming precedent — if it's not listed here, it's not an approved exception.
- If there are no known exceptions, omit the section (pass `undefined`).

### Decision Log

Placed last (before Related Components). A running list of meaningful decisions made about this component. Rules:
- Each entry: date, decision, reasoning. Keep it brief.
- Only include things that were debated, changed, or explicitly ruled out.
- The goal is to prevent the same conversations from happening twice.
- Source decisions from Slack (#experience_labs via `design_topics` skill), Figma version history, or user input.
- If no decisions are known yet, omit the section (pass `undefined`).

## 10. Reference Pages

Use these existing pages as examples when creating new ones:
- **Input Field** (`src/app/components/input-field/page.tsx`) -- primary reference for data-driven preview with variant-style-helpers
- **Radio** (`src/app/components/radio/page.tsx`) -- segment controller previews, borderless variant cards
- **Select Field** (`src/app/components/select-field/page.tsx`) -- complex toggleable elements, latest component
