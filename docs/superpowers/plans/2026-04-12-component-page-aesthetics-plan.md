# Component Page Aesthetics Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Introduce a three-tier visual hierarchy to component documentation pages — elevated hero preview, soft card-wrapped core content, and lightweight reference sections — replacing the current flat, uniformly-spaced layout.

**Architecture:** Restructure the `ComponentPageTemplate` layout from a single `space-y-10` list into three visually distinct tiers with different spacing, card treatments, and heading weights. Elevate the `ComponentPreview` canvas with more padding, shadow, and refined border radius. Remove all HR separators.

**Tech Stack:** React, Tailwind CSS v4, Next.js 16

**Spec:** `docs/superpowers/specs/2026-04-12-component-page-aesthetics-design.md`

**Base path:** All relative paths like `flowx-design-system/...` are relative to `/Users/bogdandraghici/Desktop/vibes/FLX DS/`.

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `flowx-design-system/src/components/docs/component-preview.tsx` | Elevate canvas: larger min-height, shadow, rounded-xl, remove footer |
| Modify | `flowx-design-system/src/components/docs/component-page-template.tsx` | Tiered layout, remove separators, card wrappers for tier 2, muted tier 3 headings |

---

### Task 1: Elevate ComponentPreview

**Files:**
- Modify: `flowx-design-system/src/components/docs/component-preview.tsx`

- [ ] **Step 1: Update the outer container**

Change line 111 from:
```tsx
    <div className="rounded-lg border bg-card text-card-foreground">
```
to:
```tsx
    <div className="rounded-xl border border-neutral-100 bg-card text-card-foreground shadow-sm dark:border-neutral-800">
```

- [ ] **Step 2: Update the canvas area**

Change line 113-114 from:
```tsx
        className="flex min-h-[200px] items-center justify-center rounded-t-lg border-b p-8 transition-colors duration-200"
```
to:
```tsx
        className="flex min-h-[280px] items-center justify-center rounded-t-xl p-10 transition-colors duration-200"
```

Note: removed `border-b` (will add it back on the controls bar instead), changed `rounded-t-lg` to `rounded-t-xl` to match outer container, increased padding from `p-8` to `p-10`, increased min-height from 200px to 280px.

- [ ] **Step 3: Update the dark mode canvas border**

Change lines 116-118 from:
```tsx
        style={{
          fontFamily: "var(--font-flowx)",
          backgroundColor: values.inverted ? "#1a1f27" : "#f7f8f9",
        }}
```
to:
```tsx
        style={{
          fontFamily: "var(--font-flowx)",
          backgroundColor: values.inverted ? "#1a1f27" : "#f7f8f9",
          borderBottom: "1px solid",
          borderBottomColor: values.inverted ? "#374151" : "#f0f1f3",
        }}
```

This adds a subtle bottom border between canvas and controls, with a lighter dark-mode border for definition.

- [ ] **Step 4: Update the controls bar**

Change line 133 from:
```tsx
        <div className="flex flex-wrap items-start gap-6 px-4 py-4">
```
to:
```tsx
        <div className="flex flex-wrap items-start gap-6 px-5 py-4">
```

Slightly more horizontal padding to match the elevated feel.

- [ ] **Step 5: Update segment control pill styling**

In the `SegmentControl` component, change the button style (lines 61-75) from:
```tsx
            style={{
              padding: "5px 14px",
              borderRadius: 6,
              border: "none",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#1d232c" : "#64748b",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              boxShadow: isActive
                ? "0 1px 2px rgba(0,0,0,0.08)"
                : "none",
              cursor: disabled ? "default" : "pointer",
              transition: "all 0.15s ease",
              lineHeight: "20px",
              whiteSpace: "nowrap",
            }}
```
to:
```tsx
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#1d232c" : "#64748b",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              boxShadow: isActive
                ? "0 1px 3px rgba(0,0,0,0.08)"
                : "none",
              cursor: disabled ? "default" : "pointer",
              transition: "all 0.15s ease",
              lineHeight: "20px",
              whiteSpace: "nowrap",
            }}
```

Changes: padding `5px 14px` → `6px 16px`, borderRadius `6` → `8`, boxShadow slightly larger `2px` → `3px`.

- [ ] **Step 6: Remove the emoji footer**

Remove the entire footer section (lines 206-216):
```tsx
      {/* Footer */}
      <div className="flex items-center gap-1.5 rounded-b-lg px-4 py-2 text-xs text-muted-foreground" style={{ backgroundColor: "#f7f8f9" }}>
        📐 Design reference
        <Tooltip>
          <TooltipTrigger className="cursor-help">
            <Info size={14} className="text-muted-foreground/60" />
          </TooltipTrigger>
          <TooltipContent side="top">
            Design references showing the intended look and behavior of each component. The actual codebase implementation may not yet match these specs 1:1.
          </TooltipContent>
        </Tooltip>
      </div>
```

Also remove the now-unused imports at the top of the file. Remove `Info` from the phosphor import (line 4) and remove the Tooltip imports (line 6):
```tsx
import { Info } from "@phosphor-icons/react";
```
→ remove this line entirely.

