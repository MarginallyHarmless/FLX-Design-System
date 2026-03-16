import { type ComponentSpec } from "./types";

export const buttonSpec: ComponentSpec = {
  slug: "button",
  name: "Button",
  description:
    "Triggers an action or event, such as submitting a form, opening a dialog, or performing a delete operation.",
  status: "stable",
  figmaLink: "https://figma.com/file/flowx-design-system/button",
  lastUpdated: "2026-03-16",

  variants: [
    { name: "Default", useCase: "Primary call to action — use for the most important action on the page.", props: { variant: "default" } },
    { name: "Secondary", useCase: "Use for supporting actions that don't compete with the primary action.", props: { variant: "secondary" } },
    { name: "Outline", useCase: "Use for tertiary actions or when a lighter visual weight is needed.", props: { variant: "outline" } },
    { name: "Ghost", useCase: "Use for inline or contextual actions with minimal visual presence.", props: { variant: "ghost" } },
    { name: "Destructive", useCase: "Use for dangerous or irreversible actions like delete or remove.", props: { variant: "destructive" } },
  ],

  props: [
    {
      name: "variant",
      type: "string",
      default: '"default"',
      options: ["default", "secondary", "outline", "ghost", "destructive"],
      description: "The visual style of the button.",
    },
    {
      name: "size",
      type: "string",
      default: '"default"',
      options: ["sm", "default", "lg", "icon"],
      description: "The size of the button.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description:
        "Prevents interaction and applies disabled styling.",
    },
    {
      name: "asChild",
      type: "boolean",
      default: "false",
      description:
        "Merges props onto the child element instead of rendering a <button>.",
    },
  ],

  states: ["default", "hover", "active", "focus", "disabled"],

  sizes: ["sm", "default", "lg", "icon"],

  anatomy: [
    {
      part: "Container",
      description:
        "The outer button element that handles click events and focus.",
    },
    {
      part: "Label",
      description: "The text content of the button.",
    },
    {
      part: "Icon Leading",
      description: "Optional icon placed before the label.",
    },
    {
      part: "Icon Trailing",
      description: "Optional icon placed after the label.",
    },
  ],

  guidelines: {
    do: [
      {
        description:
          "Use a single primary button per section to indicate the main action.",
      },
      {
        description:
          "Use verb-first labels that describe the action (e.g., 'Save changes', 'Delete account').",
      },
      {
        description:
          "Provide visual feedback on hover and focus states.",
      },
      {
        description:
          "Use the destructive variant for irreversible actions like delete.",
      },
    ],
    dont: [
      {
        description:
          "Don't use more than one primary button in the same context.",
      },
      {
        description:
          "Don't use vague labels like 'Click here' or 'Submit'.",
      },
      {
        description:
          "Don't disable buttons without explaining why (use a tooltip).",
      },
      {
        description:
          "Don't use ghost buttons for primary actions — they lack visual prominence.",
      },
    ],
  },

  accessibility: {
    role: "button",
    keyboard: [
      "Enter — Activates the button.",
      "Space — Activates the button.",
      "Tab — Moves focus to the next focusable element.",
    ],
    ariaAttributes: [
      "aria-disabled — Set to true when the button is disabled.",
      "aria-label — Provide when the button has no visible text (icon-only).",
      "aria-pressed — Use for toggle buttons to indicate pressed state.",
    ],
  },

  relatedComponents: ["link", "toggle", "icon-button"],
};
