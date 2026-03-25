# Claude Code Prompt: FlowX Design System Documentation Site

## Project Overview

Build a **design system documentation website** using Next.js + shadcn/ui + Tailwind CSS. This site is a **design reference tool** — it documents the FlowX design system visually and interactively. It is NOT the production component library (devs use PrimeVue/PrimeReact for that). The audience is designers and developers who need to understand design intent, tokens, patterns, and usage guidelines.

### Two-stage workflow

**Stage A — Skeleton (this prompt).** Build the full site scaffolding: project setup, token layer from `tokens.json`, navigation, docs component kit, foundations pages, theming, and **one sample component page (Button)** as the golden template. When Stage A is complete, the site should be fully navigable, tokens should render on foundations pages, and the Button page should demonstrate every section of the component page template.

**Stage B — Component-by-component (repeated later).** After Stage A, I will feed you one component at a time from Figma (via the Figma MCP plugin). For each component, you will: create the route, populate the `ComponentSpec` data file, build the page using the existing template and docs components. This is a repeatable loop — Stage A exists to make Stage B trivially fast.

---

# STAGE A: SKELETON

Everything below is Stage A scope. Do all of this in one session.

---

## A1. Project Bootstrap

### Initialize

```bash
npx create-next-app@latest flowx-design-system \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd flowx-design-system
```

### Install shadcn/ui

```bash
npx shadcn@latest init
```