```tsx
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
```
→ remove this line entirely.

Update the outer container closing `rounded-b-lg` is no longer needed since the footer was there. The controls bar is now the bottom — update it to have `rounded-b-xl`:

Change the controls bar className (from step 4) to:
```tsx
        <div className="flex flex-wrap items-start gap-6 rounded-b-xl px-5 py-4">
```

- [ ] **Step 7: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes with all 24 pages.

---

### Task 2: Restructure ComponentPageTemplate into tiered layout

**Files:**
- Modify: `flowx-design-system/src/components/docs/component-page-template.tsx`

- [ ] **Step 1: Remove the separator constant and all separator usage**

Delete line 12:
```tsx
const separator = <hr style={{ borderColor: "#f7f8f9" }} />;
```

Then remove every `{separator}` reference throughout the file. There are approximately 10 instances. Remove all of them.

- [ ] **Step 2: Create a tier-aware CollapsibleSection**

Replace the existing `CollapsibleSection` (lines 14-26) with a version that supports tier styling:

```tsx
function CollapsibleSection({
  title,
  defaultOpen = true,
  tier = 2,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  tier?: 1 | 2 | 3;
  children: ReactNode;
}) {
  const headingClass = tier === 3
    ? "text-xl font-semibold text-muted-foreground"
    : "text-xl font-semibold";

  const content = (
    <details className="group" open={defaultOpen || undefined}>
      <summary className={`cursor-pointer list-none ${headingClass} [&::-webkit-details-marker]:hidden`}>
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground transition-transform group-open:rotate-90">▸</span>
          {title}
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );

  if (tier === 2) {
    return (
      <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-neutral-800 dark:bg-neutral-900/50">
        {content}
      </div>
    );
  }

  return content;
}
```

- [ ] **Step 3: Replace the outer div and restructure into tiers**

Replace the entire return block of `ComponentPageTemplate` (lines 49-322) with the tiered structure:

```tsx
  return (
    <div>
      {/* ===== TIER 1: Hero ===== */}
      <div>
        {/* Title + Status + Description */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
          <div className="mt-3">
            <StatusBanner
              name={spec.name}
              status={spec.status}
              figmaLink={spec.figmaLink}
              lastUpdated={spec.lastUpdated}
            />
          </div>
          <p className="mt-3 text-lg text-muted-foreground">
            {spec.description}
          </p>
        </div>

        {/* Interactive Preview */}
        <div className="mt-8">
          <CollapsibleSection title="Interactive Preview" tier={1}>
            {interactivePreview}
          </CollapsibleSection>
        </div>
      </div>

      {/* ===== TIER 2: Core Content ===== */}
      <div className="mt-16 flex flex-col gap-12">
        {/* Usage Guidelines (new) or Use Cases (legacy) */}
        {spec.usageGuidelines && spec.usageGuidelines.length > 0 && renderGuidelinePreview ? (
          <CollapsibleSection title="Usage Guidelines" tier={2}>
            <UsageGuidelinesSection
              guidelines={spec.usageGuidelines}
              renderPreview={renderGuidelinePreview}
              previewWidth={guidelinePreviewWidth}
            />
          </CollapsibleSection>
        ) : spec.variants && spec.variants.length > 0 && useCases ? (
          <CollapsibleSection title="Use Cases" tier={2}>
            {useCases}
          </CollapsibleSection>
        ) : null}

        {/* States Reference */}
        {spec.states && spec.states.length > 0 && (
          <CollapsibleSection title="States Reference" tier={2}>
            {statesReference}
          </CollapsibleSection>
        )}

        {/* Sizes */}
        {spec.sizes && spec.sizes.length > 0 && (
          <CollapsibleSection title="Sizes" tier={2}>
            {sizes}
          </CollapsibleSection>
        )}
      </div>

      {/* ===== TIER 3: Reference ===== */}
      <div className="mt-12 flex flex-col gap-8">
        {/* Tier divider */}
        <div className="border-t border-neutral-100 dark:border-neutral-800" />

        {/* Considerations */}
        {spec.considerations && spec.considerations.length > 0 && (
          <CollapsibleSection title="Considerations" tier={3} defaultOpen={false}>
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
        )}

        {/* Props Table */}
        {spec.props && spec.props.length > 0 && (
          <CollapsibleSection title="Props" tier={3} defaultOpen={false}>
            <PropsTable props={spec.props} />
          </CollapsibleSection>
        )}

        {/* Anatomy Diagram */}
        {spec.anatomy && spec.anatomy.length > 0 && (
          <CollapsibleSection title="Anatomy" tier={3} defaultOpen={false}>
            <AnatomyDiagram anatomy={spec.anatomy} />
          </CollapsibleSection>
        )}

        {/* Real Examples */}
        {spec.realExamples && spec.realExamples.length > 0 && (
          <CollapsibleSection title="Real Examples" tier={3} defaultOpen={false}>
            <div className="space-y-6">
              {spec.realExamples.map((example, i) => (
                <div key={i} className="space-y-2">
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={example.src}
                      alt={example.alt}
                      width={800}
                      height={450}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {example.annotation}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Accessibility */}
        {spec.accessibility && (
          <CollapsibleSection title="Accessibility" tier={3} defaultOpen={false}>
            <div className="space-y-4 rounded-lg border p-6">
              {spec.accessibility.role && (
                <div>
                  <h3 className="text-sm font-semibold">Role</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                      {spec.accessibility.role}
                    </code>
                  </p>
                </div>
              )}

              {spec.accessibility.keyboard &&
                spec.accessibility.keyboard.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold">
                      Keyboard Interactions
                    </h3>
                    <ul className="mt-2 space-y-1.5">
                      {spec.accessibility.keyboard.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <kbd className="mt-0.5 shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                            {item.split(" — ")[0]}
                          </kbd>
                          <span>{item.split(" — ")[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {spec.accessibility.ariaAttributes &&
                spec.accessibility.ariaAttributes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold">ARIA Attributes</h3>
                    <ul className="mt-2 space-y-1.5">
                      {spec.accessibility.ariaAttributes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                            {item.split(" — ")[0]}
                          </code>
                          <span>{item.split(" — ")[1]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </CollapsibleSection>
        )}

        {/* Design Tokens */}
        {tokens && tokens.length > 0 && (
          <CollapsibleSection title="Design Tokens Used" tier={3} defaultOpen={false}>
            <TokenTable tokens={tokens} />
          </CollapsibleSection>
        )}

        {/* Known Exceptions */}
        {spec.knownExceptions && spec.knownExceptions.length > 0 && (
          <CollapsibleSection title="Known Exceptions" tier={3} defaultOpen={false}>
            <div className="space-y-3">
              {spec.knownExceptions.map((item, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{item.location}</span>
                  <span className="text-muted-foreground"> — {item.reason}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {/* Decision Log */}
        {spec.decisionLog && spec.decisionLog.length > 0 && (
          <CollapsibleSection title="Decision Log" tier={3} defaultOpen={false}>
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
        )}

        {/* Related Components */}
        {spec.relatedComponents && spec.relatedComponents.length > 0 && (
          <CollapsibleSection title="Related Components" tier={3}>
            <div className="flex flex-wrap gap-2">
              {spec.relatedComponents.map((slug) => {
                const related = getComponent(slug);
                return related ? (
                  <Link
                    key={slug}
                    href={`/components/${slug}`}
                    className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    {related.name}
                  </Link>
                ) : (
                  <span
                    key={slug}
                    className="inline-flex items-center rounded-lg border border-dashed px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    {slug}
                    <span className="ml-1.5 text-[10px] uppercase opacity-60">
                      planned
                    </span>
                  </span>
                );
              })}
            </div>
          </CollapsibleSection>
        )}
      </div>
    </div>
  );
```

