# Usage Guidelines Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace five scattered documentation sections (Use Cases, Do/Don't, Considerations, Known Exceptions, Decision Log) with a single unified "Usage Guidelines" section using a horizontal preview/illustration + text layout.

**Architecture:** Add a `UsageGuideline` discriminated union type to the data model, create a new `UsageGuidelinesSection` rendering component, update `ComponentPageTemplate` with backward-compatible dual rendering, and migrate the radio component page as proof of pattern.

**Tech Stack:** TypeScript, React 19, Next.js 16, Tailwind CSS v4, Phosphor Icons

**Spec:** `docs/superpowers/specs/2026-04-12-usage-guidelines-redesign-design.md`

**Base path:** All relative paths like `flowx-design-system/...` are relative to `/Users/bogdandraghici/Desktop/vibes/FLX DS/`.

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `flowx-design-system/src/lib/components-data/types.ts` | Add `UsageGuideline` type and `usageGuidelines` field to `ComponentSpec` |
| Create | `flowx-design-system/src/components/docs/usage-guidelines-section.tsx` | New component: renders the unified guidelines list with horizontal layout |
| Modify | `flowx-design-system/src/components/docs/component-page-template.tsx` | Add `renderGuidelinePreview` prop, integrate new section, keep backward compat |
| Modify | `flowx-design-system/src/lib/components-data/radio-v3.ts` | Add `usageGuidelines` array to radio spec |
| Modify | `flowx-design-system/src/app/components/radio/page.tsx` | Add `renderGuidelinePreview` callback, remove old `useCases` JSX |

---

### Task 1: Add UsageGuideline type to data model

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/types.ts`

- [ ] **Step 1: Add the UsageGuideline type**

Add the following above the `ComponentSpec` interface in `types.ts` (after the `TokenBinding` interface, before `ComponentSpec`):

```ts
export type UsageGuideline =
  | { type: "use-case"; title: string; description: string; props: Record<string, string> }
  | { type: "do"; title: string; description: string }
  | { type: "dont"; title: string; description: string }
  | { type: "decision"; title: string; description: string; date?: string }
  | { type: "exception"; title: string; description: string }
  | { type: "info"; title: string; description: string };
```

- [ ] **Step 2: Add the field to ComponentSpec**

Add `usageGuidelines` as an optional field to the `ComponentSpec` interface. Insert it after the `tokenBindings` field (line ~108, after `tokenBindings?: TokenBinding[];`):

```ts
  usageGuidelines?: UsageGuideline[];
```

- [ ] **Step 3: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes. All existing code compiles since the new field is optional.

- [ ] **Step 4: Commit**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS" && git add flowx-design-system/src/lib/components-data/types.ts && git commit -m "feat: add UsageGuideline type and field to ComponentSpec"
```

---

### Task 2: Create UsageGuidelinesSection component

**Files:**
- Create: `flowx-design-system/src/components/docs/usage-guidelines-section.tsx`

- [ ] **Step 1: Create the component file**

Create `flowx-design-system/src/components/docs/usage-guidelines-section.tsx` with the following content:

