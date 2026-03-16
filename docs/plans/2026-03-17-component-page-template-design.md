# Component Page Template — Design

## Problem

All 4 component pages duplicate ~60% of their JSX (identical sections for status banner, title, props table, anatomy, guidelines, accessibility, tokens, related components). Layout changes require editing every page file.

## Decision

Extract a `ComponentPageTemplate` component that owns the 7 identical sections and provides slots for the 5 custom ones.

## Design

### New file: `src/components/docs/component-page-template.tsx`

```tsx
interface ComponentPageTemplateProps {
  spec: ComponentSpec;
  tokens: { name: string; value: string; preview: ReactNode }[];
  interactivePreview: ReactNode;  // inner content only, template wraps in section + h2
  useCases: ReactNode;            // inner content only
  statesReference: ReactNode;     // inner content only
  sizes: ReactNode;               // inner content only
}
```

### What the template owns

- Section 1: Status Banner (from spec)
- Section 2: Title + Description (from spec)
- All `<hr style={{ borderColor: "#f7f8f9" }} />` separators
- Section wrapper pattern: `<section className="space-y-4"><h2>...</h2>{content}</section>`
- Section 7: Props Table (from spec.props)
- Section 8: Anatomy Diagram (from spec.anatomy)
- Section 9: Usage Guidelines (from spec.guidelines)
- Section 10: Accessibility (from spec.accessibility)
- Section 11: Design Tokens (from tokens prop)
- Section 12: Related Components (from spec.relatedComponents)

### What each page provides (slots)

- `interactivePreview` — ComponentPreview with custom controls and render function
- `useCases` — Full use case card grid with component-specific rendering
- `statesReference` — Full states layout with component-specific rendering
- `sizes` — Full sizes layout with component-specific rendering

Each slot provides only inner content. The template wraps each in `<section className="space-y-4"><h2>...</h2>{slot}</section>` with conditional rendering.

### Per-page file structure after migration

```tsx
"use client";

import { inputFieldSpec } from "@/lib/components-data/input-field";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";

function FlowXInputField({ ... }) { /* custom preview component */ }

const tokens = [ /* component-specific tokens */ ];

export default function InputFieldPage() {
  const spec = inputFieldSpec;
  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={tokens}
      interactivePreview={<ComponentPreview ... />}
      useCases={
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* component-specific card rendering */}
        </div>
      }
      statesReference={
        <div className="flex flex-wrap items-start gap-6">
          {/* component-specific state rendering */}
        </div>
      }
      sizes={
        <div className="flex flex-wrap items-end gap-6">
          {/* component-specific size rendering */}
        </div>
      }
    />
  );
}
```

### Section headings (owned by template)

| Slot | Heading |
|------|---------|
| interactivePreview | "Interactive Preview" |
| useCases | "Use Cases" |
| statesReference | "States Reference" |
| sizes | "Sizes" |

### Conditional rendering

Slots render only if provided (truthy). Spec-driven sections render only if the relevant spec field exists and is non-empty (same as today).

## Files to modify

| File | Change |
|------|--------|
| `src/components/docs/component-page-template.tsx` | Create — new shared template |
| `src/app/components/input-field/page.tsx` | Migrate to use template |
| `src/app/components/radio-v3/page.tsx` | Migrate to use template |
| `src/app/components/checkbox/page.tsx` | Migrate to use template |
| `src/app/components/button/page.tsx` | Migrate to use template |
| `component-create.md` | Update Step 5 to reference template |