- [ ] **Step 4: Verify build**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run build
```

Expected: Build passes with all 24 pages.

- [ ] **Step 5: Verify in browser**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS/flowx-design-system" && npm run dev
```

Open `http://localhost:3000/components/radio` and verify:

1. **Tier 1:** Title area has more breathing room (mt-3 gaps). Preview canvas is taller with shadow and rounded-xl. No emoji footer. Controls have subtle top border separator.
2. **Tier 2:** Usage Guidelines, States Reference, and Sizes each wrapped in soft white cards with subtle shadow and rounded-xl.
3. **Tier 3:** Props, Anatomy, Accessibility, Tokens, Related Components all collapsed by default with muted heading color. Single thin divider above them.
4. **No HR separators** anywhere on the page.
5. **Spacing:** Generous gap between tier 1→2 (4rem), comfortable gap between tier 2 sections (3rem), tighter gap between tier 3 sections (2rem).
6. Check at least one more page (e.g., `/components/button`) to verify consistency.
7. Check dark mode — cards should have dark background, preview border should be visible.

---

## Acceptance Checklist

- [ ] `ComponentPreview` canvas min-height is 280px with `p-10` padding
- [ ] `ComponentPreview` has `shadow-sm`, `rounded-xl`, `border-neutral-100` styling
- [ ] Segment control pills have `6px 16px` padding and `borderRadius: 8`
- [ ] Emoji footer removed from `ComponentPreview`
- [ ] Canvas has subtle bottom border separating it from controls
- [ ] Dark mode canvas border uses `#374151` for definition
- [ ] All `<hr>` separators removed from template
- [ ] `separator` constant removed
- [ ] Tier 2 sections (Usage Guidelines, States, Sizes) wrapped in card with `rounded-xl`, `shadow-[0_1px_3px_rgba(0,0,0,0.04)]`, `border-neutral-100`, `bg-white`, `p-6`
- [ ] Tier 3 section headings use `text-muted-foreground`
- [ ] Tier 3 sections all `defaultOpen={false}`
- [ ] Single `border-t` divider between tier 2 and tier 3
- [ ] Tier spacing: 4rem (tier 1→2), 3rem within tier 2, 3rem (tier 2→3), 2rem within tier 3
- [ ] `npm run build` passes
- [ ] Visual check in browser confirms tiered hierarchy