```tsx
import type { ReactNode } from "react";
import { Check, X, Lightbulb, Warning, Info } from "@phosphor-icons/react";
import type { UsageGuideline } from "@/lib/components-data/types";

const illustrationConfig: Record<string, { bg: string; color: string; Icon: typeof Check }> = {
  do:        { bg: "var(--flowx-green-50, #e6f2ef)",  color: "var(--flowx-green-500, #008060)",  Icon: Check },
  dont:      { bg: "var(--flowx-red-50, #fde9e6)",    color: "var(--flowx-red-500, #e62200)",    Icon: X },
  decision:  { bg: "var(--flowx-blue-50, #e6f0fb)",   color: "var(--flowx-blue-500, #006bd8)",   Icon: Lightbulb },
  exception: { bg: "var(--flowx-yellow-50, #fff8e7)", color: "var(--flowx-yellow-500, #feb913)", Icon: Warning },
  info:      { bg: "#f7f8f9",                          color: "#64748b",                          Icon: Info },
};

function IllustrationPanel({ type }: { type: string }) {
  const config = illustrationConfig[type];
  if (!config) return null;
  const { bg, color, Icon } = config;

  return (
    <div
      className="flex items-center justify-center rounded-lg p-6"
      style={{ backgroundColor: bg, minHeight: 80 }}
    >
      <Icon size={24} style={{ color }} />
    </div>
  );
}

function GuidelineRow({
  item,
  renderPreview,
  isLast,
}: {
  item: UsageGuideline;
  renderPreview: (props: Record<string, string>) => ReactNode;
  isLast: boolean;
}) {
  const isUseCase = item.type === "use-case";

  return (
    <div
      className={`flex flex-col gap-4 py-6 sm:flex-row ${isLast ? "" : "border-b"}`}
      style={isLast ? undefined : { borderColor: "#f7f8f9" }}
    >
      {/* Left column */}
      <div className="shrink-0 sm:w-2/5">
        {isUseCase ? (
          <div
            className={`flex items-center justify-center rounded-lg p-6 ${
              item.props.inverted === "on" ? "bg-neutral-900" : ""
            }`}
            style={item.props.inverted !== "on" ? { backgroundColor: "#f7f8f9" } : undefined}
          >
            {renderPreview(item.props)}
          </div>
        ) : (
          <IllustrationPanel type={item.type} />
        )}
      </div>

      {/* Right column */}
      <div className="flex flex-col justify-center gap-1">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        {item.type === "decision" && "date" in item && item.date && (
          <span className="mt-1 font-mono text-xs text-muted-foreground">{item.date}</span>
        )}
      </div>
    </div>
  );
}

interface UsageGuidelinesSectionProps {
  guidelines: UsageGuideline[];
  renderPreview: (props: Record<string, string>) => ReactNode;
}

export function UsageGuidelinesSection({ guidelines, renderPreview }: UsageGuidelinesSectionProps) {
  if (!guidelines || guidelines.length === 0) return null;

  return (
    <div>
      {guidelines.map((item, i) => (
        <GuidelineRow
          key={`${item.type}-${item.title}-${i}`}
          item={item}
          renderPreview={renderPreview}
          isLast={i === guidelines.length - 1}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes. The component isn't imported anywhere yet, but should compile cleanly.

- [ ] **Step 3: Commit**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS" && git add flowx-design-system/src/components/docs/usage-guidelines-section.tsx && git commit -m "feat: add UsageGuidelinesSection component"
```

---

### Task 3: Update ComponentPageTemplate with backward-compatible dual rendering

**Files:**
- Modify: `flowx-design-system/src/components/docs/component-page-template.tsx`

- [ ] **Step 1: Add import for the new component**

Add this import at the top of the file, after the existing imports (after line 10):

```tsx
import { UsageGuidelinesSection } from "@/components/docs/usage-guidelines-section";
```

- [ ] **Step 2: Update the props interface**

Replace the existing `ComponentPageTemplateProps` interface (lines 28-35) with:

```tsx
interface ComponentPageTemplateProps {
  spec: ComponentSpec;
  tokens: { name: string; value: string; preview: ReactNode }[];
  interactivePreview: ReactNode;
  renderGuidelinePreview?: (props: Record<string, string>) => ReactNode;
  useCases?: ReactNode;
  statesReference: ReactNode;
  sizes: ReactNode;
}
```

- [ ] **Step 3: Add renderGuidelinePreview to the destructured props**

Update the function signature (lines 37-43) to include `renderGuidelinePreview`:

```tsx
export function ComponentPageTemplate({
  spec,
  tokens,
  interactivePreview,
  renderGuidelinePreview,
  useCases,
  statesReference,
  sizes,
}: ComponentPageTemplateProps) {
```

- [ ] **Step 4: Replace the Use Cases section with dual rendering**

Replace the existing Use Cases section (lines 72-78, the block starting with `{/* 4. Use Cases */}`) with:

```tsx
      {/* 4. Usage Guidelines (new) or Use Cases (legacy) */}
      {spec.usageGuidelines && spec.usageGuidelines.length > 0 && renderGuidelinePreview ? (
        <CollapsibleSection title="Usage Guidelines">
          <UsageGuidelinesSection
            guidelines={spec.usageGuidelines}
            renderPreview={renderGuidelinePreview}
          />
        </CollapsibleSection>
      ) : spec.variants && spec.variants.length > 0 && useCases ? (
        <CollapsibleSection title="Use Cases">
          {useCases}
        </CollapsibleSection>
      ) : null}
```

- [ ] **Step 5: Wrap old guideline sections in a legacy guard**

The old standalone sections (Usage Guidelines/DosAndDonts, Considerations, Known Exceptions, Decision Log) should only render when `usageGuidelines` is NOT present. Wrap each of these sections with an outer condition.

Find the Usage Guidelines section (line ~99, `{/* 7. Usage Guidelines */}`) and wrap it:

```tsx
      {!spec.usageGuidelines && spec.guidelines && (
        <CollapsibleSection title="Usage Guidelines">
          <DosAndDonts guidelines={spec.guidelines} />
        </CollapsibleSection>
      )}
```

