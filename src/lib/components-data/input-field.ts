import { type ComponentSpec } from "./types";

export const inputFieldSpec: ComponentSpec = {
  slug: "input-field",
  name: "Input Field",
  description: "Text input for collecting user data with label, placeholder, prefix/suffix, and icon slots.",
  status: "stable",
  figmaLink: "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=90-3228",
  lastUpdated: "2026-03-16",

  variants: [
    { name: "Default", useCase: "The standard empty input, ready for user entry.", props: { state: "default", filled: "off", inverted: "off" } },
    { name: "Filled", useCase: "Shows user-entered content in its resting state.", props: { state: "default", filled: "on", inverted: "off" } },
    { name: "Focused", useCase: "Active typing state with focus ring — shown for visual reference.", props: { state: "focused", filled: "off", inverted: "off" } },
    { name: "With Validation Error", useCase: "Show when form validation fails after submission.", props: { state: "error", filled: "off", inverted: "off" } },
    { name: "Disabled", useCase: "Use when the field should be visible but not editable.", props: { state: "disabled", filled: "off", inverted: "off" } },
    { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { state: "default", filled: "off", inverted: "on" } },
  ],

  props: [
    { name: "state", type: "string", default: '"default"', options: ["default", "focused", "error", "disabled"], description: "The visual and interaction state of the input." },
    { name: "filled", type: "boolean", default: "false", description: "Whether the input contains user-entered text (as opposed to showing placeholder)." },
    { name: "size", type: "string", default: '"medium"', options: ["small", "medium"], description: "The size of the input field." },
    { name: "inverted", type: "boolean", default: "false", description: "Use inverted color scheme for dark backgrounds." },
    { name: "hasTopLabel", type: "boolean", default: "true", description: "Whether a label is displayed above the input." },
    { name: "hasSideLabel", type: "boolean", default: "false", description: "Whether a label is displayed to the side of the input." },
    { name: "hasIconStart", type: "boolean", default: "false", description: "Whether an icon is shown at the start of the input." },
    { name: "hasIconEnd", type: "boolean", default: "false", description: "Whether an icon is shown at the end of the input." },
    { name: "hasPrefix", type: "boolean", default: "false", description: "Whether prefix text is shown before the input value." },
    { name: "hasSuffix", type: "boolean", default: "false", description: "Whether suffix text is shown after the input value." },
    { name: "hasDescription", type: "boolean", default: "false", description: "Whether helper/description text is shown below the input." },
    { name: "placeholder", type: "string", description: "Placeholder text displayed when input is empty." },
    { name: "value", type: "string", description: "The current text value of the input." },
  ],

  states: ["default", "hover", "focused", "error", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    { part: "Label", description: "Text label positioned above the input, providing context for the field." },
    { part: "Info Icon", description: "Optional icon next to the label for additional information or tooltips." },
    { part: "Input Container", description: "The bordered frame (8px radius) wrapping the input content and icons." },
    { part: "Icon Start", description: "Optional icon displayed at the start (left) of the input container." },
    { part: "Prefix", description: "Optional text displayed before the input value (e.g., currency symbol)." },
    { part: "Input Text / Placeholder", description: "The editable text area showing the value or placeholder text." },
    { part: "Suffix", description: "Optional text displayed after the input value (e.g., unit)." },
    { part: "Icon End", description: "Optional icon displayed at the end (right) of the input container." },
    { part: "Description", description: "Optional helper or error text displayed below the input container." },
  ],

  guidelines: {
    do: [
      { description: "Always provide a visible label for the input field." },
      { description: "Use error state with helper text for validation feedback." },
      { description: "Use prefix/suffix for formatting context (e.g., currency, units)." },
      { description: "Use appropriate size for the context — small for dense layouts, medium for forms." },
    ],
    dont: [
      { description: "Don't use placeholder as a replacement for labels." },
      { description: "Don't disable without providing an explanation to the user." },
      { description: "Don't use for multi-line text — use Textarea instead." },
      { description: "Don't omit error messaging when the input is in error state." },
    ],
  },

  accessibility: {
    role: "textbox",
    keyboard: [
      "Tab — Moves focus to the input field.",
      "Shift+Tab — Moves focus to the previous focusable element.",
      "Standard text input keys — Type, select, copy, paste within the field.",
    ],
    ariaAttributes: [
      "aria-invalid — Set to true when the input is in error state.",
      "aria-disabled — Set to true when the input is disabled.",
      "aria-label — Provide when there is no visible label text.",
      "aria-describedby — Reference to description or error text when present.",
      "aria-required — Indicates whether the input is required.",
    ],
  },

  relatedComponents: ["textarea", "select", "checkbox"],

  /* ------------------------------------------------------------------ */
  /*  Elements — structural/typography specs per named layer              */
  /* ------------------------------------------------------------------ */

  elements: [
    {
      part: "Wrapper",
      description: "Outer vertical stack (label + container + description)",
      layout: {
        direction: "VERTICAL",
        sizingH: "HUG",
        sizingV: "HUG",
        itemSpacing: 2,
      },
      dimensions: { minWidth: 200 },
    },
    {
      part: "Label",
      description: "Text label above the input",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 600, fontFamily: "Open Sans" },
    },
    {
      part: "InfoIcon",
      description: "Info icon next to the label",
      dimensions: { width: 14, height: 14 },
    },
    {
      part: "InputContainer",
      description: "Bordered frame wrapping input content and icons",
      layout: {
        direction: "HORIZONTAL",
        sizingH: "FILL",
        sizingV: "FIXED",
        padding: { top: 0, right: 8, bottom: 0, left: 8 },
        itemSpacing: 6,
        counterAlign: "CENTER",
      },
      dimensions: { height: 36, cornerRadius: 8 },
    },
    {
      part: "ValueText",
      description: "The input value text",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "Placeholder",
      description: "Placeholder text when input is empty",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "PrefixSuffix",
      description: "Prefix or suffix text inside the input container",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "IconStart",
      description: "Optional leading icon",
      dimensions: { width: 16, height: 16 },
    },
    {
      part: "IconEnd",
      description: "Optional trailing icon",
      dimensions: { width: 16, height: 16 },
    },
    {
      part: "Description",
      description: "Helper or error text below the input",
      typography: { fontSize: 12, lineHeight: 16, fontWeight: 400, fontFamily: "Open Sans" },
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  Variant styles — every State × Size × Inverted combination          */
  /*  Colors extracted via Vibma get_node_info (fills) on each variant.   */
  /*  Typography extracted via Vibma scan_text_nodes on each variant.     */
  /*  Hover has no Figma variant — border colors from interaction spec,   */
  /*  all other colors match Default.                                     */
  /* ------------------------------------------------------------------ */

  variantStyles: [
    // ── Default × Medium × Off ──
    {
      variantProps: { State: "Default", Size: "Medium", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#e3e8ed", strokeWidth: 1, height: 36 },
        Label: { textColor: "#1d232c", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Default × Medium × On ──  (container has no fill in Figma — transparent)
    {
      variantProps: { State: "Default", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#64748b", strokeWidth: 1, height: 36 },
        Label: { textColor: "#ffffff", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#a6b0be", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Default × Small × Off ──
    {
      variantProps: { State: "Default", Size: "Small", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#e3e8ed", strokeWidth: 1, height: 28 },
        Label: { textColor: "#1d232c", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
    // ── Default × Small × On ──
    {
      variantProps: { State: "Default", Size: "Small", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#64748b", strokeWidth: 1, height: 28 },
        Label: { textColor: "#ffffff", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#a6b0be", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },

    // ── Hover × Medium × Off ──  (no Figma variant — border from interaction spec)
    {
      variantProps: { State: "Hover", Size: "Medium", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#cbd1db", strokeWidth: 1, height: 36 },
        Label: { textColor: "#1d232c", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Hover × Medium × On ──
    {
      variantProps: { State: "Hover", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#8390a2", strokeWidth: 1, height: 36 },
        Label: { textColor: "#ffffff", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#a6b0be", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Hover × Small × Off ──
    {
      variantProps: { State: "Hover", Size: "Small", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#cbd1db", strokeWidth: 1, height: 28 },
        Label: { textColor: "#1d232c", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
    // ── Hover × Small × On ──
    {
      variantProps: { State: "Hover", Size: "Small", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#8390a2", strokeWidth: 1, height: 28 },
        Label: { textColor: "#ffffff", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#a6b0be", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },

    // ── Focused × Medium × Off ──
    {
      variantProps: { State: "Focused", Size: "Medium", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#006bd8", strokeWidth: 1, height: 36 },
        Label: { textColor: "#1d232c", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Focused × Medium × On ──
    {
      variantProps: { State: "Focused", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#006bd8", strokeWidth: 1, height: 36 },
        Label: { textColor: "#ffffff", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#a6b0be", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Focused × Small × Off ──
    {
      variantProps: { State: "Focused", Size: "Small", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#006bd8", strokeWidth: 1, height: 28 },
        Label: { textColor: "#1d232c", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
    // ── Focused × Small × On ──
    {
      variantProps: { State: "Focused", Size: "Small", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#006bd8", strokeWidth: 1, height: 28 },
        Label: { textColor: "#ffffff", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#a6b0be", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },

    // ── Error × Medium × Off ──
    {
      variantProps: { State: "Error", Size: "Medium", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#e62200", strokeWidth: 1, height: 36 },
        Label: { textColor: "#1d232c", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Error × Medium × On ──
    {
      variantProps: { State: "Error", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#eb4e33", strokeWidth: 1, height: 36 },
        Label: { textColor: "#ffffff", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#a6b0be", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Error × Small × Off ──
    {
      variantProps: { State: "Error", Size: "Small", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#ffffff", stroke: "#e62200", strokeWidth: 1, height: 28 },
        Label: { textColor: "#1d232c", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#1d232c", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
    // ── Error × Small × On ──
    {
      variantProps: { State: "Error", Size: "Small", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#eb4e33", strokeWidth: 1, height: 28 },
        Label: { textColor: "#ffffff", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#a6b0be", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },

    // ── Disabled × Medium × Off ──
    {
      variantProps: { State: "Disabled", Size: "Medium", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#e3e8ed", stroke: "#e3e8ed", strokeWidth: 1, height: 36 },
        Label: { textColor: "#8390a2", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#5b6a7e", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#8390a2", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Disabled × Medium × On ──
    {
      variantProps: { State: "Disabled", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { fill: "#475263", stroke: "#5b6a7e", strokeWidth: 1, height: 36 },
        Label: { textColor: "#64748b", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#cbd1db", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#8390a2", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
        IconEnd: { width: 16, height: 16 },
      },
    },
    // ── Disabled × Small × Off ──
    {
      variantProps: { State: "Disabled", Size: "Small", Inverted: "Off" },
      elements: {
        InputContainer: { fill: "#e3e8ed", stroke: "#e3e8ed", strokeWidth: 1, height: 28 },
        Label: { textColor: "#8390a2", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#5b6a7e", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
    // ── Disabled × Small × On ──
    {
      variantProps: { State: "Disabled", Size: "Small", Inverted: "On" },
      elements: {
        InputContainer: { fill: "#475263", stroke: "#5b6a7e", strokeWidth: 1, height: 28 },
        Label: { textColor: "#64748b", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        ValueText: { textColor: "#cbd1db", fontSize: 12, lineHeight: 16 },
        Placeholder: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
        IconEnd: { width: 14, height: 14 },
      },
    },
  ],
};
