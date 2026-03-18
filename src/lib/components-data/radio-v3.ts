import { type ComponentSpec } from "./types";

export const radioV3Spec: ComponentSpec = {
  slug: "radio",
  name: "Radio",
  description:
    "Vanilla HTML/CSS/JS implementation of the Radio component, matching Figma pixel-for-pixel. Supports selected, error, disabled, border, inverted, and size variants.",
  status: "stable",
  figmaLink: "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=360-641",
  lastUpdated: "2026-03-16",

  variants: [
    { name: "Default Unselected", useCase: "Standard unchecked radio, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { name: "Default Selected", useCase: "Checked state showing the user's active selection.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { name: "Without Border", useCase: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { name: "Selected Without Border", useCase: "Checked state in borderless compact layouts.", props: { selected: "on", state: "default", border: "off", inverted: "off" } },
    { name: "On Dark Background", useCase: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { name: "Selected on Dark Background", useCase: "Checked state on dark surfaces.", props: { selected: "on", state: "default", border: "on", inverted: "on" } },
    { name: "Error Unselected", useCase: "Show when form validation requires a selection.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { name: "Error Selected", useCase: "Selected but still in error — e.g. group-level validation failure.", props: { selected: "on", state: "error", border: "on", inverted: "off" } },
    { name: "Disabled Unselected", useCase: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
    { name: "Disabled Selected", useCase: "Use when showing a locked-in selection the user cannot change.", props: { selected: "on", state: "disabled", border: "on", inverted: "off" } },
  ],

  props: [
    {
      name: "selected",
      type: "boolean",
      default: "false",
      description: "Whether the radio is selected.",
    },
    {
      name: "state",
      type: "string",
      default: '"default"',
      options: ["default", "error", "disabled"],
      description: "The visual and interaction state of the radio.",
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
      description: "The size of the radio component.",
    },
    {
      name: "label",
      type: "string",
      description: "Text label displayed above the input.",
    },
    {
      name: "value",
      type: "string",
      description: "The main text content next to the radio icon.",
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
        "Text label positioned above the input container, providing context for the radio option.",
    },
    {
      part: "Input Container",
      description:
        "The bordered frame (8px radius) wrapping the radio icon and text content.",
    },
    {
      part: "Radio Icon",
      description:
        "The circular indicator — shows a stroke outline when unselected, filled blue ring with inner dot when selected.",
    },
    {
      part: "Value",
      description:
        "The primary text content displayed next to the radio icon.",
    },
    {
      part: "Error Icon",
      description:
        "Warning circle icon shown outside the input container in error state.",
    },
  ],

  guidelines: {
    do: [
      {
        description:
          "Use radio buttons for mutually exclusive choices where only one option can be selected.",
      },
      {
        description:
          "Always provide a clear, descriptive label for each radio option.",
      },
      {
        description:
          "Use the error state with a helper message to indicate a required selection.",
      },
      {
        description:
          "Group related radio buttons vertically for easy scanning.",
      },
      {
        description:
          "Always have one option pre-selected when a default is sensible.",
      },
    ],
    dont: [
      {
        description:
          "Don't use radio buttons for multi-select scenarios — use Checkboxes instead.",
      },
      {
        description:
          "Don't use radio buttons for binary on/off toggles — use a Switch instead.",
      },
      {
        description:
          "Don't present more than 7 radio options — use a Select dropdown for long lists.",
      },
      {
        description:
          "Don't disable radio buttons without explaining why via a tooltip.",
      },
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

  relatedComponents: ["radio", "radio-v2", "checkbox"],
};