Find the Considerations section (line ~106, `{/* 7b. Considerations */}`) and wrap it:

```tsx
      {!spec.usageGuidelines && spec.considerations && spec.considerations.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Considerations">
            <ul className="space-y-2">
              {spec.considerations.map((item, i) => {
                const sep = item.indexOf(" → ");
                return (
                  <li key={i} className="text-sm text-muted-foreground">
                    {sep !== -1 ? (
                      <>
                        <span className="font-medium text-foreground">{item.slice(0, sep)}</span>
                        {" → "}{item.slice(sep + 3)}
                      </>
                    ) : item}
                  </li>
                );
              })}
            </ul>
          </CollapsibleSection>
        </>
      )}
```

Find the Known Exceptions section (line ~247, `{/* 14. Known Exceptions */}`) and wrap it:

```tsx
      {!spec.usageGuidelines && spec.knownExceptions && spec.knownExceptions.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Known Exceptions">
            <div className="space-y-3">
              {spec.knownExceptions.map((item, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{item.location}</span>
                  <span className="text-muted-foreground"> — {item.reason}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}
```

Find the Decision Log section (line ~263, `{/* 15. Decision Log */}`) and wrap it:

```tsx
      {!spec.usageGuidelines && spec.decisionLog && spec.decisionLog.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Decision Log">
            <div className="space-y-3">
              {spec.decisionLog.map((entry, i) => (
                <div key={i} className="text-sm">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className="ml-2 font-medium">{entry.decision}</span>
                  <span className="ml-1 text-muted-foreground">
                    — {entry.reasoning}
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}
```

- [ ] **Step 6: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes. All existing pages still work because they pass `useCases` and don't have `usageGuidelines` in their specs, so they hit the legacy path.

