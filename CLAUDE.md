# FlowX Design System — Project Guide

## Git Policy

**Do not commit or push unless explicitly asked.** Wait for the user to tell you when to commit and when to push.

## What This Is

A **Next.js 16 design system documentation website** for FlowX. It showcases design tokens, interactive component previews, and usage guidelines. Statically exported and deployed to GitHub Pages.

- **Live site:** `https://marginallyharmless.github.io/FLX-Design-System/`
- **Repo:** `https://github.com/MarginallyHarmless/FLX-Design-System`

## Project Structure

All source code lives under `flowx-design-system/`. The root directory mirrors some files but **the build runs from `flowx-design-system/`**.

```
flowx-design-system/
  src/
    app/                          # Next.js App Router pages
      components/[slug]/page.tsx  # Component documentation pages
      foundations/                 # Colors, typography, spacing, elevation, iconography
      resources/                  # Changelog, Figma links
    components/
      ui/                         # shadcn base components
      docs/                       # Documentation components (see below)
    lib/
      components-data/            # Component specs and metadata
        types.ts                  # ComponentSpec, ElementSpec, VariantStyle, TokenBinding
        registry.ts               # Component registry (auto-populates sidebar + index)
        variant-style-helpers.ts  # Helpers for data-driven previews
        [slug].ts                 # Per-component spec files
      tokens/                     # Design token definitions (colors, typography, spacing, etc.)
  tokens.json                     # Figma-exported raw design tokens
  next.config.ts                  # Static export, basePath=/FLX-Design-System in prod
```

## Tech Stack

- **Next.js 16** (App Router, `output: "export"`) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with FlowX custom CSS variables
- **shadcn/ui** + **Base UI React** for component primitives
- **Phosphor Icons** for iconography
- **next-themes** for light/dark mode
- **class-variance-authority** for component variants

## Key Commands

```bash
cd flowx-design-system
npm run dev      # Start dev server (localhost:3000)
npm run build    # Static export to /out
npm run lint     # ESLint
```

## Critical Conventions

### Colors

**Always use FlowX CSS variables, never Tailwind defaults.** When referring to colors like "green-500", use `var(--flowx-green-500)`, not Tailwind's `green-500`. All FlowX color variables are defined in `globals.css` with the `--flowx-` prefix.

### Component Data Architecture

Each component has a **spec file** (`src/lib/components-data/[slug].ts`) that exports a `ComponentSpec` object containing:
- Metadata: `slug`, `name`, `description`, `status`, `figmaLink`
- UI structure: `variants`, `props`, `states`, `sizes`
- Figma-extracted data: `elements` (ElementSpec[]), `variantStyles` (VariantStyle[]), `tokenBindings` (TokenBinding[])
- Docs content: `anatomy`, `guidelines`, `accessibility`, `relatedComponents`

**New components must be registered** in `registry.ts` — this auto-updates the sidebar nav and index page.

### Data-Driven Preview Components

New component pages use **variant-style-helpers** to render previews from spec data. Zero hardcoded hex values in preview components.

```tsx
import { findVariantStyle, getElementSpec, getElementStyle,
  buildElementStyle, getTextColor, getElementTypography,
  isElementVisible } from "@/lib/components-data/variant-style-helpers";
```

- ALL colors come from `getTextColor()`, `getElementStyle()`, or `buildElementStyle()`
- ALL dimensions come from `getElementSpec()` layout/dimensions
- ALL toggleable elements use `isElementVisible()` for conditional rendering
- Preview wrapper: `style={{ fontFamily: "var(--font-flowx)" }}`

### Shared Sub-Components

Import from `@/components/docs/shared-elements`:
- `FlowXLabel` — label text above components
- `FlowXDescription` — helper/error text below components
- `FlowXErrorIcon` — error state warning icon
- `FlowXTooltip` — tooltip display

**If you find yourself writing inline label spans with hardcoded colors, inline error SVGs, or inline description text — use the shared component instead.**

### ComponentPageTemplate

All component pages use `ComponentPageTemplate` from `@/components/docs/component-page-template`. It renders every section from the `ComponentSpec` automatically — you provide the spec plus a few custom ReactNode slots.

```tsx
import { ComponentPageTemplate } from "@/components/docs/component-page-template";

<ComponentPageTemplate
  spec={mySpec}                   // ComponentSpec — drives most sections automatically
  tokens={tokensArray}            // { name, value, preview }[] — built from spec.tokenBindings
  interactivePreview={<Preview />} // Custom FlowX[Name] preview component with controls
  useCases={<UseCasesGrid />}     // Grid of variant cards
  statesReference={<StatesRef />} // States showcase with labels below
  sizes={<SizesRef />}            // Sizes showcase with labels below
/>
```

**Sections rendered automatically from `spec`** (no custom slot needed):
- StatusBanner, Title, Description (from `name`, `status`, `figmaLink`, `description`)
- Usage Guidelines (from `guidelines` via `DosAndDonts`)
- Considerations (from `considerations` — omit if nothing non-obvious)
- Props Table (from `props` via `PropsTable`, collapsed by default)
- Anatomy Diagram (from `anatomy` via `AnatomyDiagram`, collapsed by default)
- Real Examples (from `realExamples` — product screenshots with annotations)
- Accessibility (from `accessibility`, collapsed by default)
- Design Tokens (from `tokens` prop via `TokenTable`, collapsed by default)
- Known Exceptions (from `knownExceptions` — intentional deviations)
- Decision Log (from `decisionLog` — design decisions with dates and reasoning)
- Related Components (from `relatedComponents` — linked pills)

