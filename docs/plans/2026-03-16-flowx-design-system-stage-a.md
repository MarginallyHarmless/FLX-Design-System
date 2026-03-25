# FlowX Design System Documentation Site — Stage A Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full skeleton of the FlowX Design System documentation site — project setup, token layer, navigation, docs component kit, foundations pages, theming, and a fully-built Button sample component page.

**Architecture:** Next.js App Router with shadcn/ui for documentation UI components. Design tokens are parsed from `tokens.json` into typed TypeScript modules. A `ComponentSpec` type + registry pattern enables Stage B (per-component from Figma) to be a simple data-file + route addition. Documentation components (`ComponentPreview`, `TokenTable`, etc.) render token/spec data visually.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, shadcn/ui, next-themes, lucide-react, class-variance-authority

---

## Task 1: Project Bootstrap

**Files:**
- Create: `flowx-design-system/` (via create-next-app)

**Step 1: Create Next.js project**

```bash
cd "/Users/bogdandraghici/Desktop/vibes/FLX DS"
npx create-next-app@latest flowx-design-system \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

**Step 2: Initialize shadcn/ui**

```bash
cd flowx-design-system
npx shadcn@latest init
```

Choose: Style=Default, Base color=Neutral, CSS variables=Yes.

**Step 3: Install shadcn components**

```bash
npx shadcn@latest add button tabs card badge separator tooltip accordion scroll-area
```

**Step 4: Install additional dependencies**

```bash
npm install lucide-react next-themes class-variance-authority
npm install -D @tailwindcss/typography
```

**Step 5: Copy tokens.json into project**

```bash
cp "../tokens.json" ./tokens.json
```

**Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 7: Commit**

```bash
git init && git add -A && git commit -m "chore: bootstrap Next.js + shadcn/ui project"
```

---

## Task 2: Design Token Layer

**Files:**
- Create: `src/lib/tokens/colors.ts`
- Create: `src/lib/tokens/typography.ts`
- Create: `src/lib/tokens/spacing.ts`
- Create: `src/lib/tokens/radius.ts`
- Create: `src/lib/tokens/opacity.ts`
- Create: `src/lib/tokens/shadows.ts`
- Create: `src/lib/tokens/index.ts`

**Step 1: Create `src/lib/tokens/colors.ts`**

Parse `tokens.json` → `variables.Colors`. Group by palette name (blue, yellow, green, orange, red, neutrals, grays, helpers). Export `colorPalettes` object and `colorTokenList` flat array.

```ts
export const colorPalettes = {
  blue: {
    50: "#e6f0fb", 100: "#b0d1f3", 200: "#8abbed", 300: "#549ce5",
    400: "#3389e0", 500: "#006bd8", 600: "#005fc0", 700: "#004c99",
    800: "#003b77", 900: "#002d5b",
  },
  yellow: {
    50: "#fff8e7", 100: "#ffe9b6", 200: "#ffdf92", 300: "#fed061",
    400: "#fec742", 500: "#feb913", 600: "#e7a811", 700: "#b4830d",
    800: "#8c660a", 900: "#6b4e08",
  },
  green: {
    50: "#e6f2ef", 100: "#b0d8ce", 200: "#8ac5b6", 300: "#54aa94",
    400: "#339980", 500: "#008060", 600: "#007457", 700: "#005b44",
    800: "#004635", 900: "#003628",
  },
  orange: {
    50: "#fff0e8", 100: "#fed1b9", 200: "#febb97", 300: "#fe9c67",
    400: "#fd8949", 500: "#fd6b1c", 600: "#e66119", 700: "#b44c14",
    800: "#8b3b0f", 900: "#6a2d0c",
  },
  red: {
    50: "#fde9e6", 100: "#f7bab0", 200: "#f4998a", 300: "#ee6b54",
    400: "#eb4e33", 500: "#e62200", 600: "#d11f00", 700: "#a31800",
    800: "#7f1300", 900: "#610e00",
  },
  neutrals: {
    50: "#f7f8f9", 100: "#e3e8ed", 200: "#cbd1db", 300: "#a6b0be",
    400: "#8390a2", 500: "#64748b", 600: "#5b6a7e", 700: "#475263",
    800: "#2a313a", 900: "#1d232c",
  },
  grays: { 50: "#ffffff", 900: "#000000" },
  helpers: { 100: "#f0ecfa", 500: "#7a4ed1" },
} as const;

