import { type ComponentSpec } from "./types";

export const radioV3Spec: ComponentSpec = {
  slug: "radio",
  name: "Radio",
  description:
    "Lets users pick exactly one option from a mutually exclusive set.",
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
          "[placeholder] Use radio buttons for mutually exclusive choices where only one option can be selected.",
      },
      {
        description:
          "[placeholder] Always provide a clear, descriptive label for each radio option.",
      },
      {
        description:
          "[placeholder] Use the error state with a helper message to indicate a required selection.",
      },
      {
        description:
          "[placeholder] Group related radio buttons vertically for easy scanning.",
      },
      {
        description:
          "[placeholder] Always have one option pre-selected when a default is sensible.",
      },
    ],
    dont: [
      {
        description:
          "[placeholder] Don't use radio buttons for multi-select scenarios — use Checkboxes instead.",
      },
      {
        description:
          "[placeholder] Don't use radio buttons for binary on/off toggles — use a Switch instead.",
      },
      {
        description:
          "[placeholder] Don't present more than 7 radio options — use a Select dropdown for long lists.",
      },
      {
        description:
          "[placeholder] Don't disable radio buttons without explaining why via a tooltip.",
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

  relatedComponents: ["checkbox", "segmented-button", "select-field"],

  considerations: [
    "[placeholder] When only 2–3 options exist and they act as a mode switch → consider Segmented Button instead; it's more compact and communicates mutual exclusivity faster.",
    "[placeholder] When the list exceeds 7 options → switch to a Select Field; long radio lists are hard to scan and waste vertical space.",
    "[placeholder] When using the subtitle prop → the border is always shown regardless of the border prop value, matching the Checkbox behavior.",
  ],

  usageGuidelines: [
    {
      type: "info",
      title: "When to use a radio vs a select",
      description:
        "Use radios when there are up to 5 mutually exclusive options and showing them all reinforces the choice. Switch to a select when the list is longer or space is limited.",
      previews: [
        { selected: "on", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "Email" },
        { selected: "off", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "SMS" },
        { selected: "off", state: "default", border: "off", inverted: "off", hasLabel: "off", value: "Push" },
      ],
    },
    {
      type: "info",
      title: "With or without a container",
      description:
        "Use the container border when each radio is a selectable row in a list or card, so the whole surface acts as a hit target. Omit it in compact forms or filter lists where the border adds visual noise.",
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
      title: "Offer a default selection",
      description:
        "Pre-select the safest or most common option so users can move forward without making every choice explicit. Avoid leaving a required radio group empty by default.",
      previews: [
        { selected: "on", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Standard" },
        { selected: "off", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Custom" },
      ],
    },
    {
      type: "info",
      title: "Showing errors",
      description:
        "Display the error below the radio with red helper text, and place the error icon to the right of the radio component, outside the container.",
      previews: [
        { selected: "off", state: "error", border: "on", inverted: "off", hasLabel: "off", value: "Standard", hasDescription: "on" },
        { selected: "on", state: "error", border: "on", inverted: "off", hasLabel: "off", value: "Overnight", hasDescription: "on" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default across admin pages. Use Small in tighter spaces like canvas areas (UI Designer, Data Model, Agent Builder).",
      previews: [
        { selected: "on", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Medium", size: "medium" },
        { selected: "on", state: "default", border: "on", inverted: "off", hasLabel: "off", value: "Small", size: "small" },
      ],
    },
  ],
};