- [ ] **Step 7: Commit**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS" && git add flowx-design-system/src/components/docs/component-page-template.tsx && git commit -m "feat: update ComponentPageTemplate with backward-compatible Usage Guidelines section"
```

---

### Task 4: Add usageGuidelines data to radio spec

**Files:**
- Modify: `flowx-design-system/src/lib/components-data/radio-v3.ts`

- [ ] **Step 1: Add the usageGuidelines array**

Add the `usageGuidelines` field to `radioV3Spec` in `radio-v3.ts`. Insert it after the `considerations` field (after line 173, before the closing `};`). This merges the existing variants, guidelines, and considerations into a single author-ordered narrative:

```ts
  usageGuidelines: [
    // --- Core use cases with previews ---
    { type: "use-case", title: "Default Unselected", description: "Standard unchecked radio, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { type: "use-case", title: "Default Selected", description: "Checked state showing the user's active selection.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { type: "do", title: "Use for mutually exclusive choices", description: "Radio buttons are for choosing exactly one option from a set. Always provide a clear, descriptive label for each option." },
    { type: "dont", title: "Don't use for multi-select", description: "Use Checkboxes instead when users can select multiple options." },
    // --- Border variants ---
    { type: "use-case", title: "Without Border", description: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { type: "use-case", title: "Selected Without Border", description: "Checked state in borderless compact layouts.", props: { selected: "on", state: "default", border: "off", inverted: "off" } },
    // --- Inverted ---
    { type: "use-case", title: "On Dark Background", description: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { type: "use-case", title: "Selected on Dark Background", description: "Checked state on dark surfaces.", props: { selected: "on", state: "default", border: "on", inverted: "on" } },
    // --- Error ---
    { type: "use-case", title: "Error Unselected", description: "Show when form validation requires a selection.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { type: "use-case", title: "Error Selected", description: "Selected but still in error — e.g. group-level validation failure.", props: { selected: "on", state: "error", border: "on", inverted: "off" } },
    { type: "do", title: "Use error state with a helper message", description: "Always pair the error state with a description explaining what needs to be corrected." },
    // --- Disabled ---
    { type: "use-case", title: "Disabled Unselected", description: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
    { type: "use-case", title: "Disabled Selected", description: "Use when showing a locked-in selection the user cannot change.", props: { selected: "on", state: "disabled", border: "on", inverted: "off" } },
    { type: "dont", title: "Don't disable without explanation", description: "If a radio option is disabled, provide a tooltip or adjacent text explaining why it's unavailable." },
    // --- Guidance ---
    { type: "do", title: "Pre-select a default when sensible", description: "Always have one option pre-selected when there's a reasonable default. This reduces friction." },
    { type: "do", title: "Group vertically for scanning", description: "Stack related radio options vertically. Horizontal layouts make it harder to associate labels with their options." },
    { type: "dont", title: "Don't use for on/off toggles", description: "Use a Switch component instead for binary on/off actions." },
    { type: "dont", title: "Don't exceed 7 options", description: "For longer option lists, use a Select Field dropdown instead. Long radio lists waste vertical space and are hard to scan." },
    // --- Considerations ---
    { type: "info", title: "Consider Segmented Button for 2–3 options", description: "When only 2–3 options exist and they act as a mode switch, Segmented Button is more compact and communicates mutual exclusivity faster." },
    { type: "info", title: "Subtitle forces border on", description: "When using the subtitle prop, the border is always shown regardless of the border prop value, matching the Checkbox behavior." },
  ],
```

- [ ] **Step 2: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes. The new field validates against the `UsageGuideline` type from Task 1.

- [ ] **Step 3: Commit**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS" && git add flowx-design-system/src/lib/components-data/radio-v3.ts && git commit -m "feat: add usageGuidelines data to radio spec"
```

---

### Task 5: Migrate radio page to use the new section

**Files:**
- Modify: `flowx-design-system/src/app/components/radio/page.tsx`

- [ ] **Step 1: Add renderGuidelinePreview prop to the template call**

In the `RadioV3Page` component, add a `renderGuidelinePreview` prop to the `ComponentPageTemplate` call. Insert it after the `interactivePreview` prop (after line 333, before the `useCases` prop):

```tsx
      renderGuidelinePreview={(props) => (
        <FlowXRadio
          selected={props.selected === "on"}
          state={(props.state as "default" | "error" | "disabled") || "default"}
          border={props.border === "on"}
          inverted={props.inverted === "on"}
        />
      )}
```

- [ ] **Step 2: Remove the old useCases prop**

Remove the entire `useCases={...}` block from the template call (lines 334-373). Since the radio spec now has `usageGuidelines`, the template will render the new section and ignore the missing `useCases` prop.

- [ ] **Step 3: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes.

- [ ] **Step 4: Verify in browser**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run dev
```

Open `http://localhost:3000/components/radio` and verify:

1. The "Usage Guidelines" section appears (not "Use Cases")
2. Use-case items show the radio preview on the left and title + description on the right
3. "Do" items show a green panel with check icon on the left
4. "Don't" items show a red panel with X icon on the left
5. "Info" items show a gray panel with info icon on the left
6. Inverted previews render on dark backgrounds
7. Items appear in the order defined in the array
8. On mobile width, layout stacks vertically
9. All other sections (Interactive Preview, States Reference, Sizes, Props, Anatomy, Accessibility, Tokens, Related Components) still render correctly
10. The old "Usage Guidelines" (Do/Don't), "Considerations" sections do NOT appear (suppressed by the `!spec.usageGuidelines` guard)

- [ ] **Step 5: Verify other pages are unaffected**

Check that at least one non-migrated page still works. Open `http://localhost:3000/components/input-field` and verify:

1. "Use Cases" section renders the old grid layout
2. "Usage Guidelines" Do/Don't section still appears
3. "Considerations" section still appears

- [ ] **Step 6: Commit**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS" && git add flowx-design-system/src/app/components/radio/page.tsx && git commit -m "feat: migrate radio page to unified Usage Guidelines section"
```

---

## Acceptance Checklist

- [ ] `UsageGuideline` type exists in `types.ts` with all 6 discriminated union members
- [ ] `usageGuidelines` is an optional field on `ComponentSpec`
- [ ] `UsageGuidelinesSection` component renders horizontal rows with preview/illustration left and text right
- [ ] `IllustrationPanel` uses FlowX color tokens for do (green), dont (red), decision (blue), exception (yellow), info (gray)
- [ ] `ComponentPageTemplate` accepts `renderGuidelinePreview` callback and renders the new section when `usageGuidelines` exists
- [ ] Template falls back to old `useCases` slot when `usageGuidelines` is absent (backward compat)
- [ ] Old standalone sections (DosAndDonts, Considerations, Known Exceptions, Decision Log) are suppressed when `usageGuidelines` is present
- [ ] Radio spec has `usageGuidelines` array with use-cases, dos, donts, and info items in author-controlled order
- [ ] Radio page provides `renderGuidelinePreview` and no longer passes `useCases`
- [ ] Radio page renders correctly in browser — all items in correct order with correct layout
- [ ] All non-migrated pages (input-field, switch, etc.) still render correctly with old sections
- [ ] `npm run build` passes with zero errors
