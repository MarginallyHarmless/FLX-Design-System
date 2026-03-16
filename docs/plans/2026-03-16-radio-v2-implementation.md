# Radio v2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a pixel-perfect Radio v2 design system page using pre-exported Figma PNGs instead of a custom React component.

**Architecture:** Export all 48 Radio variant images from Figma via MCP, store them as static PNGs. Build a page with an image-swapping selector (5 dropdowns) and two static grid images (light + inverted). Reuse existing docs infrastructure (PropsTable, AnatomyDiagram, etc.).

**Tech Stack:** Next.js App Router, TypeScript, Figma MCP (`mcp__Vibma__export_node_as_image`), Next.js `<Image>` component.

---

## Figma Node ID Reference

The Radio component set (`360:641`) contains 48 variants. Each child component's name encodes its properties as `Selected={Off|On}, State={Default|Error|Disabled}, Border={On|Off}, Inverted={Off|On}, Size={Medium|Small}`.

Complete node ID mapping (from `get_selection` output):

| Selected | State    | Border | Inverted | Size   | Node ID      |
|----------|----------|--------|----------|--------|--------------|
| Off      | Default  | On     | Off      | Medium | 360:642      |
| Off      | Default  | On     | Off      | Small  | 526:14111    |
| Off      | Default  | Off    | Off      | Medium | 360:660      |
| Off      | Default  | Off    | Off      | Small  | 526:14120    |
| Off      | Default  | On     | On       | Medium | 360:651      |
| Off      | Default  | On     | On       | Small  | 526:14677    |
| Off      | Default  | Off    | On       | Medium | 360:669      |
| Off      | Default  | Off    | On       | Small  | 526:14686    |
| Off      | Error    | On     | Off      | Medium | 360:678      |
| Off      | Error    | On     | Off      | Small  | 526:14129    |
| Off      | Error    | Off    | Off      | Medium | 360:698      |
| Off      | Error    | Off    | Off      | Small  | 526:14139    |
| Off      | Error    | On     | On       | Medium | 360:688      |
| Off      | Error    | On     | On       | Small  | 526:14695    |
| Off      | Error    | Off    | On       | Medium | 360:708      |
| Off      | Error    | Off    | On       | Small  | 526:14705    |
| Off      | Disabled | On     | Off      | Medium | 360:718      |
| Off      | Disabled | On     | Off      | Small  | 526:14149    |
| Off      | Disabled | Off    | Off      | Medium | 360:736      |
| Off      | Disabled | Off    | Off      | Small  | 526:14158    |
| Off      | Disabled | On     | On       | Medium | 360:727      |
| Off      | Disabled | On     | On       | Small  | 526:14715    |
| Off      | Disabled | Off    | On       | Medium | 360:745      |
| Off      | Disabled | Off    | On       | Small  | 526:14724    |
| On       | Default  | On     | Off      | Medium | 360:790      |
| On       | Default  | On     | Off      | Small  | 526:14167    |
| On       | Default  | Off    | Off      | Medium | 360:808      |
| On       | Default  | Off    | Off      | Small  | 526:14176    |
| On       | Default  | On     | On       | Medium | 360:799      |
| On       | Default  | On     | On       | Small  | 526:14733    |
| On       | Default  | Off    | On       | Medium | 360:817      |
| On       | Default  | Off    | On       | Small  | 526:14742    |
| On       | Error    | On     | Off      | Medium | 360:826      |
| On       | Error    | On     | Off      | Small  | 526:14185    |
| On       | Error    | Off    | Off      | Medium | 360:846      |
| On       | Error    | Off    | Off      | Small  | 526:14195    |
| On       | Error    | On     | On       | Medium | 360:836      |
| On       | Error    | On     | On       | Small  | 526:14751    |
| On       | Error    | Off    | On       | Medium | 360:856      |
| On       | Error    | Off    | On       | Small  | 526:14761    |
| On       | Disabled | On     | Off      | Medium | 360:866      |
| On       | Disabled | On     | Off      | Small  | 526:14205    |
| On       | Disabled | Off    | Off      | Medium | 360:884      |
| On       | Disabled | Off    | Off      | Small  | 526:14214    |
| On       | Disabled | On     | On       | Medium | 360:875      |
| On       | Disabled | On     | On       | Small  | 526:14771    |
| On       | Disabled | Off    | On       | Medium | 360:893      |
| On       | Disabled | Off    | On       | Small  | 526:14780    |