**Section order in the template:**
```
Title + Status + Description → Interactive Preview → Use Cases →
States Reference → Sizes → Usage Guidelines → Considerations →
Props → Anatomy → Real Examples → Accessibility →
Design Tokens → Known Exceptions → Decision Log → Related Components
```

All sections are collapsible. Separator: `<hr style={{ borderColor: "#f7f8f9" }} />`

### Styling Conventions

- Use case cards: `backgroundColor: "#f7f8f9"`, no borders. Inverted variants: `bg-neutral-900 text-white`
- Labels sit **below** previews in States and Sizes sections
- Title: `text-sm font-medium`. UseCase: `text-xs text-muted-foreground`

## Figma Extraction Pipeline

Components are extracted from Figma using the **Vibma MCP plugin** via a 7-pass pipeline. This is the core workflow for adding new components.

### The 7 Passes

| Pass | Tool | Extracts |
|------|------|----------|
| 1 | `mcp__Vibma__get_selection` (depth:1) | Variant IDs, axes, boolean/swap properties |
| 2 | `mcp__Vibma__get_node_info` (depth:-1) | Layout, padding, spacing, fills, strokes, dimensions |
| 3 | `mcp__Vibma__scan_text_nodes` | Typography (fontSize, fontWeight, lineHeight) |
| 4 | `mcp__Vibma__get_node_variables` | Token/variable bindings |
| 5 | `mcp__Vibma__search_nodes` + `export_node_as_image` | Icon SVG paths |
| 6 | `mcp__Vibma__export_node_as_image` (PNG, scale:2) | Visual source of truth screenshot |
| 7 | `mcp__Vibma__lint_node` | Hardcoded colors, WCAG, auto-layout warnings |

### Critical Rules

- **Never guess typography** — always use `scan_text_nodes`. SemiBold=600, Regular=400, Bold=700.
- **`scan_text_nodes` does NOT return text colors** — follow up with `get_node_info` on text node IDs for fills.
- **Never export as SVG format** — causes API 400 errors. Use PNG for screenshots, `get_node_info` depth:-1 for vector data.
- **Inspect EVERY variant** — no sampling. Colors may differ across combinations you didn't check.
- **Every fill/stroke must have a paired token** when a variable binding exists.
- **If an element has NO fills, it is transparent** — do not invent a fill.
- **Batch `get_node_info` calls** — 5-10 variant node IDs per call.

### Detailed Plans

The full extraction and page creation pipelines are documented in:
- `docs/plans/2026-03-16-component-create-v2-plan.md` — Complete 7-pass pipeline with exact MCP parameters
- `docs/plans/2026-03-16-component-create-v2-design.md` — Architecture rationale
- `docs/plans/2026-03-17-component-page-template-plan.md` — Page template implementation
- `docs/superpowers/plans/2026-03-24-flxds-skills-plan.md` — Skill creation plan (extract + page skills)

### Skills

Two Claude Code skills handle the full component workflow:

- **`flxds_extract`** (`.claude/skills/flxds_extract.md`) — Figma extraction: preconditions, 7-pass pipeline, data assembly, diff summary. Trigger with: "extract from Figma", "scan component", "pull from Figma", "re-extract".
- **`flxds_page`** (`.claude/skills/flxds_page.md`) — Page create/edit: mode detection, data-driven preview, smart edit, verification. Trigger with: "create page", "edit page", "ds page", "update the page".

Both skills reference shared files in `.claude/skills/references/`:
- `vibma-tools.md` — Vibma MCP tool parameters, critical warnings, batching guidance
- `component-spec.md` — ComponentSpec type fields, data assembly rules, validation checklist
- `page-conventions.md` — Page section order, styling, shared components, variant-style-helpers API

## Reference Pages

When creating new component pages, use these as references:
- **Input Field** (`src/app/components/input-field/page.tsx`) — primary reference for data-driven preview using variant-style-helpers
- **Radio** (`src/app/components/radio/page.tsx`) — segment controller previews
- **Select Field** (`src/app/components/select-field/page.tsx`) — complex toggleable elements
- **Button** (`src/app/components/button/page.tsx`) — simplest example

## Registered Components

button, checkbox, input-field, radio-v3, segmented-button, select-field, switch, tabs, tree, values-table

## Deployment

GitHub Actions deploys on push to `main`. Workflow builds from `flowx-design-system/` and deploys to GitHub Pages with base path `/FLX-Design-System`.

## Figma Link Convention

When setting the `figmaLink` on a component spec, construct it as:
```
https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id}
```
Replace `:` with `-` in the node ID. Use `mcp__Vibma__search_nodes` with `types: ["COMPONENT_SET"]` to find the node ID. Always set the real Figma link via Vibma MCP when creating new component pages.