export type PaletteName = keyof typeof colorPalettes;

export const colorTokenList = Object.entries(colorPalettes).flatMap(
  ([palette, shades]) =>
    Object.entries(shades).map(([shade, hex]) => ({
      name: `--flowx-${palette}-${shade}`,
      value: hex,
      group: palette,
    }))
);
```

**Step 2: Create `src/lib/tokens/typography.ts`**

From `tokens.json` → `textStyles` + `variables.Typography`.

```ts
export const fontFamily = "Open Sans" as const;

export const textStyles = {
  "xs-regular":   { fontSize: 10, lineHeight: 12, fontWeight: 400, label: "XS / Regular" },
  "xs-semibold":  { fontSize: 10, lineHeight: 12, fontWeight: 600, label: "XS / Semibold" },
  "xs-bold":      { fontSize: 10, lineHeight: 12, fontWeight: 700, label: "XS / Bold" },
  "s-regular":    { fontSize: 12, lineHeight: 16, fontWeight: 400, label: "S (Caption) / Regular" },
  "s-semibold":   { fontSize: 12, lineHeight: 16, fontWeight: 600, label: "S (Caption) / Semibold" },
  "s-bold":       { fontSize: 12, lineHeight: 16, fontWeight: 700, label: "S (Caption) / Bold" },
  "m-regular":    { fontSize: 14, lineHeight: 24, fontWeight: 400, label: "M (P1) / Regular" },
  "m-semibold":   { fontSize: 14, lineHeight: 24, fontWeight: 600, label: "M (P1) / Semibold" },
  "m-bold":       { fontSize: 14, lineHeight: 24, fontWeight: 700, label: "M (P1) / Bold" },
  "l-regular":    { fontSize: 18, lineHeight: 28, fontWeight: 400, label: "L (P3) / Regular" },
  "l-bold":       { fontSize: 18, lineHeight: 28, fontWeight: 700, label: "L (P3) / Bold" },
  "xxl-bold":     { fontSize: 24, lineHeight: 38, fontWeight: 700, label: "XXL / Bold" },
  "xxxl-bold":    { fontSize: 72, lineHeight: 108, fontWeight: 700, label: "XXXL (Display 1) / Bold" },
} as const;

export const typographyPrimitives = {
  fontSizes: { xs: 10, s: 12, m: 14, l: 18, xl: 24, xxl: 40, xxxl: 72 },
  lineHeights: { 12: 12, 16: 16, 18: 18, 22: 22, 24: 24, 28: 28, 38: 38, xxl: 60, xxxl: 108 },
  weights: { regular: 400, semibold: 600, bold: 700, extrabold: 900 },
} as const;
```

**Step 3: Create `src/lib/tokens/spacing.ts`**

```ts
export const spacingScale = {
  0: 0, 1: 1, 2: 2, 4: 4, 6: 6, 8: 8, 12: 12, 16: 16,
  24: 24, 32: 32, 40: 40, 48: 48, 56: 56, 64: 64,
  80: 80, 96: 96, 112: 112, 128: 128, 144: 144, 160: 160,
} as const;

export const spacingTokenList = Object.entries(spacingScale).map(([key, px]) => ({
  name: `--flowx-space-${key}`,
  valuePx: px,
  valueRem: `${px / 16}rem`,
}));
```

**Step 4: Create `src/lib/tokens/radius.ts`**

```ts
export const radiusScale = {
  2: 2, 4: 4, 6: 6, 8: 8, 12: 12,
  16: 16, 24: 24, 32: 32, 40: 40, 48: 48, 120: 120,
} as const;

export const radiusTokenList = Object.entries(radiusScale).map(([key, px]) => ({
  name: `--flowx-radius-${key}`,
  valuePx: `${px}px`,
}));
```

**Step 5: Create `src/lib/tokens/opacity.ts`**

```ts
export const opacityScale = {
  0: 0, 5: 5, 10: 10, 15: 15, 20: 20, 25: 25,
  30: 30, 40: 40, 50: 50, 60: 60, 70: 70, 80: 80, 90: 90,
} as const;