---

### Task 1: Export all 48 variant images from Figma

**Files:**
- Create: `public/figma-exports/radio/` directory with 48 PNGs

**Step 1: Create the output directory**

```bash
mkdir -p "public/figma-exports/radio"
```

**Step 2: Export all 48 variant images**

Use `mcp__Vibma__export_node_as_image` on each node ID from the table above with `format: "PNG"` and `scale: 2`. Save each returned image to `public/figma-exports/radio/{selected}-{state}-{border}-{inverted}-{size}.png`.

The filename convention maps property values to lowercase kebab: `off-default-on-off-medium.png`, `on-error-on-on-small.png`, etc.

Export in batches to avoid overwhelming the MCP connection. Process 6-8 at a time using parallel tool calls.

**Important:** The MCP tool returns image data directly. You need to save each exported image to disk. Use the returned image data and write it to the correct path.

**Step 3: Export the two grid images**

For the light grid, we need a composite of all non-inverted variants. Export the following parent sections or manually compose:
- Use `mcp__Vibma__export_node_as_image` on the component set node `360:641` with `format: "PNG"`, `scale: 2` — this gives the full grid. Save as `public/figma-exports/radio/grid-full.png`.

For split grids, group the individual exported images or use the full grid as a single reference image. Since the Figma component set shows all variants in a grid layout, exporting the full set node gives both light and inverted variants together. Save it as `grid-full.png` and we'll reference it as the visual reference.

**Step 4: Verify image count**

```bash
ls -1 public/figma-exports/radio/*.png | wc -l
```

Expected: 49 files (48 individual + 1 full grid)

**Step 5: Commit**

```bash
git add public/figma-exports/radio/
git commit -m "assets: export 48 Radio variant PNGs from Figma at 2x scale"
```

---

### Task 2: Create the variant mapping file

**Files:**
- Create: `src/lib/components-data/radio-v2-variants.ts`

**Step 1: Create the mapping file**

