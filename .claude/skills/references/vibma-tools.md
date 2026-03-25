# Vibma MCP Tools Reference

Reference for Claude Code skills using Vibma MCP tools during the 7-pass Figma extraction pipeline.

---

## Tool Reference

| Tool | Purpose | Key Params | Gotchas |
|------|---------|------------|---------|
| `mcp__Vibma__get_selection` | Enumerate variant IDs + axes | `depth: 1` | Must select component SET, not single variant |
| `mcp__Vibma__get_node_info` | Layout, fills, strokes, dimensions | `depth: -1`, full fields list (see below) | Batch 5-10 node IDs per call |
| `mcp__Vibma__scan_text_nodes` | Typography (fontSize, fontFamily, fontWeight, lineHeight, letterSpacing) | variant node IDs | Does NOT return text colors -- must follow up with get_node_info |
| `mcp__Vibma__get_node_variables` | Token bindings (variable name to property) | variant node IDs, walk element tree | One per variant |
| `mcp__Vibma__search_nodes` | Find vector/icon nodes | `types: ["VECTOR", "BOOLEAN_OPERATION"]` | Use with get_node_info for path data |
| `mcp__Vibma__export_node_as_image` | Screenshots and icon reference PNGs | `format: "PNG"`, `scale: 2` | NEVER use SVG format -- causes API 400 errors |
| `mcp__Vibma__lint_node` | Quality checks (hardcoded colors, WCAG, auto-layout) | component set node ID | Use findings for guidelines/accessibility |

---

## Critical Warnings

> **`scan_text_nodes` does NOT return text colors.**
> After running scan_text_nodes (Pass 3a), you MUST run `get_node_info` with `fields: ["name", "fills"]` and `depth: 0` on every text node ID to get text colors (Pass 3b). This is the #1 cause of color mismatches.

> **Never export as SVG format.**
> The Claude API cannot process SVG images and returns a 400 error. Always use PNG format for reference images. To get SVG path data for inline icons, use `get_node_info` with `depth: -1` on the vector node.

> **Never guess or estimate values.**
> Always query Figma directly. Do not estimate typography from bounding boxes, do not assume proportional scaling, do not reuse values from other components.

> **Transparent elements have NO fills.**
> If an element has no fills array or an empty fills array, it is transparent. Do NOT invent a fill color.

---

## Batching Guidance

- **get_node_info (Pass 2):** batch 5-10 variant node IDs per call
- **Text color fills (Pass 3b):** batch 10-15 text node IDs per call with `fields: ["name", "fills"]`, `depth: 0`
- **get_node_variables (Pass 4):** walk element tree per variant

---

## Pass 2 Fields List

The exact `fields` parameter array for `get_node_info` calls in Pass 2:

```json
["name", "type", "visible", "children", "fills", "strokes", "strokeWeight", "cornerRadius", "absoluteBoundingBox", "relativeTransform", "layoutMode", "layoutSizingHorizontal", "layoutSizingVertical", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "itemSpacing", "counterAxisSpacing", "primaryAxisAlignItems", "counterAxisAlignItems", "layoutWrap", "opacity", "constraints", "componentProperties"]
```

---

## Seven-Pass Summary

**Pass 1 -- Enumerate** (`get_selection`)
Component set name, node ID, all child variant IDs, axis names/values, boolean/swap properties.

**Pass 2 -- Structure** (`get_node_info`)
Layout mode/sizing, padding, spacing, alignment, dimensions, fills, strokes, opacity, visibility, componentProperties per element per variant.

**Pass 3a -- Typography** (`scan_text_nodes`)
fontSize, fontFamily, fontStyle, fontWeight, lineHeight, letterSpacing per text node per variant. Save all text node IDs.

**Pass 3b -- Text Colors** (`get_node_info`)
fills[0].color converted to hex for every text node ID collected in 3a.

**Pass 4 -- Tokens** (`get_node_variables`)
Variable name to property mappings per element per variant.

**Pass 5 -- Icons** (`search_nodes` + `get_node_info` + `export_node_as_image`)
Vector node dimensions, fill/stroke colors, SVG path data via get_node_info, PNG reference via export_node_as_image.

**Pass 6 -- Screenshot** (`export_node_as_image`)
PNG at scale 2 of component set -- visual source of truth.

**Pass 7 -- Lint** (`lint_node`)
Hardcoded colors, WCAG issues, auto-layout warnings.
