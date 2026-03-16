import { type ComponentSpec } from "./types";

export const checkboxSpec: ComponentSpec = {
  slug: "checkbox",
  name: "Checkbox",
  description: "Allows users to select one or more items from a set, or toggle a single option on/off. Used within bordered input containers with optional label, prefix, and suffix text.",
  status: "stable",
  figmaLink: "https://figma.com/file/flowx-design-system/checkbox",
  lastUpdated: "2026-03-16",

  variants: [
    { name: "Default Unselected", useCase: "Standard unchecked checkbox, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { name: "Default Selected", useCase: "Checked state confirming the user's choice.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { name: "Without Border", useCase: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { name: "With Validation Error", useCase: "Show when a required checkbox has not been checked.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { name: "Disabled", useCase: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
  ],

  props: [
    { name: "selected", type: "boolean", default: "false", description: "Whether the checkbox is checked." },
    { name: "state", type: "string", default: '"default"', options: ["default", "error", "disabled"], description: "The visual and interaction state of the checkbox." },
    { name: "border", type: "boolean", default: "true", description: "Whether the input container has a visible border." },
    { name: "inverted", type: "boolean", default: "false", description: "Use inverted color scheme for dark backgrounds." },
    { name: "size", type: "string", default: '"medium"', options: ["small", "medium"], description: "The size of the checkbox component." },
    { name: "label", type: "string", description: "Text label displayed above the input." },
    { name: "value", type: "string", description: "The main text content next to the checkbox icon." },
    { name: "prefix", type: "string", description: "Optional prefix text shown before the value." },
    { name: "suffix", type: "string", description: "Optional suffix text shown after the value." },
    { name: "showInfoIcon", type: "boolean", default: "false", description: "Whether to show an info icon next to the label." },
  ],

  states: ["default", "hover", "focus", "error", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    { part: "Label", description: "Text label positioned above the input container, providing context for the checkbox." },
    { part: "Info Icon", description: "Optional icon next to the label for additional information or tooltips." },
    { part: "Input Container", description: "The bordered frame (8px radius) wrapping the checkbox icon and text content." },
    { part: "Checkbox Icon", description: "The square indicator — shows a stroke outline when unchecked, filled blue with checkmark when checked." },
    { part: "Value", description: "The primary text content displayed next to the checkbox icon." },
    { part: "Prefix", description: "Optional secondary text shown before the value text." },
    { part: "Suffix", description: "Optional secondary text shown after the value text." },
  ],

  guidelines: {
    do: [
      { description: "Use checkboxes for multi-select scenarios where users can pick multiple options." },
      { description: "Always provide a clear, descriptive label for each checkbox." },
      { description: "Use the error state with a helper message to indicate validation issues." },
      { description: "Group related checkboxes vertically for easy scanning." },
    ],
    dont: [
      { description: "Don't use a checkbox for binary on/off toggles — use a Switch instead." },
      { description: "Don't use checkboxes for mutually exclusive choices — use Radio buttons." },
      { description: "Don't disable checkboxes without explaining why via a tooltip." },
      { description: "Don't nest checkboxes more than one level deep." },
    ],
  },

  accessibility: {
    role: "checkbox",
    keyboard: [
      "Space — Toggles the checkbox checked state.",
      "Tab — Moves focus to the next focusable element.",
      "Shift+Tab — Moves focus to the previous focusable element.",
    ],
    ariaAttributes: [
      "aria-checked — Indicates the current checked state (true/false/mixed).",
      "aria-disabled — Set to true when the checkbox is disabled.",
      "aria-label — Provide when there is no visible label text.",
      "aria-describedby — Reference to error or helper text when present.",
    ],
  },

  relatedComponents: ["radio", "switch", "select"],
};