```ts
export interface RadioVariant {
  selected: "off" | "on";
  state: "default" | "error" | "disabled";
  border: "on" | "off";
  inverted: "off" | "on";
  size: "medium" | "small";
  nodeId: string;
  file: string;
}

export const radioV2Variants: RadioVariant[] = [
  { selected: "off", state: "default", border: "on", inverted: "off", size: "medium", nodeId: "360:642", file: "off-default-on-off-medium.png" },
  { selected: "off", state: "default", border: "on", inverted: "off", size: "small", nodeId: "526:14111", file: "off-default-on-off-small.png" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:660", file: "off-default-off-off-medium.png" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "small", nodeId: "526:14120", file: "off-default-off-off-small.png" },
  { selected: "off", state: "default", border: "on", inverted: "on", size: "medium", nodeId: "360:651", file: "off-default-on-on-medium.png" },
  { selected: "off", state: "default", border: "on", inverted: "on", size: "small", nodeId: "526:14677", file: "off-default-on-on-small.png" },
  { selected: "off", state: "default", border: "off", inverted: "on", size: "medium", nodeId: "360:669", file: "off-default-off-on-medium.png" },
  { selected: "off", state: "default", border: "off", inverted: "on", size: "small", nodeId: "526:14686", file: "off-default-off-on-small.png" },
  { selected: "off", state: "error", border: "on", inverted: "off", size: "medium", nodeId: "360:678", file: "off-error-on-off-medium.png" },
  { selected: "off", state: "error", border: "on", inverted: "off", size: "small", nodeId: "526:14129", file: "off-error-on-off-small.png" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:698", file: "off-error-off-off-medium.png" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "small", nodeId: "526:14139", file: "off-error-off-off-small.png" },
  { selected: "off", state: "error", border: "on", inverted: "on", size: "medium", nodeId: "360:688", file: "off-error-on-on-medium.png" },
  { selected: "off", state: "error", border: "on", inverted: "on", size: "small", nodeId: "526:14695", file: "off-error-on-on-small.png" },
  { selected: "off", state: "error", border: "off", inverted: "on", size: "medium", nodeId: "360:708", file: "off-error-off-on-medium.png" },
  { selected: "off", state: "error", border: "off", inverted: "on", size: "small", nodeId: "526:14705", file: "off-error-off-on-small.png" },
  { selected: "off", state: "disabled", border: "on", inverted: "off", size: "medium", nodeId: "360:718", file: "off-disabled-on-off-medium.png" },
  { selected: "off", state: "disabled", border: "on", inverted: "off", size: "small", nodeId: "526:14149", file: "off-disabled-on-off-small.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:736", file: "off-disabled-off-off-medium.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "small", nodeId: "526:14158", file: "off-disabled-off-off-small.png" },
  { selected: "off", state: "disabled", border: "on", inverted: "on", size: "medium", nodeId: "360:727", file: "off-disabled-on-on-medium.png" },
  { selected: "off", state: "disabled", border: "on", inverted: "on", size: "small", nodeId: "526:14715", file: "off-disabled-on-on-small.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "on", size: "medium", nodeId: "360:745", file: "off-disabled-off-on-medium.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "on", size: "small", nodeId: "526:14724", file: "off-disabled-off-on-small.png" },
  { selected: "on", state: "default", border: "on", inverted: "off", size: "medium", nodeId: "360:790", file: "on-default-on-off-medium.png" },
  { selected: "on", state: "default", border: "on", inverted: "off", size: "small", nodeId: "526:14167", file: "on-default-on-off-small.png" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:808", file: "on-default-off-off-medium.png" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "small", nodeId: "526:14176", file: "on-default-off-off-small.png" },
  { selected: "on", state: "default", border: "on", inverted: "on", size: "medium", nodeId: "360:799", file: "on-default-on-on-medium.png" },
  { selected: "on", state: "default", border: "on", inverted: "on", size: "small", nodeId: "526:14733", file: "on-default-on-on-small.png" },
  { selected: "on", state: "default", border: "off", inverted: "on", size: "medium", nodeId: "360:817", file: "on-default-off-on-medium.png" },
  { selected: "on", state: "default", border: "off", inverted: "on", size: "small", nodeId: "526:14742", file: "on-default-off-on-small.png" },
  { selected: "on", state: "error", border: "on", inverted: "off", size: "medium", nodeId: "360:826", file: "on-error-on-off-medium.png" },
  { selected: "on", state: "error", border: "on", inverted: "off", size: "small", nodeId: "526:14185", file: "on-error-on-off-small.png" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:846", file: "on-error-off-off-medium.png" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "small", nodeId: "526:14195", file: "on-error-off-off-small.png" },
  { selected: "on", state: "error", border: "on", inverted: "on", size: "medium", nodeId: "360:836", file: "on-error-on-on-medium.png" },
  { selected: "on", state: "error", border: "on", inverted: "on", size: "small", nodeId: "526:14751", file: "on-error-on-on-small.png" },
  { selected: "on", state: "error", border: "off", inverted: "on", size: "medium", nodeId: "360:856", file: "on-error-off-on-medium.png" },
  { selected: "on", state: "error", border: "off", inverted: "on", size: "small", nodeId: "526:14761", file: "on-error-off-on-small.png" },
  { selected: "on", state: "disabled", border: "on", inverted: "off", size: "medium", nodeId: "360:866", file: "on-disabled-on-off-medium.png" },
  { selected: "on", state: "disabled", border: "on", inverted: "off", size: "small", nodeId: "526:14205", file: "on-disabled-on-off-small.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:884", file: "on-disabled-off-off-medium.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "small", nodeId: "526:14214", file: "on-disabled-off-off-small.png" },
  { selected: "on", state: "disabled", border: "on", inverted: "on", size: "medium", nodeId: "360:875", file: "on-disabled-on-on-medium.png" },
  { selected: "on", state: "disabled", border: "on", inverted: "on", size: "small", nodeId: "526:14771", file: "on-disabled-on-on-small.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "on", size: "medium", nodeId: "360:893", file: "on-disabled-off-on-medium.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "on", size: "small", nodeId: "526:14780", file: "on-disabled-off-on-small.png" },
];

export function getVariantFile(
  selected: string,
  state: string,
  border: string,
  inverted: string,
  size: string,
): string {
  return `${selected}-${state}-${border}-${inverted}-${size}.png`;
}
```

