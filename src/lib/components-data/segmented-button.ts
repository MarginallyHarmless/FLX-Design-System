import { type ComponentSpec } from "./types";

export const segmentedButtonSpec: ComponentSpec = {
  slug: "segmented-button",
  name: "Segmented Button",
  description:
    "Vanilla HTML/CSS/JS implementation of the Segmented Button component, matching Figma pixel-for-pixel. Supports size, disabled, and inverted variants with 5 selectable segments.",
  status: "stable",
  figmaLink:
    "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=478-29886",
  lastUpdated: "2026-03-18",

  variants: [
    { name: "Default", useCase: "Standard segmented control for switching between views or filters.", props: { size: "medium", inverted: "off", disabled: "off" } },
    { name: "Disabled", useCase: "Non-interactive segmented control indicating unavailable options.", props: { size: "medium", inverted: "off", disabled: "on" } },
    { name: "Inverted", useCase: "Segmented control on dark backgrounds for maintaining contrast.", props: { size: "medium", inverted: "on", disabled: "off" } },
    { name: "Small", useCase: "Compact segmented control for space-constrained layouts.", props: { size: "small", inverted: "off", disabled: "off" } },
  ],

  props: [
    {
      name: "size",
      type: "string",
      default: '"medium"',
      options: ["small", "medium"],
      description: "The size of the segmented button component.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Use inverted color scheme for dark backgrounds.",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the segmented button is disabled.",
    },
    {
      name: "options",
      type: "string[]",
      default: '["Option 1","Option 2","Option 3","Option 4","Option 5"]',
      description: "Array of labels for each segment.",
    },
    {
      name: "selectedIndex",
      type: "number",
      default: "0",
      description: "The zero-based index of the currently selected segment.",
    },
    {
      name: "label",
      type: "string",
      description: "Text label displayed above the segmented button group.",
    },
  ],

  states: ["default", "disabled"],

  sizes: ["small", "medium"],

  anatomy: [
    {
      part: "Root",
      description:
        "Vertical layout wrapper containing the label and the container, with 2px gap.",
    },
    {
      part: "Label",
      description:
        "Text label positioned above the container.",
    },
    {
      part: "Container",
      description:
        "The pill-shaped track (cornerRadius 8) that holds all segment buttons. Medium: height 36, Small: height 28. Padding 4px.",
    },
    {
      part: "Segment",
      description:
        "Individual selectable segment button inside the container (cornerRadius 6). Selected segment has colored fill + white text; unselected has transparent fill.",
    },
  ],

  elements: [
    {
      part: "Root",
      description: "Top-level vertical wrapper",
      layout: { direction: "VERTICAL", itemSpacing: 2 },
    },
    {
      part: "Label",
      description: "Label text above the segmented button",
      typography: { fontSize: 14, lineHeight: 22, fontWeight: 600, fontFamily: "Open Sans" },
    },
    {
      part: "Container",
      description: "Pill-shaped track holding segments",
      dimensions: { height: 36, cornerRadius: 8 },
      layout: { direction: "HORIZONTAL", itemSpacing: 4, padding: { top: 4, right: 4, bottom: 4, left: 4 } },
    },
    {
      part: "Segment",
      description: "Individual segment button",
      dimensions: { width: 73, height: 28, cornerRadius: 6 },
      typography: { fontSize: 14, lineHeight: 22, fontWeight: 400, fontFamily: "Open Sans" },
    },
  ],

  /* ------------------------------------------------------------------
   * variantStyles — ALL 8 variants (2 size x 2 inverted x 2 disabled)
   * ------------------------------------------------------------------ */
  variantStyles: [
    // ===================== Size=Medium, Disabled=Off =====================
    // Inverted=Off
    { variantProps: { size: "medium", inverted: "off", disabled: "off" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 14, fontWeight: 600 },
      Container: { fill: "#e3e8ed", fillToken: "neutrals-100", height: 36 },
      SelectedSegment: { fill: "#006bd8", fillToken: "blue/500", width: 73, height: 28, textColor: "#ffffff", textColorToken: "white" },
      UnselectedSegment: { fill: "transparent", width: 73, height: 28, textColor: "#475263", textColorToken: "neutrals-700" },
    }},
    // Inverted=On
    { variantProps: { size: "medium", inverted: "on", disabled: "off" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 14, fontWeight: 600 },
      Container: { fill: "rgba(255,255,255,0.1)", height: 36 },
      SelectedSegment: { fill: "#3389e0", fillToken: "blue/400", width: 73, height: 28, textColor: "#ffffff", textColorToken: "white" },
      UnselectedSegment: { fill: "transparent", width: 73, height: 28, textColor: "#a6b0be", textColorToken: "neutrals-300" },
    }},

    // ===================== Size=Medium, Disabled=On =====================
    // Inverted=Off
    { variantProps: { size: "medium", inverted: "off", disabled: "on" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 14, fontWeight: 600 },
      Container: { fill: "#e3e8ed", fillToken: "neutrals-100", height: 36 },
      SelectedSegment: { fill: "#8390a2", fillToken: "neutrals-400", width: 73, height: 28, textColor: "#ffffff", textColorToken: "white" },
      UnselectedSegment: { fill: "transparent", width: 73, height: 28, textColor: "#475263", textColorToken: "neutrals-700" },
    }},
    // Inverted=On
    { variantProps: { size: "medium", inverted: "on", disabled: "on" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 14, fontWeight: 600 },
      Container: { fill: "rgba(255,255,255,0.1)", height: 36 },
      SelectedSegment: { fill: "#64748b", fillToken: "neutrals-500", width: 73, height: 28, textColor: "#ffffff", textColorToken: "white" },
      UnselectedSegment: { fill: "transparent", width: 73, height: 28, textColor: "#a6b0be", textColorToken: "neutrals-300" },
    }},

    // ===================== Size=Small, Disabled=Off =====================
    // Inverted=Off
    { variantProps: { size: "small", inverted: "off", disabled: "off" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, fontWeight: 600 },
      Container: { fill: "#e3e8ed", fillToken: "neutrals-100", height: 28 },
      SelectedSegment: { fill: "#006bd8", fillToken: "blue/500", width: 65, height: 20, textColor: "#ffffff", textColorToken: "white", fontSize: 12 },
      UnselectedSegment: { fill: "transparent", width: 65, height: 20, textColor: "#475263", textColorToken: "neutrals-700", fontSize: 12 },
    }},
    // Inverted=On
    { variantProps: { size: "small", inverted: "on", disabled: "off" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, fontWeight: 600 },
      Container: { fill: "rgba(255,255,255,0.1)", height: 28 },
      SelectedSegment: { fill: "#3389e0", fillToken: "blue/400", width: 65, height: 20, textColor: "#ffffff", textColorToken: "white", fontSize: 12 },
      UnselectedSegment: { fill: "transparent", width: 65, height: 20, textColor: "#a6b0be", textColorToken: "neutrals-300", fontSize: 12 },
    }},

    // ===================== Size=Small, Disabled=On =====================
    // Inverted=Off
    { variantProps: { size: "small", inverted: "off", disabled: "on" }, elements: {
      Label: { textColor: "#1d232c", textColorToken: "neutrals-900", fontSize: 12, fontWeight: 600 },
      Container: { fill: "#e3e8ed", fillToken: "neutrals-100", height: 28 },
      SelectedSegment: { fill: "#8390a2", fillToken: "neutrals-400", width: 65, height: 20, textColor: "#ffffff", textColorToken: "white", fontSize: 12 },
      UnselectedSegment: { fill: "transparent", width: 65, height: 20, textColor: "#475263", textColorToken: "neutrals-700", fontSize: 12 },
    }},
    // Inverted=On
    { variantProps: { size: "small", inverted: "on", disabled: "on" }, elements: {
      Label: { textColor: "#ffffff", textColorToken: "white", fontSize: 12, fontWeight: 600 },
      Container: { fill: "rgba(255,255,255,0.1)", height: 28 },
      SelectedSegment: { fill: "#64748b", fillToken: "neutrals-500", width: 65, height: 20, textColor: "#ffffff", textColorToken: "white", fontSize: 12 },
      UnselectedSegment: { fill: "transparent", width: 65, height: 20, textColor: "#a6b0be", textColorToken: "neutrals-300", fontSize: 12 },
    }},
  ],

  guidelines: {
    do: [
      {
        description:
          "Use segmented buttons to switch between 2-5 mutually exclusive views or filters.",
      },
      {
        description:
          "Always provide a clear label above the segmented button describing the choice being made.",
      },
      {
        description:
          "Use the inverted variant on dark backgrounds to maintain contrast.",
      },
      {
        description:
          "Keep segment labels short and concise (1-2 words) for readability.",
      },
      {
        description:
          "Use the small size in toolbars or space-constrained layouts.",
      },
    ],
    dont: [
      {
        description:
          "Don't use segmented buttons for more than 5 options -- use a dropdown or tabs instead.",
      },
      {
        description:
          "Don't use segmented buttons for actions -- they are for selecting views or filters, not triggering operations.",
      },
      {
        description:
          "Don't mix segmented buttons with radio buttons for the same type of selection in the same interface.",
      },
      {
        description:
          "Don't use long labels that cause segments to overflow or wrap.",
      },
    ],
  },

  accessibility: {
    role: "radiogroup",
    keyboard: [
      "Arrow Left/Right -- Moves selection to the previous/next segment.",
      "Tab -- Moves focus to the segmented button group.",
      "Shift+Tab -- Moves focus to the previous focusable element.",
      "Space/Enter -- Selects the focused segment.",
    ],
    ariaAttributes: [
      "role=\"radiogroup\" -- Identifies the container as a group of radio-like options.",
      "role=\"radio\" -- Each segment has radio role.",
      "aria-checked -- Indicates whether a segment is selected (true/false).",
      "aria-disabled -- Set to true when the segmented button is disabled.",
      "aria-label -- Provide on the group when there is no visible label text.",
    ],
  },

  relatedComponents: ["radio", "button"],

  considerations: [
    "When fewer than 3 options exist → use Radio buttons instead; a two-segment control often looks like a toggle and confuses users.",
    "When segment labels vary significantly in length → set all segments to equal width to prevent layout shifts on selection change.",
    "When used inside a toolbar alongside other controls → use the small size and ensure the segmented button doesn't dominate the visual hierarchy.",
  ],
};
