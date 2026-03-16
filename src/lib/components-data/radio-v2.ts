import { type ComponentSpec } from "./types";

export const radioV2Spec: ComponentSpec = {
  slug: "radio-v2",
  name: "Radio v2",
  description:
    "Pixel-perfect Figma reference for the Radio component. All previews are exported directly from Figma at 2x scale — no approximation.",
  status: "stable",
  figmaLink: "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=360-612",
  lastUpdated: "2026-03-16",

  variants: [
    {
      name: "Default Unselected",
      useCase: "Standard radio in its unchecked state with border.",
      props: { selected: "off", state: "default", border: "on", inverted: "off" },
    },
    {
      name: "Default Selected",
      useCase: "Radio in its checked state with blue fill ring indicator.",
      props: { selected: "on", state: "default", border: "on", inverted: "off" },
    },
    {
      name: "Without Border",
      useCase: "Radio without the outer input container border.",
      props: { selected: "off", state: "default", border: "off", inverted: "off" },
    },
    {
      name: "Inverted",
      useCase: "Radio on dark/inverted background.",
      props: { selected: "off", state: "default", border: "on", inverted: "on" },
    },
    {
      name: "Error",
      useCase: "Radio in error state with red border indication.",
      props: { selected: "off", state: "error", border: "on", inverted: "off" },
    },
    {
      name: "Disabled",
      useCase: "Non-interactive radio with reduced opacity.",
      props: { selected: "off", state: "disabled", border: "on", inverted: "off" },
    },
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
        "The circular indicator — shows a stroke outline when unselected, filled blue ring when selected.",
    },
    {
      part: "Value",
      description:
        "The primary text content displayed next to the radio icon.",
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

  relatedComponents: ["radio", "checkbox", "switch", "select"],
};