export const opacityTokenList = Object.entries(opacityScale).map(([key, pct]) => ({
  name: `--flowx-opacity-${key}`,
  value: pct,
}));
```

**Step 6: Create `src/lib/tokens/shadows.ts`**

```ts
export const shadowColor = "#163462";

export const shadowPrimitives = {
  offsets: { 2: 2, 4: 4, 8: 8, 16: 16, 24: 24, 32: 32 },
  blurs: { xs: 8, s: 12, m: 16, l: 24, xl: 32 },
} as const;

export const shadowLevels = [
  { name: "xs", offset: 2, blur: 8, css: `0 2px 8px ${shadowColor}1a` },
  { name: "s",  offset: 4, blur: 12, css: `0 4px 12px ${shadowColor}1a` },
  { name: "m",  offset: 8, blur: 16, css: `0 8px 16px ${shadowColor}1a` },
  { name: "l",  offset: 16, blur: 24, css: `0 16px 24px ${shadowColor}1a` },
  { name: "xl", offset: 24, blur: 32, css: `0 24px 32px ${shadowColor}1a` },
];
```

**Step 7: Create `src/lib/tokens/index.ts`**

```ts
export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./radius";
export * from "./opacity";
export * from "./shadows";
```

**Step 8: Verify build**

```bash
npm run build
```

**Step 9: Commit**

```bash
git add src/lib/tokens/ && git commit -m "feat: add design token layer from tokens.json"
```

---

## Task 3: CSS Custom Properties & Theming

**Files:**
- Create: `src/lib/utils/hex-to-hsl.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Create hex→HSL utility**

```ts
// src/lib/utils/hex-to-hsl.ts
export function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
```

**Step 2: Rewrite `globals.css`**

Generate all `--flowx-*` CSS custom properties from tokens using HSL values.
Set up shadcn semantic variables referencing FlowX tokens.
Include spacing and radius variables.
Add `.dark` theme stub.
Wire up font variables: `--font-flowx`, `--font-docs`, `--font-mono`.

The full CSS is specified in the prompt doc section A2. Use the actual hex values from tokens.json, converted to HSL.

**Step 3: Set up fonts and ThemeProvider in layout.tsx**

Import `Open_Sans`, `Plus_Jakarta_Sans`, `JetBrains_Mono` from `next/font/google`.
Wrap app in `ThemeProvider` from `next-themes`.
Apply font CSS variables to `<body>`.
Set default body font to `--font-docs` (Plus Jakarta Sans).

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add -A && git commit -m "feat: CSS custom properties from tokens + theming + fonts"
```

---

## Task 4: Component Data Architecture

**Files:**
- Create: `src/lib/components-data/types.ts`
- Create: `src/lib/components-data/button.ts`
- Create: `src/lib/components-data/registry.ts`

**Step 1: Create ComponentSpec type**

Copy the `ComponentSpec` interface exactly from the prompt doc section A5.

**Step 2: Create Button spec data**

Create `button.ts` with a fully populated `ComponentSpec` for Button. Include:
- 5 variants: default, secondary, outline, ghost, destructive
- Props: variant, size, disabled, asChild
- States: default, hover, active, focus, disabled
- Sizes: sm, default, lg
- Anatomy: container, label, icon-leading, icon-trailing
- Do/Don't guidelines
- Accessibility: role=button, keyboard shortcuts, aria attributes
- Related: link, toggle, icon-button

**Step 3: Create registry**

```ts
import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";

export const componentRegistry: ComponentSpec[] = [buttonSpec];

