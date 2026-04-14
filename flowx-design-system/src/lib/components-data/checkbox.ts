import { type ComponentSpec } from "./types";

export const checkboxSpec: ComponentSpec = {
  slug: "checkbox",
  name: "Checkbox",
  description:
    "Lets users select one or more options from a list, or toggle a single setting on/off.",
  status: "stable",
  figmaLink:
    "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=349-2686",
  lastUpdated: "2026-03-17",

  variants: [
    { name: "Default Unchecked", useCase: "Standard unchecked checkbox, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { name: "Default Checked", useCase: "Checked state showing the user has opted in.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { name: "Without Border", useCase: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { name: "Checked Without Border", useCase: "Checked state in borderless compact layouts.", props: { selected: "on", state: "default", border: "off", inverted: "off" } },
    { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { name: "Checked on Dark Background", useCase: "Checked state on dark surfaces.", props: { selected: "on", state: "default", border: "on", inverted: "on" } },
    { name: "Error Unchecked", useCase: "Show when form validation requires the checkbox to be checked.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { name: "Error Checked", useCase: "Checked but still in error -- e.g. group-level validation failure.", props: { selected: "on", state: "error", border: "on", inverted: "off" } },
    { name: "Disabled Unchecked", useCase: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
    { name: "Disabled Checked", useCase: "Use when showing a locked-in selection the user cannot change.", props: { selected: "on", state: "disabled", border: "on", inverted: "off" } },
  ],

  props: [
    {
      name: "selected",
      type: "boolean",
      default: "false",
      description: "Whether the checkbox is checked.",
    },
    {
      name: "state",
      type: "string",
      default: '"default"',
      options: ["default", "error", "disabled"],
      description: "The visual and interaction state of the checkbox.",
    },
    {
      name: "border",
      type: "boolean",
      default: "true",
      description: "Whether the input container has a visible border.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Use inverted color scheme for dark backgrounds.",
    },
    {
      name: "size",
      type: "string",
      default: '"medium"',
      options: ["small", "medium"],
      description: "The size of the checkbox component.",
    },
    {
      name: "label",
      type: "string",
      description: "Text label displayed above the input.",
    },
    {
      name: "value",
      type: "string",
      description: "The main text content next to the checkbox icon.",
    },
    {
      name: "subtitle",
      type: "string",
      default: '""',
      description: "Optional subtitle text displayed below the value inside the container. When present, border is always shown and the value becomes semibold.",
    },
  ],

  states: ["default", "error", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    {
      part: "Label",
      description:
        "Text label positioned above the input container, providing context for the checkbox option.",
    },
    {
      part: "Info Icon",
      description:
        "Optional icon next to the label text, toggled via the Show Info boolean property.",
    },
    {
      part: "Input Container",
      description:
        "The bordered frame (8px radius) wrapping the checkbox icon and text content.",
    },
    {
      part: "Checkbox Icon",
      description:
        "The square indicator with rounded corners -- shows a stroke outline when unchecked, filled with a white checkmark when checked.",
    },
    {
      part: "Value",
      description:
        "The primary text content displayed next to the checkbox icon.",
    },
    {
      part: "Error Icon",
      description:
        "Warning circle icon shown outside the input container in error state.",
    },
  ],

  elements: [
    {
      part: "Root",
      description: "Top-level wrapper",
      layout: { direction: "VERTICAL", itemSpacing: 2 },
    },
    {
      part: "Label",
      description: "Label row with optional info icon",
      layout: { direction: "HORIZONTAL", counterAlign: "CENTER" },
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 600, fontFamily: "Open Sans" },
    },
    {
      part: "Input",
      description: "Container wrapping checkbox icon and value text",
      layout: { direction: "HORIZONTAL", counterAlign: "CENTER" },
      dimensions: { cornerRadius: 8 },
    },
    {
      part: "CheckboxIcon",
      description: "Square checkbox indicator",
      dimensions: { width: 24, height: 24 },
    },
    {
      part: "Value",
      description: "Text content next to checkbox",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 400, fontFamily: "Open Sans" },
    },
    {
      part: "ErrorIcon",
      description: "Warning icon for error state",
      dimensions: { width: 16, height: 16 },
      toggleable: true,
      defaultVisible: false,
    },
    {
      part: "InfoIcon",
      description: "Info icon next to label",
      dimensions: { width: 16, height: 16 },
      toggleable: true,
      defaultVisible: false,
      toggleProperty: "Show Info",
    },
  ],

  /* ------------------------------------------------------------------
   * variantStyles — ALL 48 variants (2 selected x 3 state x 2 border x 2 inverted x 2 size)
   * ------------------------------------------------------------------ */
  variantStyles: [
    // ===================== Selected=Off, State=Default =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "default", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "#ffffff", fillToken: "white", stroke: "#e3e8ed", strokeToken: "neutrals-100", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#e3e8ed", strokeToken: "neutrals-100", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "off", state: "default", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#ffffff", fillToken: "white", stroke: "#e3e8ed", strokeToken: "neutrals-100", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#e3e8ed", strokeToken: "neutrals-100", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "off", state: "default", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent", stroke: "#64748b", strokeToken: "neutrals-500", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#64748b", strokeToken: "neutrals-500", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "off", state: "default", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent", stroke: "#64748b", strokeToken: "neutrals-500", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#64748b", strokeToken: "neutrals-500", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "default", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#e3e8ed", strokeToken: "neutrals-100", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "off", state: "default", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#e3e8ed", strokeToken: "neutrals-100", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "off", state: "default", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#64748b", strokeToken: "neutrals-500", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "off", state: "default", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#64748b", strokeToken: "neutrals-500", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},

    // ===================== Selected=Off, State=Error =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "error", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "#ffffff", fillToken: "white", stroke: "#e62200", strokeToken: "red/500", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#e62200", strokeToken: "red/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "off", state: "error", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#ffffff", fillToken: "white", stroke: "#e62200", strokeToken: "red/500", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#e62200", strokeToken: "red/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "off", state: "error", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent", stroke: "#eb4e33", strokeToken: "red/400", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#eb4e33", strokeToken: "red/400", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "off", state: "error", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent", stroke: "#eb4e33", strokeToken: "red/400", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#eb4e33", strokeToken: "red/400", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "error", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#e62200", strokeToken: "red/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "off", state: "error", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#e62200", strokeToken: "red/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "off", state: "error", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#eb4e33", strokeToken: "red/400", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "off", state: "error", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#eb4e33", strokeToken: "red/400", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},

    // ===================== Selected=Off, State=Disabled =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "disabled", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      Input: { fill: "#e3e8ed", fillToken: "neutrals-100", stroke: "rgba(15,17,20,0.1)", strokeWidth: 1 },
      CheckboxIcon: { stroke: "rgba(15,17,20,0.1)", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "off", state: "disabled", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#e3e8ed", fillToken: "neutrals-100", stroke: "rgba(15,17,20,0.1)", strokeWidth: 1 },
      CheckboxIcon: { stroke: "rgba(15,17,20,0.1)", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "off", state: "disabled", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500" },
      Input: { fill: "#475263", fillToken: "neutrals-700", stroke: "#5b6a7e", strokeToken: "neutrals-600", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#5b6a7e", strokeToken: "neutrals-600", width: 24, height: 24 },
      Value: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "off", state: "disabled", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#475263", fillToken: "neutrals-700", stroke: "#5b6a7e", strokeToken: "neutrals-600", strokeWidth: 1 },
      CheckboxIcon: { stroke: "#5b6a7e", strokeToken: "neutrals-600", width: 16, height: 16 },
      Value: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "off", state: "disabled", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "rgba(15,17,20,0.1)", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "off", state: "disabled", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "rgba(15,17,20,0.1)", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "off", state: "disabled", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500" },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#5b6a7e", strokeToken: "neutrals-600", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "off", state: "disabled", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { stroke: "#5b6a7e", strokeToken: "neutrals-600", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},

    // ===================== Selected=On, State=Default =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "default", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "#e6f0fb", fillToken: "blue/50", stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#006bd8", fillToken: "blue/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "on", state: "default", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#e6f0fb", fillToken: "blue/50", stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#006bd8", fillToken: "blue/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "on", state: "default", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "#002d5b", fillToken: "blue/900", stroke: "#3389e0", strokeToken: "blue/400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#3389e0", fillToken: "blue/400", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "on", state: "default", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#002d5b", fillToken: "blue/900", stroke: "#3389e0", strokeToken: "blue/400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#3389e0", fillToken: "blue/400", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "default", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#006bd8", fillToken: "blue/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "on", state: "default", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#006bd8", fillToken: "blue/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "on", state: "default", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#3389e0", fillToken: "blue/400", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "on", state: "default", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#3389e0", fillToken: "blue/400", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},

    // ===================== Selected=On, State=Error =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "error", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "#fde9e6", fillToken: "red/50", stroke: "#e62200", strokeToken: "red/500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "on", state: "error", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#fde9e6", fillToken: "red/50", stroke: "#e62200", strokeToken: "red/500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "on", state: "error", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "#610e00", fillToken: "red/900", stroke: "#eb4e33", strokeToken: "red/400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#eb4e33", fillToken: "red/400", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: true },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "on", state: "error", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#610e00", fillToken: "red/900", stroke: "#eb4e33", strokeToken: "red/400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#eb4e33", fillToken: "red/400", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "error", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 24, height: 24 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900" },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "on", state: "error", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 16, height: 16 },
      Value: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "on", state: "error", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 24, height: 24 },
      Value: { textColor: "#ffffff", textColorToken: "white" },
      ErrorIcon: { visible: true },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "on", state: "error", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#e62200", fillToken: "red/500", width: 16, height: 16 },
      Value: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: true },
    }},

    // ===================== Selected=On, State=Disabled =====================
    // Border=On, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "disabled", border: "on", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      Input: { fill: "#e3e8ed", fillToken: "neutrals-100", stroke: "#64748b", strokeToken: "neutrals-500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#64748b", fillToken: "neutrals-500", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=Off, Small
    { variantProps: { selected: "on", state: "disabled", border: "on", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#e3e8ed", fillToken: "neutrals-100", stroke: "#64748b", strokeToken: "neutrals-500", strokeWidth: 1 },
      CheckboxIcon: { fill: "#64748b", fillToken: "neutrals-500", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Medium
    { variantProps: { selected: "on", state: "disabled", border: "on", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500" },
      Input: { fill: "#475263", fillToken: "neutrals-700", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#a6b0be", fillToken: "neutrals-300", width: 24, height: 24 },
      Value: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      ErrorIcon: { visible: false },
    }},
    // Border=On, Inverted=On, Small
    { variantProps: { selected: "on", state: "disabled", border: "on", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      Input: { fill: "#475263", fillToken: "neutrals-700", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1 },
      CheckboxIcon: { fill: "#a6b0be", fillToken: "neutrals-300", width: 16, height: 16 },
      Value: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Medium
    { variantProps: { selected: "on", state: "disabled", border: "off", inverted: "off", size: "medium" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#64748b", fillToken: "neutrals-500", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=Off, Small
    { variantProps: { selected: "on", state: "disabled", border: "off", inverted: "off", size: "small" }, elements: {
      Label: { textColor: "#8390a2", textColorToken: "neutrals-400", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#64748b", fillToken: "neutrals-500", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Medium
    { variantProps: { selected: "on", state: "disabled", border: "off", inverted: "on", size: "medium" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500" },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#a6b0be", fillToken: "neutrals-300", width: 24, height: 24 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500" },
      ErrorIcon: { visible: false },
    }},
    // Border=Off, Inverted=On, Small
    { variantProps: { selected: "on", state: "disabled", border: "off", inverted: "on", size: "small" }, elements: {
      Label: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      Input: { fill: "transparent" },
      CheckboxIcon: { fill: "#a6b0be", fillToken: "neutrals-300", width: 16, height: 16 },
      Value: { textColor: "#64748b", textColorToken: "neutrals-500", fontSize: 12, lineHeight: 16 },
      ErrorIcon: { visible: false },
    }},
  ],

  guidelines: {
    do: [
      {
        description:
          "[placeholder] Use checkboxes for independent choices where multiple options can be selected simultaneously.",
      },
      {
        description:
          "[placeholder] Always provide a clear, descriptive label for each checkbox option.",
      },
      {
        description:
          "[placeholder] Use the error state with a helper message to indicate a required checkbox that hasn't been checked.",
      },
      {
        description:
          "[placeholder] Group related checkboxes vertically for easy scanning.",
      },
      {
        description:
          "[placeholder] Use the disabled state with a tooltip to explain why an option is unavailable.",
      },
    ],
    dont: [
      {
        description:
          "[placeholder] Don't use checkboxes for mutually exclusive choices -- use Radio buttons instead.",
      },
      {
        description:
          "[placeholder] Don't use checkboxes for binary on/off settings -- use a Switch instead.",
      },
      {
        description:
          "[placeholder] Don't present more than 7 checkbox options in a single group -- consider restructuring the form.",
      },
      {
        description:
          "[placeholder] Don't rely solely on color to communicate the checked/unchecked state (the checkmark icon is essential).",
      },
    ],
  },

  accessibility: {
    role: "checkbox",
    keyboard: [
      "Space -- Toggles the checkbox between checked and unchecked.",
      "Tab -- Moves focus to the next focusable element.",
      "Shift+Tab -- Moves focus to the previous focusable element.",
    ],
    ariaAttributes: [
      "aria-checked -- Indicates the current checked state (true/false/mixed).",
      "aria-disabled -- Set to true when the checkbox is disabled.",
      "aria-label -- Provide when there is no visible label text.",
      "aria-describedby -- Associates the error message with the checkbox.",
    ],
  },

  usageGuidelines: [
    {
      type: "info",
      title: "With or without a container",
      description:
        "Use the container border when each checkbox is a selectable row in a list or card, so the whole surface acts as a hit target. Omit it in compact forms or filter lists where the border adds visual noise.",
      previewRows: [
        [
          { selected: "on", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Email" },
          { selected: "off", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "SMS" },
        ],
        [
          { selected: "on", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "Email" },
          { selected: "off", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "SMS" },
        ],
      ],
    },
    {
      type: "info",
      title: "Standalone checkboxes",
      description:
        "Standalone checkboxes are only used when their connection to other components is clear and they give sufficient context.",
      previews: [
        { context: "user-list" },
      ],
    },
    {
      type: "info",
      title: "Showing errors",
      description:
        "Display the error below the checkbox with red helper text, and place the error icon to the right of the checkbox, outside the container.",
      previews: [
        { selected: "off", state: "error", border: "on", inverted: "off", hasLabel: "off", value: "Accept terms", hasDescription: "on" },
        { selected: "on", state: "error", border: "on", inverted: "off", hasLabel: "off", value: "Admin role", hasDescription: "on" },
      ],
    },
    {
      type: "info",
      title: "Indeterminate state",
      description:
        "Use the indeterminate state on a parent checkbox when only some of its children are selected. Clicking it selects all; clicking again deselects them.",
      previewRows: [
        [
          { indeterminate: "on", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "Select all" },
          { selected: "on", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "Email" },
          { selected: "off", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "SMS" },
        ],
      ],
    },
    {
      type: "info",
      title: "Long values wrap to multiple lines",
      description:
        "When the value is too long for the available width, the text wraps and the checkbox aligns to the top of the first line.",
      previews: [
        {
          selected: "on",
          state: "default",
          border: "on",
          inverted: "off",
          hasLabel: "off",
          multiline: "on",
          maxWidth: "320",
          value: "Notify reviewers when a draft is submitted for approval",
        },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder).",
      previews: [
        { selected: "off", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Medium", size: "medium" },
        { selected: "off", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Small", size: "small" },
      ],
    },
    {
      type: "info",
      title: "Inverted on dark backgrounds",
      description:
        "Use the inverted variant when the component sits on a dark or strongly colored surface.",
      previewRows: [
        {
          background: "dark",
          items: [
            { selected: "on", state: "default", border: "on", inverted: "on", hasLabel: "off", value: "Email" },
            { selected: "off", state: "default", border: "on", inverted: "on", hasLabel: "off", value: "SMS" },
          ],
        },
      ],
    },
  ],

  relatedComponents: ["radio", "switch", "select-field"],

  considerations: [
    "[placeholder] When a single checkbox controls agreement or consent → pair with the error state for validation, not the disabled state; disabled implies the user can't act.",
    "[placeholder] When checkboxes appear in a dense list (5+ items) → use the borderless variant to reduce visual noise and let the content breathe.",
    "[placeholder] When using the subtitle prop → the border is always shown regardless of the border prop value, because the subtitle needs the container framing for readability.",
  ],
};
