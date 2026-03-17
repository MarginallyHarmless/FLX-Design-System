import { type ComponentSpec } from "./types";

export const switchSpec: ComponentSpec = {
  slug: "switch",
  name: "Switch",
  description:
    "Vanilla HTML/CSS/JS implementation of the Switch toggle component, matching Figma pixel-for-pixel. Supports on/off, disabled, inverted, and size variants.",
  status: "stable",
  figmaLink:
    "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=2284-18390",
  lastUpdated: "2026-03-17",

  variants: [
    { name: "Default On", useCase: "Active toggle showing a feature is enabled.", props: { on: "on", state: "default", inverted: "off", size: "medium" } },
    { name: "Default Off", useCase: "Inactive toggle for opt-out state.", props: { on: "off", state: "default", inverted: "off", size: "medium" } },
    { name: "Disabled On", useCase: "Locked-on state user cannot change.", props: { on: "on", state: "disabled", inverted: "off", size: "medium" } },
    { name: "Disabled Off", useCase: "Locked-off state, feature unavailable.", props: { on: "off", state: "disabled", inverted: "off", size: "medium" } },
    { name: "Inverted On", useCase: "Active toggle on dark background.", props: { on: "on", state: "default", inverted: "on", size: "medium" } },
    { name: "Inverted Off", useCase: "Inactive toggle on dark background.", props: { on: "off", state: "default", inverted: "on", size: "medium" } },
  ],

  props: [
    {
      name: "on",
      type: "boolean",
      default: "false",
      description: "Whether the switch is toggled on.",
    },
    {
      name: "state",
      type: "string",
      default: '"default"',
      options: ["default", "disabled"],
      description: "The visual and interaction state of the switch.",
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
      description: "The size of the switch component.",
    },
    {
      name: "label",
      type: "string",
      description: "Text label displayed to the right of the switch track.",
    },
  ],

  states: ["default", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    {
      part: "Root",
      description:
        "Horizontal layout wrapper containing the switch track and right label, with 8px gap.",
    },
    {
      part: "Left Label",
      description:
        "Text label positioned to the left of the track. Always hidden (visible: false) in all variants.",
    },
    {
      part: "Track",
      description:
        "The pill-shaped container (cornerRadius 20) that holds the knob. Medium: 42x24, Small: 28x16.",
    },
    {
      part: "Knob",
      description:
        "The circular toggle handle inside the track. Positioned left when off, right when on.",
    },
    {
      part: "Right Label",
      description:
        "Text label displayed to the right of the track.",
    },
  ],

  elements: [
    {
      part: "Root",
      description: "Top-level horizontal wrapper",
      layout: { direction: "HORIZONTAL", itemSpacing: 8, counterAlign: "CENTER" },
    },
    {
      part: "Track",
      description: "Pill-shaped toggle track",
      dimensions: { width: 42, height: 24, cornerRadius: 20 },
    },
    {
      part: "Knob",
      description: "Circular toggle handle",
      dimensions: { width: 16, height: 16 },
    },
    {
      part: "RightLabel",
      description: "Label text next to the switch",
      typography: { fontSize: 14, lineHeight: 22, fontWeight: 400, fontFamily: "Open Sans" },
    },
  ],

  /* ------------------------------------------------------------------
   * variantStyles — ALL 16 variants (2 on x 2 state x 2 inverted x 2 size)
   * ------------------------------------------------------------------ */
  variantStyles: [
    // ===================== On=On, State=Default =====================
    // Inverted=Off, Medium
    { variantProps: { on: "on", state: "default", inverted: "off", size: "medium" }, elements: {
      Track: { fill: "#006bd8", fillToken: "blue/500", width: 42, height: 24 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 16, height: 16 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950" },
    }},
    // Inverted=Off, Small
    { variantProps: { on: "on", state: "default", inverted: "off", size: "small" }, elements: {
      Track: { fill: "#006bd8", fillToken: "blue/500", width: 28, height: 16 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 12, height: 12 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950", fontSize: 12, lineHeight: 16 },
    }},
    // Inverted=On, Medium
    { variantProps: { on: "on", state: "default", inverted: "on", size: "medium" }, elements: {
      Track: { fill: "#3389e0", fillToken: "blue/400", width: 42, height: 24 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 16, height: 16 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white" },
    }},
    // Inverted=On, Small
    { variantProps: { on: "on", state: "default", inverted: "on", size: "small" }, elements: {
      Track: { fill: "#3389e0", fillToken: "blue/400", width: 28, height: 16 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 12, height: 12 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
    }},

    // ===================== On=On, State=Disabled =====================
    // Inverted=Off, Medium
    { variantProps: { on: "on", state: "disabled", inverted: "off", size: "medium" }, elements: {
      Track: { fill: "#8390a2", fillToken: "neutrals-400", width: 42, height: 24 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 16, height: 16 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950" },
    }},
    // Inverted=Off, Small
    { variantProps: { on: "on", state: "disabled", inverted: "off", size: "small" }, elements: {
      Track: { fill: "#8390a2", fillToken: "neutrals-400", width: 28, height: 16 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 12, height: 12 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950", fontSize: 12, lineHeight: 16 },
    }},
    // Inverted=On, Medium
    { variantProps: { on: "on", state: "disabled", inverted: "on", size: "medium" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", width: 42, height: 24 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 16, height: 16 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white" },
    }},
    // Inverted=On, Small
    { variantProps: { on: "on", state: "disabled", inverted: "on", size: "small" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", width: 28, height: 16 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 12, height: 12 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
    }},

    // ===================== On=Off, State=Default =====================
    // Inverted=Off, Medium
    { variantProps: { on: "off", state: "default", inverted: "off", size: "medium" }, elements: {
      Track: { fill: "#ffffff", fillToken: "white", stroke: "#cbd1db", strokeToken: "neutrals-200", strokeWidth: 1.5, width: 42, height: 24 },
      Knob: { fill: "#64748b", fillToken: "neutrals-500", width: 16, height: 16 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950" },
    }},
    // Inverted=Off, Small
    { variantProps: { on: "off", state: "default", inverted: "off", size: "small" }, elements: {
      Track: { fill: "#ffffff", fillToken: "white", stroke: "#cbd1db", strokeToken: "neutrals-200", strokeWidth: 1.5, width: 28, height: 16 },
      Knob: { fill: "#64748b", fillToken: "neutrals-500", width: 10, height: 10 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950", fontSize: 12, lineHeight: 16 },
    }},
    // Inverted=On, Medium
    { variantProps: { on: "off", state: "default", inverted: "on", size: "medium" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1.5, width: 42, height: 24 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 16, height: 16 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white" },
    }},
    // Inverted=On, Small
    { variantProps: { on: "off", state: "default", inverted: "on", size: "small" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1.5, width: 28, height: 16 },
      Knob: { fill: "#ffffff", fillToken: "white", width: 10, height: 10 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
    }},

    // ===================== On=Off, State=Disabled =====================
    // Inverted=Off, Medium
    { variantProps: { on: "off", state: "disabled", inverted: "off", size: "medium" }, elements: {
      Track: { fill: "#ffffff", fillToken: "white", stroke: "#cbd1db", strokeToken: "neutrals-200", strokeWidth: 1.5, width: 42, height: 24 },
      Knob: { fill: "#cbd1db", fillToken: "neutrals-200", width: 16, height: 16 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950" },
    }},
    // Inverted=Off, Small
    { variantProps: { on: "off", state: "disabled", inverted: "off", size: "small" }, elements: {
      Track: { fill: "#ffffff", fillToken: "white", stroke: "#cbd1db", strokeToken: "neutrals-200", strokeWidth: 1.5, width: 28, height: 16 },
      Knob: { fill: "#cbd1db", fillToken: "neutrals-200", width: 10, height: 10 },
      RightLabel: { textColor: "#0f1114", textColorToken: "neutrals-950", fontSize: 12, lineHeight: 16 },
    }},
    // Inverted=On, Medium
    { variantProps: { on: "off", state: "disabled", inverted: "on", size: "medium" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1.5, width: 42, height: 24 },
      Knob: { fill: "#a6b0be", fillToken: "neutrals-300", width: 16, height: 16 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white" },
    }},
    // Inverted=On, Small
    { variantProps: { on: "off", state: "disabled", inverted: "on", size: "small" }, elements: {
      Track: { fill: "#5b6a7e", fillToken: "neutrals-600", stroke: "#8390a2", strokeToken: "neutrals-400", strokeWidth: 1.5, width: 28, height: 16 },
      Knob: { fill: "#a6b0be", fillToken: "neutrals-300", width: 10, height: 10 },
      RightLabel: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, lineHeight: 16 },
    }},
  ],

  guidelines: {
    do: [
      {
        description:
          "Use switches for binary on/off settings that take effect immediately.",
      },
      {
        description:
          "Always provide a clear label describing what the switch controls.",
      },
      {
        description:
          "Use the disabled state to indicate a setting that exists but cannot be changed right now.",
      },
      {
        description:
          "Place the label to the right of the switch for consistent left-to-right reading order.",
      },
      {
        description:
          "Use the inverted variant on dark backgrounds to maintain contrast.",
      },
    ],
    dont: [
      {
        description:
          "Don't use a switch for multiple selections -- use Checkboxes instead.",
      },
      {
        description:
          "Don't use a switch when the action requires a submit button -- use a Checkbox instead.",
      },
      {
        description:
          "Don't change the label text between on/off states -- it should describe the setting, not the state.",
      },
      {
        description:
          "Don't use the small size switch where touch targets need to meet accessibility minimums (24px).",
      },
    ],
  },

  accessibility: {
    role: "switch",
    keyboard: [
      "Space -- Toggles the switch between on and off.",
      "Enter -- Toggles the switch between on and off.",
      "Tab -- Moves focus to the next focusable element.",
      "Shift+Tab -- Moves focus to the previous focusable element.",
    ],
    ariaAttributes: [
      "aria-checked -- Indicates the current on/off state (true/false).",
      "aria-disabled -- Set to true when the switch is disabled.",
      "aria-label -- Provide when there is no visible label text.",
      "role=\"switch\" -- Identifies the element as a switch widget.",
    ],
  },

  relatedComponents: ["checkbox", "radio"],
};
