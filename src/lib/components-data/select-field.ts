import { type ComponentSpec } from "./types";

export const selectFieldSpec: ComponentSpec = {
  slug: "select-field",
  name: "Select Field",
  description: "Dropdown selector for choosing one or more options from a list, with chip-based multi-select support.",
  status: "stable",
  figmaLink: "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=164-3973",
  lastUpdated: "2026-03-17",

  variants: [
    { name: "Default", useCase: "The standard empty select, ready for user selection.", props: { state: "default", filled: "off", inverted: "off" } },
    { name: "Filled", useCase: "Shows selected options as chips in the input area.", props: { state: "default", filled: "on", inverted: "off" } },
    { name: "Focused", useCase: "Active state when the dropdown is open or the field has focus.", props: { state: "focused", filled: "off", inverted: "off" } },
    { name: "With Validation Error", useCase: "Show when form validation fails after submission.", props: { state: "error", filled: "off", inverted: "off" } },
    { name: "Disabled", useCase: "Use when the field should be visible but not interactive.", props: { state: "disabled", filled: "off", inverted: "off" } },
    { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { state: "default", filled: "off", inverted: "on" } },
  ],

  props: [
    { name: "state", type: "string", default: '"default"', options: ["default", "focused", "error", "disabled"], description: "The visual and interaction state of the select field." },
    { name: "filled", type: "boolean", default: "false", description: "Whether the select has chosen values (shows chips instead of placeholder)." },
    { name: "size", type: "string", default: '"medium"', options: ["small", "medium"], description: "The size of the select field." },
    { name: "inverted", type: "boolean", default: "false", description: "Use inverted color scheme for dark backgrounds." },
    { name: "hasLabel", type: "boolean", default: "true", description: "Whether a label is displayed above the select." },
    { name: "hasDescription", type: "boolean", default: "false", description: "Whether helper/description text is shown below the select." },
    { name: "hasPrefix", type: "boolean", default: "false", description: "Whether prefix text is shown before the placeholder/chips." },
    { name: "hasSuffix", type: "boolean", default: "false", description: "Whether suffix text is shown after the placeholder/chips." },
    { name: "hasIconStart", type: "boolean", default: "false", description: "Whether an icon is shown at the start of the input." },
    { name: "placeholder", type: "string", description: "Placeholder text displayed when no options are selected." },
  ],

  states: ["default", "focused", "error", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    { part: "Label", description: "Text label positioned above the select, providing context for the field." },
    { part: "Info Icon", description: "Optional icon next to the label for additional information or tooltips." },
    { part: "Input Container", description: "The bordered frame (8px radius) wrapping the select content and caret." },
    { part: "Icon Start", description: "Optional icon displayed at the start (left) of the input container." },
    { part: "Prefix", description: "Optional text displayed before the placeholder or chips." },
    { part: "Placeholder / Chips", description: "Shows placeholder text when empty, or selected-option chips when filled." },
    { part: "Suffix", description: "Optional text displayed after the placeholder or chips." },
    { part: "Error Icon", description: "Warning icon shown in error state (WarningCircle)." },
    { part: "Caret Down", description: "Dropdown arrow icon at the end of the input container." },
    { part: "Chip Group", description: "Horizontal wrapping container for selected-option chips (visible when filled)." },
    { part: "Chip", description: "Individual tag showing a selected option with a removable X icon." },
    { part: "Chip Count", description: "Overflow counter showing how many additional options are selected (e.g. '+ 20')." },
    { part: "Description", description: "Optional helper or error text displayed below the input container." },
  ],

  guidelines: {
    do: [
      { description: "Always provide a visible label for the select field." },
      { description: "Use when there are 4+ options to choose from." },
      { description: "Use chips to show multi-select values so users can remove individual selections." },
      { description: "Use error state with helper text for validation feedback." },
      { description: "Use appropriate size for the context — small for dense layouts, medium for forms." },
    ],
    dont: [
      { description: "Don't use for binary choices — use Switch or Checkbox instead." },
      { description: "Don't use for fewer than 4 options — consider Radio buttons." },
      { description: "Don't disable without providing an explanation to the user." },
      { description: "Don't use placeholder as a replacement for labels." },
    ],
  },

  accessibility: {
    role: "combobox",
    keyboard: [
      "Tab — Moves focus to the select field.",
      "Enter / Space — Opens the dropdown or selects an option.",
      "Arrow Up / Down — Navigate options in the dropdown.",
      "Escape — Closes the dropdown without selecting.",
      "Backspace — Removes the last selected chip (when focused and filled).",
    ],
    ariaAttributes: [
      "aria-expanded — Set to true when dropdown is open.",
      "aria-haspopup — Set to 'listbox' to indicate dropdown.",
      "aria-invalid — Set to true when the select is in error state.",
      "aria-disabled — Set to true when the select is disabled.",
      "aria-label — Provide when there is no visible label text.",
      "aria-describedby — Reference to description or error text when present.",
      "aria-multiselectable — Set to true when multiple options can be selected.",
    ],
  },

  relatedComponents: ["input-field", "checkbox", "radio-v3"],

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
      description: "Text label above the select",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 600, fontFamily: "Open Sans" },
    },
    {
      part: "InfoIcon",
      description: "Info icon next to the label",
      dimensions: { width: 14, height: 14 },
    },
    {
      part: "InputContainer",
      description: "Bordered frame wrapping select content and caret icon",
      layout: {
        direction: "HORIZONTAL",
        sizingH: "FILL",
        sizingV: "FIXED",
        padding: { top: 6, right: 12, bottom: 6, left: 12 },
        itemSpacing: 6,
        counterAlign: "CENTER",
      },
      dimensions: { height: 36, cornerRadius: 8 },
    },
    {
      part: "ValueText",
      description: "The selected value text (single-select mode)",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "Placeholder",
      description: "Placeholder text when no options are selected",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "PrefixSuffix",
      description: "Prefix or suffix text inside the input container",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "Chip",
      description: "Individual selected-option tag",
      layout: {
        direction: "HORIZONTAL",
        itemSpacing: 4,
        padding: { top: 2, right: 6, bottom: 2, left: 6 },
      },
      dimensions: { cornerRadius: 8 },
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "ChipCount",
      description: "Overflow counter for extra selected options",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "CaretDown",
      description: "Dropdown arrow icon",
      dimensions: { width: 24, height: 24 },
    },
    {
      part: "IconStart",
      description: "Optional leading icon",
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
      },
    },
    // ── Default × Medium × On ──  (container has no fill — transparent)
    {
      variantProps: { State: "Default", Size: "Medium", Inverted: "On" },
      elements: {
        InputContainer: { stroke: "#64748b", strokeWidth: 1, height: 36 },
        Label: { textColor: "#ffffff", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ValueText: { textColor: "#ffffff", fontSize: 14, lineHeight: 24 },
        Placeholder: { textColor: "#a6b0be", fontSize: 14, lineHeight: 24 },
        PrefixSuffix: { textColor: "#64748b", fontSize: 14, lineHeight: 24 },
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#6b7789", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#8390a2", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#e62200", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 8, fontSize: 14, lineHeight: 24 },
        ChipCount: { textColor: "#006bd8", fontSize: 14, lineHeight: 24 },
        CaretDown: { width: 24, height: 24 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 14, height: 14 },
        IconStart: { width: 16, height: 16 },
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
        Chip: { fill: "#e3e8ed", textColor: "#000000", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
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
        Chip: { fill: "#475263", textColor: "#ffffff", cornerRadius: 6, fontSize: 12, lineHeight: 16 },
        ChipCount: { textColor: "#006bd8", fontSize: 12, lineHeight: 16 },
        CaretDown: { width: 16, height: 16 },
        Description: { textColor: "#64748b", fontSize: 12, lineHeight: 16 },
        InfoIcon: { width: 12, height: 12 },
        IconStart: { width: 14, height: 14 },
      },
    },
  ],
};
