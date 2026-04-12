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
    // --- Core use cases with previews ---
    { type: "use-case", title: "Default Unselected", description: "Standard unchecked radio, the most common starting state.", props: { selected: "off", state: "default", border: "on", inverted: "off" } },
    { type: "use-case", title: "Default Selected", description: "Checked state showing the user's active selection.", props: { selected: "on", state: "default", border: "on", inverted: "off" } },
    { type: "do", title: "Use for mutually exclusive choices", description: "Radio buttons are for choosing exactly one option from a set. Always provide a clear, descriptive label for each option." },
    { type: "dont", title: "Don't use for multi-select", description: "Use Checkboxes instead when users can select multiple options." },
    // --- Border variants ---
    { type: "use-case", title: "Without Border", description: "Use in compact layouts where the container border adds visual noise.", props: { selected: "off", state: "default", border: "off", inverted: "off" } },
    { type: "use-case", title: "Selected Without Border", description: "Checked state in borderless compact layouts.", props: { selected: "on", state: "default", border: "off", inverted: "off" } },
    // --- Inverted ---
    { type: "use-case", title: "On Dark Background", description: "Use on dark surfaces like modals or hero sections.", props: { selected: "off", state: "default", border: "on", inverted: "on" } },
    { type: "use-case", title: "Selected on Dark Background", description: "Checked state on dark surfaces.", props: { selected: "on", state: "default", border: "on", inverted: "on" } },
    // --- Error ---
    { type: "use-case", title: "Error Unselected", description: "Show when form validation requires a selection.", props: { selected: "off", state: "error", border: "on", inverted: "off" } },
    { type: "use-case", title: "Error Selected", description: "Selected but still in error — e.g. group-level validation failure.", props: { selected: "on", state: "error", border: "on", inverted: "off" } },
    { type: "do", title: "Use error state with a helper message", description: "Always pair the error state with a description explaining what needs to be corrected." },
    // --- Disabled ---
    { type: "use-case", title: "Disabled Unselected", description: "Use when the option exists but is not currently available.", props: { selected: "off", state: "disabled", border: "on", inverted: "off" } },
    { type: "use-case", title: "Disabled Selected", description: "Use when showing a locked-in selection the user cannot change.", props: { selected: "on", state: "disabled", border: "on", inverted: "off" } },
    { type: "dont", title: "Don't disable without explanation", description: "If a radio option is disabled, provide a tooltip or adjacent text explaining why it's unavailable." },
    // --- Guidance ---
    { type: "do", title: "Pre-select a default when sensible", description: "Always have one option pre-selected when there's a reasonable default. This reduces friction." },
    { type: "do", title: "Group vertically for scanning", description: "Stack related radio options vertically. Horizontal layouts make it harder to associate labels with their options." },
    { type: "dont", title: "Don't use for on/off toggles", description: "Use a Switch component instead for binary on/off actions." },
    { type: "dont", title: "Don't exceed 7 options", description: "For longer option lists, use a Select Field dropdown instead. Long radio lists waste vertical space and are hard to scan." },
    // --- Considerations ---
    { type: "info", title: "Consider Segmented Button for 2–3 options", description: "When only 2–3 options exist and they act as a mode switch, Segmented Button is more compact and communicates mutual exclusivity faster." },
    { type: "info", title: "Subtitle forces border on", description: "When using the subtitle prop, the border is always shown regardless of the border prop value, matching the Checkbox behavior." },
  ],
};
