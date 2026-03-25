# ComponentSpec Reference

Type system and data assembly conventions for FLX DS component specs.

## Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `slug` | string | yes | Lowercase kebab-case from Figma name ("Input Field" -> `input-field`) |
| `name` | string | yes | Display name from Figma |
| `description` | string | yes | One sentence describing the component |
| `status` | `"stable" \| "beta" \| "deprecated" \| "planned"` | yes | Use "stable" for new components |
| `figmaLink` | string | no | URL: `https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id}` (colon -> dash in node ID). Find node ID via `mcp__Vibma__search_nodes` with `types: ["COMPONENT_SET"]` |
| `lastUpdated` | string | no | YYYY-MM-DD format, today's date |
| `variants` | `{ name, useCase, props: Record<string, string> }[]` | yes | One per visual use case |
| `props` | `{ name, type, default?, options?, description }[]` | yes | One per variant axis + toggleable elements + content props |
| `states` | `string[]` | yes | From "State" axis values |
| `sizes` | `string[]` | no | From "Size" axis values |
| `anatomy` | `{ part, description }[]` | no | Named parts of the component |
| `elements` | `ElementSpec[]` | no | Detailed element specs (v2 extraction) |
| `variantStyles` | `VariantStyle[]` | no | Per-variant visual styles (v2 extraction) |
| `tokenBindings` | `TokenBinding[]` | no | Figma variable bindings |
| `guidelines` | `{ do: [{description, example?}], dont: [{description, example?}] }` | no | Usage do/don't rules |
| `accessibility` | `{ role?, keyboard?, ariaAttributes? }` | no | ARIA and keyboard info |
| `relatedComponents` | `string[]` | no | Slugs of related components in registry |

## ElementSpec

```typescript
interface ElementSpec {
  part: string;           // Named layer from Figma
  description: string;
  layout?: ElementLayout; // direction, sizingH/V, padding, spacing, alignment, wrap
  dimensions?: ElementDimensions; // width, height (ONLY if FIXED sizing), cornerRadius
  typography?: ElementTypography; // fontSize, lineHeight, fontWeight, fontFamily, letterSpacing
  toggleable?: boolean;   // Controlled by boolean component property
  defaultVisible?: boolean;
  toggleProperty?: string;
  swappable?: boolean;    // Instance swap slot
  swapProperty?: string;
}
```

## VariantStyle

```typescript
interface VariantStyle {
  variantProps: Record<string, string>; // e.g. { Selected: "On", State: "Error" }
  elements: Record<string, ElementStyle>;
}

interface ElementStyle {
  fill?: string;          // Hex color
  fillToken?: string;     // Token name
  stroke?: string;        // Hex color
  strokeToken?: string;
  strokeWidth?: number;
  textColor?: string;     // Hex color
  textColorToken?: string;
  opacity?: number;
  cornerRadius?: number;
  width?: number;
  height?: number;
  visible?: boolean;      // For toggleable elements
  svg?: string;           // SVG markup for icons
  fontSize?: number;      // Typography overrides (when varies by variant)
  lineHeight?: number;
  fontWeight?: number;
}
```

## TokenBinding

```typescript
interface TokenBinding {
  element: string;        // Element part name
  property: string;       // CSS property (fills, paddingLeft, cornerRadius, etc.)
  variableName: string;   // Figma variable name (e.g. "blue/500", "scale/12")
  resolvedValue: string;  // Resolved value (hex or number as string)
}
```

## Data Assembly Rules

- **Base variant**: all-default axis values, all toggleable elements ON (visible).
- **elements array**: one ElementSpec per named layer from base variant.
  - `layout`: from Pass 2 (direction, sizingH/V, padding, spacing, alignment, wrap).
  - `dimensions`: width/height ONLY if sizing is FIXED (not HUG/FILL), cornerRadius.
  - `typography`: from Pass 3a (fontSize, lineHeight, fontWeight, fontFamily).
  - Mark `toggleable: true` + `toggleProperty` for boolean-controlled elements.
  - Mark `swappable: true` + `swapProperty` for instance swap slots.
- **variantStyles array**: one entry per variant (ALL variants, no exceptions).
  - Every `fill` must have paired `fillToken`.
  - Every `stroke` must have paired `strokeToken` + `strokeWidth`.
  - Every `textColor` must have paired `textColorToken`.
  - Toggleable elements: always include `visible: true/false`.
  - Typography varying by variant: add fontSize/lineHeight/fontWeight overrides.
- **tokenBindings**: deduplicated, one per unique element+property+token combination.

## Validation Checklist

- `variantStyles` count matches total variant count from Pass 1.
- Every axis value combination covered in variantStyles.
- Every element in `elements` has entries in every variantStyles entry.
- Every fill/stroke/textColor has paired token name.
- No placeholder or guessed values -- everything from MCP data.
- All toggleable elements marked + have `visible` in variant styles.
- Typography from `scan_text_nodes` only, never from bounding boxes.
- Icons from node info only, never approximated.
- Shared sub-components used for Label, Description, Error Icon -- no inline duplicates.

## Conventions

- **Slug**: lowercase kebab-case ("Input Field" -> `input-field`, "Checkbox Group" -> `checkbox-group`).
- **figmaLink**: `https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id={id}` where `{id}` has colon replaced with dash. Use `mcp__Vibma__search_nodes` with `types: ["COMPONENT_SET"]` to find the node ID.
- **Date**: YYYY-MM-DD.
- **File path**: `src/lib/components-data/[slug].ts`.
- **Export**: `[camelCase]Spec: ComponentSpec` (e.g., `inputFieldSpec`, `checkboxSpec`).
- **Registry**: add import + entry to `src/lib/components-data/registry.ts`.