**Step 2: Commit**

```bash
git add src/lib/components-data/radio-v2-variants.ts
git commit -m "feat: add Radio v2 variant mapping with all 48 Figma node IDs"
```

---

### Task 3: Create the Radio v2 spec file

**Files:**
- Create: `src/lib/components-data/radio-v2.ts`

**Step 1: Create the spec**

```ts
import { type ComponentSpec } from "./types";

export const radioV2Spec: ComponentSpec = {
  slug: "radio-v2",
  name: "Radio v2",
  description:
    "Pixel-perfect Figma reference for the Radio component. All previews are exported directly from Figma at 2x scale — no approximation.",
  status: "stable",
  figmaLink: "https://figma.com/file/flowx-design-system/radio",
  lastUpdated: "2026-03-16",

  variants: [
    { name: "Default Unselected", description: "Standard radio in its unchecked state with border.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { name: "Default Selected", description: "Radio in its checked state with blue fill ring indicator.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { name: "Without Border", description: "Radio without the outer input container border.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { name: "Inverted", description: "Radio on dark/inverted background.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { name: "Error", description: "Radio in error state with red border indication.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { name: "Disabled", description: "Non-interactive radio with reduced opacity.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
  ],

  props: [
    { name: "selected", type: "boolean", default: "false", description: "Whether the radio is selected." },
    { name: "state", type: "string", default: '"default"', options: ["default", "error", "disabled"], description: "The visual and interaction state of the radio." },
    { name: "border", type: "boolean", default: "true", description: "Whether the input container has a visible border." },
    { name: "inverted", type: "boolean", default: "false", description: "Use inverted color scheme for dark backgrounds." },
    { name: "size", type: "string", default: '"medium"', options: ["small", "medium"], description: "The size of the radio component." },
    { name: "label", type: "string", description: "Text label displayed above the input." },
    { name: "value", type: "string", description: "The main text content next to the radio icon." },
  ],

  states: ["default", "error", "disabled"],
  sizes: ["small", "medium"],

  anatomy: [
    { part: "Label", description: "Text label positioned above the input container, providing context for the radio option." },
    { part: "Input Container", description: "The bordered frame (8px radius) wrapping the radio icon and text content." },
    { part: "Radio Icon", description: "The circular indicator — shows a stroke outline when unselected, filled blue ring when selected." },
    { part: "Value", description: "The primary text content displayed next to the radio icon." },
  ],

  guidelines: {
    do: [
      { description: "Use radio buttons for mutually exclusive choices where only one option can be selected." },
      { description: "Always provide a clear, descriptive label for each radio option." },
      { description: "Use the error state with a helper message to indicate a required selection." },
      { description: "Group related radio buttons vertically for easy scanning." },
      { description: "Always have one option pre-selected when a default is sensible." },
    ],
    dont: [
      { description: "Don't use radio buttons for multi-select scenarios — use Checkboxes instead." },
      { description: "Don't use radio buttons for binary on/off toggles — use a Switch instead." },
      { description: "Don't present more than 7 radio options — use a Select dropdown for long lists." },
      { description: "Don't disable radio buttons without explaining why via a tooltip." },
    ],
  },

  accessibility: {
    role: "radio",
    keyboard: [
      "Arrow Up/Left — Moves focus and selection to the previous radio in the group.",
      "Arrow Down/Right — Moves focus and selection to the next radio in the group.",
      "Tab — Moves focus to the next focusable element outside the radio group.",
      "Space — Selects the focused radio button if not already selected.",
    ],
    ariaAttributes: [
      "aria-checked — Indicates the current selection state (true/false).",
      "aria-disabled — Set to true when the radio is disabled.",
      "aria-label — Provide when there is no visible label text.",
      "role=radiogroup — Applied to the container wrapping the group of radio buttons.",
    ],
  },

  relatedComponents: ["radio", "checkbox", "switch", "select"],
};
```

