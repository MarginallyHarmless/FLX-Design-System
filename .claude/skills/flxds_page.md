---
name: flxds_page
description: >
  Create or edit a FlowX design system documentation page for a component.
  Use when: creating a component page, editing a component page, adding a page,
  updating a page, building the docs page, "create page", "edit page",
  "ds page", "design system page", "update the page", "rebuild page",
  or any task involving creating/modifying files under src/app/components/
  or working with the ComponentPageTemplate, component preview, or design system website.
---

Create or edit a FlowX design system documentation page for a component. Auto-detects create vs. edit mode with smart editing that preserves unchanged content.

## Step 1: Detect Mode

**If slug provided as argument:**
1. Verify data file exists at `src/lib/components-data/[slug].ts`. If not, tell user to run `flxds_extract` first and stop.
2. Verify component is registered in `src/lib/components-data/registry.ts`. If not, tell user to run `flxds_extract` first and stop.
3. Check if page exists at `src/app/components/[slug]/page.tsx`.

**If no slug provided:**
1. Read `src/lib/components-data/registry.ts` to get all registered component slugs.
2. Glob `src/app/components/*/page.tsx` to find existing pages.
3. List components with data but no page (CREATE candidates).
4. List components where data file is newer than page file (EDIT candidates -- note: timestamps are hints, auto-formatting can cause false positives).
5. Present findings and ask user which to work on.

## Step 2: Determine Action

- No page exists -> CREATE mode.
- Page exists -> EDIT mode.

## Step 3: Create Mode

Read `.claude/skills/references/page-conventions.md` for all conventions.

1. Read the spec data file at `src/lib/components-data/[slug].ts`.
2. Check if spec has `variantStyles` populated:
   - **Yes** -> Build data-driven `FlowX[Name]` preview component using variant-style-helpers (`findVariantStyle`, `buildElementStyle`, `getTextColor`, `getElementTypography`, `isElementVisible`). Zero hardcoded hex values.
   - **No (legacy spec)** -> Build preview with inline style logic following existing component patterns.
3. Import shared sub-components (`FlowXLabel`, `FlowXDescription`, `FlowXErrorIcon` from `@/components/docs/shared-elements`) where the component's elements indicate label/description/error layers. Never re-implement these inline.
4. Build tokens array from `spec.tokenBindings` (see token array construction in page-conventions.md).
5. Build interactive controls from `spec.props` for `ComponentPreview`.
6. Build use cases grid from `spec.variants`.
8. Build states reference from `spec.states`.
9. Build sizes reference from `spec.sizes`.
10. Build "Considerations" section — only if the component has real edge cases. Omit if nothing non-obvious (see page-conventions.md §9).
11. Build "Real Examples" section — 2–3 product screenshots with context annotations. Skip if no product screenshots are available yet; can be added later.
12. Build "Known Exceptions" section — list any intentional deviations in the product. Omit if none known.
13. Build "Decision Log" section — source from Slack (`design_topics` skill), Figma version history, or user input. Omit if no decisions are known yet.
14. Assemble page using `ComponentPageTemplate`.
15. If Vibma MCP is connected, export a Figma screenshot (`export_node_as_image` PNG scale:2) for visual comparison.
16. Verify: `npm run build`.

## Step 4: Edit Mode (Smart Diff + Guided Edit)

Read `.claude/skills/references/page-conventions.md` for all conventions.

1. Read current page file at `src/app/components/[slug]/page.tsx`.
2. Read current spec data file at `src/lib/components-data/[slug].ts`.
3. Analyze what the page currently renders by reading its source:
   - Which props are in the controls array?
   - Which variants are in the use cases grid?
   - Which states/sizes are rendered?
   - How is the preview component structured?
4. Compare against current spec data to identify gaps:
   - New variants in spec not in grid -> add them.
   - Removed variants -> remove from grid.
   - New/removed props -> update controls.
   - New/removed states/sizes -> update sections.
   - Changed tokenBindings -> update tokens array.
   - Changed elements/variantStyles -> assess preview impact.
   - Missing "When to Use" / "Considerations" / "Real Examples" / "Known Exceptions" / "Decision Log" -> add if content is available and non-trivial (see page-conventions.md §9 for inclusion criteria).
5. Categorize changes:
   - **Data-driven** (colors, token values in variantStyles): no page edit needed -- helpers pick up automatically.
   - **Structural** (new elements, new toggleable props, removed parts): make targeted edits to preview component.
6. For legacy pages (hardcoded colors, no variant-style-helpers):
   - Minor edits -> match existing pattern.
   - Substantial edits -> consider migrating to data-driven pattern.
7. Preserve everything that didn't change.
8. If Vibma MCP connected, export screenshot for comparison.
9. Verify: `npm run build`.

## Step 5: Final Verification

- Build passes (`npm run build`).
- Route resolves (`/components/[slug]`).
- Component appears in sidebar nav and `/components` index.
- Visual comparison: preview vs Figma screenshot. If mismatch, re-query Figma for the specific element and fix.

## Failure Modes

| Failure | Detection | Action |
|---------|-----------|--------|
| Data file missing | File not found | Tell user to run `flxds_extract` first, stop |
| Not in registry | Slug not in registry.ts | Tell user to run `flxds_extract` first, stop |
| `npm run build` fails | Non-zero exit | Read error, fix (usually TS/import), rebuild |
| No variantStyles (legacy) | Field undefined/empty | Use inline style logic pattern |
| Vibma MCP not connected | export_node_as_image fails | Skip screenshot, warn user to verify in browser |

## Skill Chaining & Disambiguation

If both extraction and page creation are needed (e.g., "extract and create page"), run `flxds_extract` first to completion, then `flxds_page`.

Disambiguation:
- "add component from Figma" / "extract and create" -> chain both (extract first).
- Phrases about Figma data/properties/variants/tokens -> `flxds_extract` only.
- Phrases about the page/website/docs/preview -> `flxds_page` only.
- When in doubt, ask user.

## Output

Report: page created or edited, build status, visual comparison result. Git commit is left to the user.