When prompted, choose:
- Style: **Default**
- Base color: **Neutral** (we'll override with FlowX tokens)
- CSS variables: **Yes**

### Install core shadcn components

Only install what's needed for the skeleton + Button sample. More will be added in Stage B as needed.

```bash
npx shadcn@latest add button tabs card badge separator tooltip accordion scroll-area
```

### Additional dependencies

```bash
npm install lucide-react next-themes class-variance-authority
npm install -D @tailwindcss/typography
```

---

## A2. Design Token Layer

### Token source: `tokens.json`

The project includes a `tokens.json` file at the project root, exported from the FlowX Figma design system. This is the **single source of truth** — do not invent placeholder values. Copy this file into the project.

The file has two top-level keys:

**`variables`** — contains six groups:
- `Colors` — hex values keyed as `"blue/50"`, `"neutrals/500"`, etc. Palettes: blue, yellow, green, orange, red, neutrals, grays, helpers.
- `Scale` — spacing scale in px (0, 1, 2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160).
- `Opacity` — opacity percentages (0–90).
- `Radius` — border radius values in px (2, 4, 6, 8, 12, 16, 24, 32, 40, 48, 120).
- `Typography` — font size, line height, paragraph spacing, and weight primitives.
- `Shadows` — shadow offsets (xy), blur values, and shadow color (`#163462`).

**`textStyles`** — named text style definitions, each with fontFamily (always `"Open Sans"`), fontWeight, fontSize, lineHeight, and letterSpacing. Naming convention is `"Size (Alias)/Weight"`:
- `"XS/Regular"` → 10/12/400
- `"S (Caption)/Semibold"` → 12/16/600
- `"M (P1)/Regular"` → 14/24/400
- `"L (P3)/Bold"` → 18/28/700
- `"XXL/Bold"` → 24/38/700
- `"XXXL (Display 1)/Bold"` → 72/108/700

### What to generate

1. **Read and parse `tokens.json`.**
2. **Split into architectural layers** in `src/lib/tokens/`:

```
src/lib/tokens/
├── colors.ts        # Color palettes from variables.Colors
├── typography.ts    # Text styles from textStyles + primitives from variables.Typography
├── spacing.ts       # Scale values from variables.Scale
├── radius.ts        # Radius values from variables.Radius
├── opacity.ts       # Opacity values from variables.Opacity
├── shadows.ts       # Shadow primitives from variables.Shadows
└── index.ts         # Re-exports everything
```

Each `.ts` file exports:
- A **typed object** for use in code (documentation pages, token tables)
- A **flat list** for rendering in `TokenTable` / `ColorPalette` / `TypeScale` components

Example — `colors.ts` (use actual values from the JSON):
```ts
export const colorPalettes = {
  blue: {
    50: "#e6f0fb",
    100: "#b0d1f3",
    200: "#8abbed",
    300: "#549ce5",
    400: "#3389e0",
    500: "#006bd8",
    600: "#005fc0",
    700: "#004c99",
    800: "#003b77",
    900: "#002d5b",
  },
  // ... yellow, green, orange, red, neutrals, grays, helpers
} as const;

export const colorTokenList = Object.entries(colorPalettes).flatMap(
  ([palette, shades]) =>
    Object.entries(shades).map(([shade, hex]) => ({
      name: `--flowx-${palette}-${shade}`,
      value: hex,
      group: palette,
    }))
);
```

Example — `typography.ts`:
```ts
export const textStyles = {
  "xs-regular":     { fontSize: 10, lineHeight: 12, fontWeight: 400, label: "XS / Regular" },
  "xs-semibold":    { fontSize: 10, lineHeight: 12, fontWeight: 600, label: "XS / Semibold" },
  "xs-bold":        { fontSize: 10, lineHeight: 12, fontWeight: 700, label: "XS / Bold" },
  "s-regular":      { fontSize: 12, lineHeight: 16, fontWeight: 400, label: "S (Caption) / Regular" },
  "s-semibold":     { fontSize: 12, lineHeight: 16, fontWeight: 600, label: "S (Caption) / Semibold" },
  "s-bold":         { fontSize: 12, lineHeight: 16, fontWeight: 700, label: "S (Caption) / Bold" },
  "m-regular":      { fontSize: 14, lineHeight: 24, fontWeight: 400, label: "M (P1) / Regular" },
  "m-semibold":     { fontSize: 14, lineHeight: 24, fontWeight: 600, label: "M (P1) / Semibold" },
  "m-bold":         { fontSize: 14, lineHeight: 24, fontWeight: 700, label: "M (P1) / Bold" },
  "l-regular":      { fontSize: 18, lineHeight: 28, fontWeight: 400, label: "L (P3) / Regular" },
  "l-bold":         { fontSize: 18, lineHeight: 28, fontWeight: 700, label: "L (P3) / Bold" },
  "xxl-bold":       { fontSize: 24, lineHeight: 38, fontWeight: 700, label: "XXL / Bold" },
  "xxxl-bold":      { fontSize: 72, lineHeight: 108, fontWeight: 700, label: "XXXL (Display 1) / Bold" },
} as const;

export const fontFamily = "Open Sans" as const;
```

3. **Generate `src/app/globals.css`** with CSS custom properties. Convert hex→HSL for shadcn compatibility (write a utility function). Structure:

```css
@layer base {
  :root {
    /* === FlowX Color Primitives (generated from tokens.json) === */
    --flowx-blue-50: /* hsl from #e6f0fb */;
    --flowx-blue-100: /* hsl from #b0d1f3 */;
    /* ... all shades × all palettes ... */

    /* === Semantic mapping (shadcn consumes these) === */
    --background: var(--flowx-grays-50);       /* #ffffff */
    --foreground: var(--flowx-neutrals-900);   /* #1d232c */
    --card: var(--flowx-grays-50);
    --card-foreground: var(--flowx-neutrals-900);
    --primary: var(--flowx-blue-500);          /* #006bd8 */
    --primary-foreground: 0 0% 100%;
    --secondary: var(--flowx-neutrals-100);
    --secondary-foreground: var(--flowx-neutrals-900);
    --muted: var(--flowx-neutrals-100);
    --muted-foreground: var(--flowx-neutrals-500);
    --accent: var(--flowx-neutrals-100);
    --accent-foreground: var(--flowx-neutrals-900);
    --destructive: var(--flowx-red-500);       /* #e62200 */
    --destructive-foreground: 0 0% 100%;
    --border: var(--flowx-neutrals-200);
    --input: var(--flowx-neutrals-200);
    --ring: var(--flowx-blue-500);
    --radius: 0.5rem;

    /* === FlowX semantic tokens === */
    --flowx-surface-primary: var(--flowx-grays-50);
    --flowx-surface-secondary: var(--flowx-neutrals-50);
    --flowx-surface-tertiary: var(--flowx-neutrals-100);
    --flowx-text-primary: var(--flowx-neutrals-900);
    --flowx-text-secondary: var(--flowx-neutrals-500);
    --flowx-text-disabled: var(--flowx-neutrals-300);
    --flowx-border-default: var(--flowx-neutrals-200);
    --flowx-border-strong: var(--flowx-neutrals-400);
    --flowx-interactive-default: var(--flowx-blue-500);
    --flowx-interactive-hover: var(--flowx-blue-600);

    /* === Status tokens === */
    --flowx-success: var(--flowx-green-500);
    --flowx-warning: var(--flowx-yellow-500);
    --flowx-error: var(--flowx-red-500);
    --flowx-info: var(--flowx-blue-500);

    /* === Spacing (from variables.Scale, as rem) === */
    --flowx-space-0: 0rem;
    --flowx-space-2: 0.125rem;
    --flowx-space-4: 0.25rem;
    --flowx-space-8: 0.5rem;
    --flowx-space-12: 0.75rem;
    --flowx-space-16: 1rem;
    --flowx-space-24: 1.5rem;
    --flowx-space-32: 2rem;
    --flowx-space-40: 2.5rem;
    --flowx-space-48: 3rem;
    /* ... through 160 ... */

    /* === Radius (from variables.Radius) === */
    --flowx-radius-2: 2px;
    --flowx-radius-4: 4px;
    --flowx-radius-6: 6px;
    --flowx-radius-8: 8px;
    --flowx-radius-12: 12px;
    --flowx-radius-16: 16px;
    --flowx-radius-24: 24px;
    --flowx-radius-32: 32px;
    --flowx-radius-40: 40px;
    --flowx-radius-48: 48px;
    --flowx-radius-120: 120px;
  }

  .dark {
    --background: var(--flowx-neutrals-900);
    --foreground: var(--flowx-neutrals-50);
    /* TODO: no dark tokens in tokens.json yet — define in Figma */
  }
}
```

> **NOTE**: hex→HSL conversion must be done programmatically. shadcn requires HSL in `H S% L%` space-separated format (no commas, no `hsl()` wrapper).

---

## A3. Site Structure & Navigation

### Route architecture

```
src/app/
├── layout.tsx                    # Root layout with sidebar nav
├── page.tsx                      # Home / overview
├── globals.css
│
├── foundations/
│   ├── layout.tsx
│   ├── colors/page.tsx           # Color palette documentation
│   ├── typography/page.tsx       # Type scale documentation
│   ├── spacing/page.tsx          # Spacing system
│   ├── elevation/page.tsx        # Shadows & depth
│   ├── iconography/page.tsx      # Icon system (placeholder)
│   └── grid/page.tsx             # Grid & layout (placeholder)
│
├── components/
│   ├── layout.tsx
│   ├── page.tsx                  # Components index (reads from registry)
│   └── button/page.tsx           # ← SAMPLE COMPONENT (fully built)
│   # All other component routes created in Stage B.
│   # Do NOT create empty placeholder pages for future components.
│
├── patterns/
│   ├── layout.tsx
│   └── page.tsx                  # Patterns overview (placeholder)
│
└── resources/
    ├── layout.tsx
    ├── figma/page.tsx
    └── changelog/page.tsx
```

**Important**: Only `/components/button/` gets a full page in Stage A. Other component pages are created in Stage B when Figma data is provided. The `/components/page.tsx` index dynamically lists whatever components exist in the registry.

### Sidebar navigation

Create `src/components/docs/sidebar-nav.tsx`. Group by section (Foundations, Components, Patterns, Resources). The Components section **dynamically reads** from the component registry — not a hardcoded list. When a new component is registered in Stage B, it auto-appears in nav.

### Root layout

- `ThemeProvider` from `next-themes` (light/dark toggle)
- Sidebar navigation (collapsible on mobile)
- Main content area with breadcrumbs
- Top bar: site title ("FlowX Design System"), theme toggle, link to Figma

---

## A4. Theming & Visual Identity

### Fonts

- **Component previews**: `"Open Sans"` — the FlowX product font
- **Docs site UI** (sidebar, headings, page chrome): `"Plus Jakarta Sans"`
- **Code snippets**: `"JetBrains Mono"`

```tsx
import { Open_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-flowx' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-docs' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

In `globals.css`:
```css
:root {
  --font-flowx: 'Open Sans', sans-serif;
  --font-docs: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Apply `font-family: var(--font-flowx)` to the `ComponentPreview` canvas wrapper. Everything else uses `--font-docs`.

### Layout tone
- Clean and utilitarian — a tool, not a marketing site
- Generous whitespace, clear hierarchy
- Left sidebar nav (240px), content area max-width ~900px
- Subtle borders, not drop shadows, for sectioning
- Light background with minimal color — component examples provide the color

---

## A5. Component Data Architecture

This is the contract between Stage A (skeleton) and Stage B (per-component from Figma).

### Component spec type

Create `src/lib/components-data/types.ts`:

```ts
export interface ComponentSpec {
  slug: string;
  name: string;
  description: string;
  status: "stable" | "beta" | "deprecated" | "planned";
  figmaLink?: string;
  lastUpdated?: string;

  variants: {
    name: string;
    description?: string;
    props: Record<string, string>;
  }[];

  props: {
    name: string;
    type: string;
    default?: string;
    options?: string[];
    description: string;
  }[];

  states: string[];
  sizes?: string[];

  anatomy?: {
    part: string;
    description: string;
  }[];

  guidelines?: {
    do: { description: string; example?: string }[];
    dont: { description: string; example?: string }[];
  };

  accessibility?: {
    role?: string;
    keyboard?: string[];
    ariaAttributes?: string[];
  };

  relatedComponents?: string[];
}
```

### Component registry

Create `src/lib/components-data/registry.ts`:

```ts
import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";
// Stage B: new imports added here one at a time

export const componentRegistry: ComponentSpec[] = [
  buttonSpec,
];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
```

Sidebar nav and `/components/page.tsx` both read from this registry.

### Sample data: Button

Create `src/lib/components-data/button.ts` with a fully populated `ComponentSpec`. This is the reference example for all Stage B components. Fill it with realistic FlowX Button data.

---

## A6. Documentation Component Kit

Build in `src/components/docs/`:

### `ComponentPreview`
Interactive preview. Canvas (with Open Sans), controls strip (dropdowns/toggles), collapsible code snippet. Banner: `"📐 Design reference — production uses PrimeVue/PrimeReact"`.

```tsx
<ComponentPreview
  title="Button"
  description="Triggers an action or event."
  controls={[
    { name: "variant", options: ["default", "secondary", "outline", "ghost", "destructive"] },
    { name: "size", options: ["sm", "default", "lg"] },
    { name: "disabled", type: "boolean" },
  ]}
  render={({ variant, size, disabled }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      Button Label
    </Button>
  )}
/>
```

### `TokenTable`
Table: name, value, preview swatch/sample.

### `TypeScale`
Live samples of every text style in Open Sans with metadata.

### `SpacingScale`
Visual blocks proportional to each spacing value.

### `ColorPalette`
Swatch grid with copy-on-click (hex), grouped by palette.

### `DosAndDonts`
Side-by-side cards. Green ✓ / Red ✗.

### `StatusBanner`
Status badge + Figma link + last updated. Reads from `ComponentSpec`.

### `PropsTable`
Renders `props` array as table: Name, Type, Default, Description.

### `AnatomyDiagram`
Renders `anatomy` array as numbered list. (Visual diagram is a future enhancement.)

---

## A7. Component Page Template

Every component page follows this layout. Build it for Button — it becomes the pattern for Stage B.

```
StatusBanner
# Component Name + description
## Interactive Preview (ComponentPreview)
## Variants (grid)
## States
## Sizes
## Props (PropsTable)
## Anatomy (AnatomyDiagram)
## Usage Guidelines (DosAndDonts)
## Accessibility
## Design Tokens Used (TokenTable)
## Related Components
```

**Each section gracefully hides if its `ComponentSpec` field is undefined.** Stage B components only need to fill what's available from Figma.

---

## A8. Foundations Pages

### Colors (`/foundations/colors`)
`ColorPalette` per palette group + `TokenTable` with CSS variable names + hex. Copy-on-click.

### Typography (`/foundations/typography`)
`TypeScale` with every text style in Open Sans. Reference table with all values.

### Spacing (`/foundations/spacing`)
`SpacingScale` from spacing tokens. Visual blocks.

### Elevation (`/foundations/elevation`)
Shadow tokens rendered as sample cards with each shadow level.

### Iconography & Grid
Placeholder pages: "Coming soon."

---

## A9. Stage A Checklist

- [ ] `npm run build` passes
- [ ] All routes resolve
- [ ] Light/dark toggle works
- [ ] Sidebar dynamically lists components from registry
- [ ] Button page renders all sections from its `ComponentSpec`
- [ ] Colors page shows all 8 palettes with correct hex from `tokens.json`
- [ ] Typography page shows all 13 text styles in Open Sans
- [ ] Spacing page shows the full scale
- [ ] `ComponentPreview` has interactive controls
- [ ] Preview canvas: Open Sans. Docs chrome: Plus Jakarta Sans.
- [ ] "Design reference" banner on Button page
- [ ] Mobile responsive (sidebar collapses)

---

# STAGE B: PER-COMPONENT LOOP

*Reference for future sessions. Do not execute during Stage A.*

I will provide per component:
1. **Component name** (e.g., "Select")
2. **Figma data** — variants, props, states, sizes, anatomy, guidelines (from Figma MCP plugin)

Claude Code does:

1. **Install shadcn component** (if needed):
   ```bash
   npx shadcn@latest add [name]
   ```

2. **Create data file**: `src/lib/components-data/[slug].ts` using `ComponentSpec`, populated with Figma data.

3. **Register**: add import + entry to `registry.ts`.

4. **Create route**: `src/app/components/[slug]/page.tsx` following the Button page template.

5. **Verify**: component appears in sidebar nav and components index automatically.

Each component: **data file → register → route → done.**

### Example Stage B prompt:

> Add the Select component. Figma data:
> - Variants: default, error, disabled
> - Props: placeholder (string), options (array), size (sm | md | lg), error (boolean)
> - States: default, hover, focus, open, disabled, error
> - Sizes: sm (32px), md (40px), lg (48px)
> - Guidelines: Do use for 4+ options. Don't use for binary choices (use Switch).
> - Related: checkbox, radio, switch

---

## Key Reminders

1. **Stage A = skeleton + Button + foundations.** No empty component pages.
2. **Use the shadcn CLI** to add components.
3. **`tokens.json` is the source of truth.** No placeholder values.
4. **`ComponentSpec` is the contract.** Make the Button spec thorough.
5. **`ComponentPreview` is the most important piece.** Invest in it.
6. **Sections hide when data is missing.** Graceful degradation.
7. **Open Sans for components, Plus Jakarta Sans for docs.**
8. **Sidebar reads from registry.** Auto-updates when components are added.