**Step 2: Commit**

```bash
git add src/lib/components-data/radio-v2.ts
git commit -m "feat: add Radio v2 component spec"
```

---

### Task 4: Create the Radio v2 page

**Files:**
- Create: `src/app/components/radio-v2/page.tsx`

**Step 1: Create the directory**

```bash
mkdir -p src/app/components/radio-v2
```

**Step 2: Create the page file**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { radioV2Spec } from "@/lib/components-data/radio-v2";
import { getComponent } from "@/lib/components-data/registry";
import { getVariantFile } from "@/lib/components-data/radio-v2-variants";
import { Separator } from "@/components/ui/separator";
import { StatusBanner } from "@/components/docs/status-banner";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const radioTokens = [
  {
    name: "--color-primary",
    value: "Brand primary / selected ring fill (#006bd8)",
    preview: <div className="size-5 rounded-full bg-primary" />,
  },
  {
    name: "--color-destructive",
    value: "Error state border & radio fill (#eb4e33)",
    preview: <div className="size-5 rounded-full bg-destructive" />,
  },
  {
    name: "--color-input",
    value: "Unselected radio border (#cbd1db)",
    preview: <div className="size-5 rounded-full border-2 border-input" />,
  },
  {
    name: "--radius-lg",
    value: "0.5rem (input container)",
    preview: (
      <div className="size-5 rounded-lg border-2 border-foreground/30" />
    ),
  },
  {
    name: "--color-blue-50",
    value: "Selected container background (#e6f0fb)",
    preview: (
      <div className="size-5 rounded" style={{ backgroundColor: "#e6f0fb" }} />
    ),
  },
  {
    name: "--color-muted-foreground",
    value: "Disabled text color (#64748b)",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function RadioV2Page() {
  const spec = radioV2Spec;

  const [selected, setSelected] = useState("off");
  const [variantState, setVariantState] = useState("default");
  const [border, setBorder] = useState("on");
  const [inverted, setInverted] = useState("off");
  const [size, setSize] = useState("medium");

  const currentFile = getVariantFile(selected, variantState, border, inverted, size);
  const variantLabel = `Selected=${selected === "on" ? "On" : "Off"}, State=${variantState.charAt(0).toUpperCase() + variantState.slice(1)}, Border=${border === "on" ? "On" : "Off"}, Inverted=${inverted === "on" ? "On" : "Off"}, Size=${size.charAt(0).toUpperCase() + size.slice(1)}`;

  return (
    <div className="space-y-10">
      {/* 1. Status Banner */}
      <StatusBanner
        name={spec.name}
        status={spec.status}
        figmaLink={spec.figmaLink}
        lastUpdated={spec.lastUpdated}
      />

      {/* 2. Title + Description */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {spec.description}
        </p>
      </div>

      <Separator />

      {/* 3. Interactive Variant Selector */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variant Explorer</h2>
        <p className="text-sm text-muted-foreground">
          Each preview below is exported directly from Figma at 2x scale — pixel-perfect, no approximation.
        </p>

        {/* Selector controls */}
        <div className="flex flex-wrap gap-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Selected</span>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">State</span>
            <select
              value={variantState}
              onChange={(e) => setVariantState(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="default">Default</option>
              <option value="error">Error</option>
              <option value="disabled">Disabled</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Border</span>
            <select
              value={border}
              onChange={(e) => setBorder(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="on">On</option>
              <option value="off">Off</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Inverted</span>
            <select
              value={inverted}
              onChange={(e) => setInverted(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground">Size</span>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="rounded-md border bg-background px-3 py-1.5 text-sm"
            >
              <option value="medium">Medium</option>
              <option value="small">Small</option>
            </select>
          </label>
        </div>

        {/* Preview card */}
        <div
          className={`inline-flex flex-col items-center gap-3 rounded-lg border p-8 ${
            inverted === "on"
              ? "border-neutral-700 bg-neutral-900"
              : "bg-white"
          }`}
        >
          <Image
            src={`/figma-exports/radio/${currentFile}`}
            alt={variantLabel}
            width={348}
            height={124}
            className="object-contain"
            style={{ imageRendering: "auto", maxHeight: 124 }}
            unoptimized
          />
          <p className="text-xs text-muted-foreground font-mono">
            {variantLabel}
          </p>
        </div>
      </section>

      <Separator />

      {/* 4. Light Variants Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">All Light Variants</h2>
        <p className="text-sm text-muted-foreground">
          Complete grid of all non-inverted Radio variants as exported from Figma.
        </p>
        <div className="overflow-x-auto rounded-lg border bg-white p-4">
          <Image
            src="/figma-exports/radio/grid-light.png"
            alt="All light Radio variants from Figma"
            width={1880}
            height={900}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </section>

      <Separator />

      {/* 5. Inverted Variants Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">All Inverted Variants</h2>
        <p className="text-sm text-muted-foreground">
          Complete grid of all inverted (dark background) Radio variants as exported from Figma.
        </p>
        <div className="overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-900 p-4">
          <Image
            src="/figma-exports/radio/grid-inverted.png"
            alt="All inverted Radio variants from Figma"
            width={1880}
            height={900}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </section>

      <Separator />

      {/* 6. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      <Separator />

      {/* 7. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      <Separator />

      {/* 8. Dos and Don'ts */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      <Separator />

      {/* 9. Accessibility */}
      {spec.accessibility && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Accessibility</h2>
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
                  <h3 className="text-sm font-semibold">Keyboard Interactions</h3>
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
        </section>
      )}

      <Separator />

      {/* 10. Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design Tokens Used</h2>
        <TokenTable tokens={radioTokens} />
      </section>

      <Separator />

      {/* 11. Related Components */}
      {spec.relatedComponents && spec.relatedComponents.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Components</h2>
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
        </section>
      )}
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add src/app/components/radio-v2/
git commit -m "feat: add Radio v2 page with image-based variant selector"
```

---

### Task 5: Register Radio v2 and cross-link

**Files:**
- Modify: `src/lib/components-data/registry.ts`
- Modify: `src/lib/components-data/radio.ts`

**Step 1: Add radioV2Spec to registry**

In `src/lib/components-data/registry.ts`, add:

```ts
import { radioV2Spec } from "./radio-v2";
```

And append `radioV2Spec` to the `componentRegistry` array.

**Step 2: Cross-link from Radio v1**

In `src/lib/components-data/radio.ts`, change:

```ts
relatedComponents: ["checkbox", "switch", "select"],
```

to:

```ts
relatedComponents: ["radio-v2", "checkbox", "switch", "select"],
```

**Step 3: Commit**

```bash
git add src/lib/components-data/registry.ts src/lib/components-data/radio.ts
git commit -m "feat: register Radio v2 in sidebar and cross-link with v1"
```

---

### Task 6: Build and verify

**Step 1: Run the build**

```bash
npm run build
```

Expected: Build passes, `/components/radio-v2` appears in the route list.

**Step 2: Verify checklist**

- [ ] Build passes with no errors
- [ ] `/components/radio-v2` route exists
- [ ] Radio v2 appears in sidebar navigation
- [ ] All 48 variant images load in the selector
- [ ] Grid images display correctly (light on white, inverted on dark)
- [ ] Dropdown controls swap the preview image
- [ ] PropsTable, AnatomyDiagram, DosAndDonts, Accessibility, TokenTable all render
- [ ] Related Components links work (Radio v1 link navigates correctly)

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address Radio v2 build issues"
```