export function getComponent(slug: string) {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
```

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/lib/components-data/ && git commit -m "feat: ComponentSpec type, Button data, and component registry"
```

---

## Task 5: Layout Shell & Navigation

**Files:**
- Create: `src/components/docs/sidebar-nav.tsx`
- Create: `src/components/docs/top-bar.tsx`
- Create: `src/components/docs/breadcrumbs.tsx`
- Create: `src/components/docs/theme-toggle.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/app/page.tsx` (home)

**Step 1: Create theme toggle**

Button that toggles light/dark using `next-themes`.

**Step 2: Create sidebar nav**

- Sections: Foundations, Components, Patterns, Resources
- Foundations: hardcoded routes (colors, typography, spacing, elevation, iconography, grid)
- Components: **dynamically reads from `componentRegistry`** — maps `slug` → link
- Patterns, Resources: hardcoded
- Collapsible on mobile (hamburger menu)
- Active state highlighting via `usePathname()`

**Step 3: Create top bar**

Site title "FlowX Design System", theme toggle, Figma link icon.

**Step 4: Create breadcrumbs**

Parse `usePathname()` into breadcrumb segments.

**Step 5: Wire up root layout**

Sidebar (240px fixed) + main content area (max-width ~900px, centered). Apply font classes. ThemeProvider wrapping.

**Step 6: Create home page**

Overview page: title, brief description of the design system, links to foundations and components sections.

**Step 7: Verify**

```bash
npm run dev
```

Visit `/` — should see sidebar, top bar, home content.

**Step 8: Commit**

```bash
git add -A && git commit -m "feat: layout shell with sidebar nav, top bar, breadcrumbs"
```

---

## Task 6: Documentation Component Kit

**Files:**
- Create: `src/components/docs/component-preview.tsx`
- Create: `src/components/docs/token-table.tsx`
- Create: `src/components/docs/type-scale.tsx`
- Create: `src/components/docs/spacing-scale.tsx`
- Create: `src/components/docs/color-palette.tsx`
- Create: `src/components/docs/dos-and-donts.tsx`
- Create: `src/components/docs/status-banner.tsx`
- Create: `src/components/docs/props-table.tsx`
- Create: `src/components/docs/anatomy-diagram.tsx`

**Step 1: Build ComponentPreview**

This is the most important component. Features:
- Canvas area with `font-family: var(--font-flowx)` (Open Sans)
- Controls strip: dropdowns and toggles that update preview state
- Collapsible code snippet section
- Banner: "Design reference — production uses PrimeVue/PrimeReact"
- Accepts `controls` array and `render` function prop
- Uses `useState` for each control value

**Step 2: Build TokenTable**

Generic table: Name | Value | Preview. The preview column renders a visual swatch/sample based on token type. Accepts array of `{ name, value, preview? }`.

**Step 3: Build ColorPalette**

Swatch grid grouped by palette name. Each swatch shows hex, copy-on-click. Uses `colorPalettes` from tokens.

**Step 4: Build TypeScale**

Live-rendered text samples in Open Sans for each text style. Shows metadata (fontSize, lineHeight, weight) beside each.

**Step 5: Build SpacingScale**

Visual bars/blocks proportional to spacing values. Shows px and rem.

**Step 6: Build StatusBanner**

Reads from `ComponentSpec`: status badge (stable/beta/deprecated/planned), optional Figma link, last updated date.

**Step 7: Build PropsTable**

Table: Name | Type | Default | Description. From `ComponentSpec.props`.

**Step 8: Build DosAndDonts**

Side-by-side cards. Green checkmark + "Do" / Red X + "Don't". From `ComponentSpec.guidelines`.

**Step 9: Build AnatomyDiagram**

Numbered list of anatomy parts with descriptions. From `ComponentSpec.anatomy`.

**Step 10: Verify build**

```bash
npm run build
```

**Step 11: Commit**

```bash
git add src/components/docs/ && git commit -m "feat: documentation component kit (preview, tables, palettes, etc.)"
```

---

## Task 7: Foundations Pages

**Files:**
- Create: `src/app/foundations/layout.tsx`
- Create: `src/app/foundations/colors/page.tsx`
- Create: `src/app/foundations/typography/page.tsx`
- Create: `src/app/foundations/spacing/page.tsx`
- Create: `src/app/foundations/elevation/page.tsx`
- Create: `src/app/foundations/iconography/page.tsx`
- Create: `src/app/foundations/grid/page.tsx`

**Step 1: Create foundations layout**

Simple pass-through layout (or shared heading).

**Step 2: Colors page**

Render `ColorPalette` for each palette group from `colorPalettes`. Below that, a `TokenTable` with all CSS variable names + hex values.

**Step 3: Typography page**

Render `TypeScale` with all 13 text styles. Reference table with font sizes, line heights, weights.

**Step 4: Spacing page**

Render `SpacingScale` from `spacingScale`. Visual blocks + token table.

**Step 5: Elevation page**

Render shadow levels as sample cards, each with the corresponding box-shadow applied.

**Step 6: Iconography page**

Placeholder: "Coming soon."

**Step 7: Grid page**

Placeholder: "Coming soon."

**Step 8: Verify all routes**

```bash
npm run dev
```

Visit each `/foundations/*` route.

**Step 9: Commit**

```bash
git add src/app/foundations/ && git commit -m "feat: foundations pages (colors, typography, spacing, elevation)"
```

---

## Task 8: Button Component Page (Golden Template)

**Files:**
- Create: `src/app/components/layout.tsx`
- Create: `src/app/components/page.tsx` (component index)
- Create: `src/app/components/button/page.tsx`

**Step 1: Create components layout**

Simple pass-through.

**Step 2: Create components index page**

Reads from `componentRegistry`. Renders a card grid showing each component's name, description, status badge, and link to its page.

**Step 3: Create Button page**

Follows the template from section A7. Sections in order:
1. `StatusBanner` — reads from `buttonSpec`
2. Title + description
3. `ComponentPreview` — interactive with variant/size/disabled controls
4. Variants grid — show all 5 variants
5. States — show all states
6. Sizes — show sm/default/lg
7. `PropsTable` — from buttonSpec.props
8. `AnatomyDiagram` — from buttonSpec.anatomy
9. `DosAndDonts` — from buttonSpec.guidelines
10. Accessibility section — keyboard shortcuts, ARIA
11. Design tokens used — relevant token subset
12. Related components — links

**Each section gracefully hides if its data is undefined.**

**Step 4: Verify**

```bash
npm run dev
```

- Visit `/components` — Button should appear in the grid
- Visit `/components/button` — all sections should render
- Sidebar should show "Button" under Components (from registry)

**Step 5: Commit**

```bash
git add src/app/components/ && git commit -m "feat: Button component page (golden template) + components index"
```

---

## Task 9: Patterns & Resources Shells

**Files:**
- Create: `src/app/patterns/layout.tsx`
- Create: `src/app/patterns/page.tsx`
- Create: `src/app/resources/layout.tsx`
- Create: `src/app/resources/figma/page.tsx`
- Create: `src/app/resources/changelog/page.tsx`

**Step 1: Create patterns overview**

Placeholder page: "Patterns documentation — coming soon."

**Step 2: Create resources pages**

- Figma: Link to FlowX Figma file, brief description
- Changelog: Placeholder

**Step 3: Commit**

```bash
git add src/app/patterns/ src/app/resources/ && git commit -m "feat: patterns and resources shell pages"
```

---

## Task 10: Mobile Responsiveness & Polish

**Step 1: Mobile sidebar**

Ensure sidebar collapses to hamburger menu on screens < 768px. Use a sheet/drawer component.

**Step 2: Responsive content**

Verify all foundations pages and Button page look good on mobile. Fix any overflow issues.

**Step 3: Final build check**

```bash
npm run build
```

Must pass with no errors.

**Step 4: Commit**

```bash
git add -A && git commit -m "feat: mobile responsiveness and polish"
```

---

## Stage A Acceptance Checklist

- [ ] `npm run build` passes
- [ ] All routes resolve (/, /foundations/*, /components, /components/button, /patterns, /resources/*)
- [ ] Light/dark toggle works
- [ ] Sidebar dynamically lists components from registry
- [ ] Button page renders all sections from its ComponentSpec
- [ ] Colors page shows all 8 palettes with correct hex from tokens.json
- [ ] Typography page shows all 13 text styles in Open Sans
- [ ] Spacing page shows the full scale
- [ ] ComponentPreview has interactive controls
- [ ] Preview canvas: Open Sans. Docs chrome: Plus Jakarta Sans.
- [ ] "Design reference" banner on Button page
- [ ] Mobile responsive (sidebar collapses)
