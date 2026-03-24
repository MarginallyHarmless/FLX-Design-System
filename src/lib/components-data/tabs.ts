import { type ComponentSpec } from "./types";

export const tabsSpec: ComponentSpec = {
  slug: "tabs",
  name: "Tabs",
  description:
    "A horizontal navigation component for switching between content panels. Each tab can include an optional left icon and counter badge.",
  status: "stable",
  figmaLink:
    "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=1506-79929",
  lastUpdated: "2026-03-18",

  variants: [
    { name: "Default", useCase: "Standard tab bar for switching between content sections.", props: { size: "medium", inverted: "off" } },
    { name: "Small", useCase: "Compact tab bar for space-constrained layouts or secondary navigation.", props: { size: "small", inverted: "off" } },
    { name: "Inverted", useCase: "Tab bar on dark backgrounds to maintain contrast and legibility.", props: { size: "medium", inverted: "on" } },
    { name: "Small Inverted", useCase: "Compact inverted tab bar for dark, space-constrained layouts.", props: { size: "small", inverted: "on" } },
  ],

  props: [
    {
      name: "size",
      type: "string",
      default: '"medium"',
      options: ["small", "medium"],
      description: "The size of the tabs component.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Use inverted color scheme for dark backgrounds.",
    },
    {
      name: "tabs",
      type: "string[]",
      default: '["Tab Name", "Tab Name", "Tab Name", "Tab Name", "Tab Name"]',
      description: "Array of labels for each tab.",
    },
    {
      name: "activeIndex",
      type: "number",
      default: "1",
      description: "The zero-based index of the currently active tab.",
    },
    {
      name: "hasIcon",
      type: "boolean",
      default: "false",
      description: "Show a left icon in each tab cell.",
    },
    {
      name: "hasCounter",
      type: "boolean",
      default: "false",
      description: "Show a counter badge in each tab cell.",
    },
  ],

  states: ["active", "inactive"],

  sizes: ["small", "medium"],

  anatomy: [
    {
      part: "TabsContainer",
      description:
        "Horizontal layout wrapper holding all tab cells. Has a full-width bottom divider stroke.",
    },
    {
      part: "TabCell",
      description:
        "Individual tab with horizontal layout. Padding: 8px top/bottom, 12px left/right. Gap: 6px between children. Active tab has a visible bottom stroke indicator.",
    },
    {
      part: "TabIcon",
      description:
        "Optional left icon (16×16). Toggleable via the Left Icon boolean property.",
    },
    {
      part: "TabName",
      description:
        "Text label for the tab. Medium: 14px/24px SemiBold. Small: 12px/16px Regular (inactive) or SemiBold (active).",
    },
    {
      part: "Counter",
      description:
        "Optional counter badge. Pill-shaped (cornerRadius 99). Active: colored background with white text. Inactive: neutral background.",
    },
  ],

  elements: [
    {
      part: "TabsContainer",
      description: "Horizontal row of tab cells with bottom divider",
      layout: { direction: "HORIZONTAL", itemSpacing: 0 },
    },
    {
      part: "TabCell",
      description: "Individual clickable tab cell",
      layout: {
        direction: "HORIZONTAL",
        itemSpacing: 6,
        padding: { top: 8, right: 12, bottom: 8, left: 12 },
      },
    },
    {
      part: "TabIcon",
      description: "Optional left icon",
      dimensions: { width: 16, height: 16 },
      toggleable: true,
      defaultVisible: false,
      toggleProperty: "Left Icon",
    },
    {
      part: "TabName",
      description: "Tab label text",
      typography: { fontSize: 14, lineHeight: 24, fontWeight: 600, fontFamily: "Open Sans" },
    },
    {
      part: "Counter",
      description: "Optional counter badge",
      dimensions: { cornerRadius: 99 },
      toggleable: true,
      defaultVisible: false,
      toggleProperty: "Show Counter",
    },
  ],

  /* ------------------------------------------------------------------
   * variantStyles — ALL 4 variants (2 size × 2 inverted)
   * Each includes Active + Inactive elements for tab cells
   * ------------------------------------------------------------------ */
  variantStyles: [
    // ===================== Size=Medium, Inverted=Off =====================
    {
      variantProps: { size: "medium", inverted: "off" },
      elements: {
        TabsContainer: { stroke: "#e3e8ed", strokeToken: "neutrals/100", strokeWidth: 1 },
        ActiveTabCell: { stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 2 },
        InactiveTabCell: { stroke: "transparent", strokeWidth: 0 },
        ActiveTabName: { textColor: "#006bd8", textColorToken: "blue/500", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        InactiveTabName: { textColor: "#64748b", textColorToken: "neutrals/500", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ActiveCounter: { fill: "#006bd8", fillToken: "blue/500", textColor: "#ffffff", textColorToken: "white" },
        InactiveCounter: { fill: "#e3e8ed", fillToken: "neutrals/100", textColor: "#64748b", textColorToken: "neutrals/500" },
        TabIcon: { visible: false },
        Counter: { visible: false },
      },
    },
    // ===================== Size=Medium, Inverted=On =====================
    {
      variantProps: { size: "medium", inverted: "on" },
      elements: {
        TabsContainer: { stroke: "#475263", strokeToken: "neutrals/700", strokeWidth: 1 },
        ActiveTabCell: { stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 2 },
        InactiveTabCell: { stroke: "transparent", strokeWidth: 0 },
        ActiveTabName: { textColor: "#006bd8", textColorToken: "blue/500", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        InactiveTabName: { textColor: "#64748b", textColorToken: "neutrals/500", fontSize: 14, lineHeight: 24, fontWeight: 600 },
        ActiveCounter: { fill: "#006bd8", fillToken: "blue/500", textColor: "#ffffff", textColorToken: "white" },
        InactiveCounter: { fill: "#e3e8ed", fillToken: "neutrals/100", textColor: "#64748b", textColorToken: "neutrals/500" },
        TabIcon: { visible: false },
        Counter: { visible: false },
      },
    },
    // ===================== Size=Small, Inverted=Off =====================
    {
      variantProps: { size: "small", inverted: "off" },
      elements: {
        TabsContainer: { stroke: "#e3e8ed", strokeToken: "neutrals/100", strokeWidth: 1 },
        ActiveTabCell: { stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 2 },
        InactiveTabCell: { stroke: "transparent", strokeWidth: 0 },
        ActiveTabName: { textColor: "#006bd8", textColorToken: "blue/500", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        InactiveTabName: { textColor: "#64748b", textColorToken: "neutrals/500", fontSize: 12, lineHeight: 16, fontWeight: 400 },
        ActiveCounter: { fill: "#006bd8", fillToken: "blue/500", textColor: "#ffffff", textColorToken: "white" },
        InactiveCounter: { fill: "#e3e8ed", fillToken: "neutrals/100", textColor: "#64748b", textColorToken: "neutrals/500" },
        TabIcon: { visible: false },
        Counter: { visible: false },
      },
    },
    // ===================== Size=Small, Inverted=On =====================
    {
      variantProps: { size: "small", inverted: "on" },
      elements: {
        TabsContainer: { stroke: "#475263", strokeToken: "neutrals/700", strokeWidth: 1 },
        ActiveTabCell: { stroke: "#006bd8", strokeToken: "blue/500", strokeWidth: 2 },
        InactiveTabCell: { stroke: "transparent", strokeWidth: 0 },
        ActiveTabName: { textColor: "#006bd8", textColorToken: "blue/500", fontSize: 12, lineHeight: 16, fontWeight: 600 },
        InactiveTabName: { textColor: "#64748b", textColorToken: "neutrals/500", fontSize: 12, lineHeight: 16, fontWeight: 400 },
        ActiveCounter: { fill: "#006bd8", fillToken: "blue/500", textColor: "#ffffff", textColorToken: "white" },
        InactiveCounter: { fill: "#e3e8ed", fillToken: "neutrals/100", textColor: "#64748b", textColorToken: "neutrals/500" },
        TabIcon: { visible: false },
        Counter: { visible: false },
      },
    },
  ],

  tokenBindings: [
    { element: "TabsContainer", property: "stroke", variableName: "neutrals/100", resolvedValue: "#e3e8ed" },
    { element: "TabsContainer (inverted)", property: "stroke", variableName: "neutrals/700", resolvedValue: "#475263" },
    { element: "ActiveTabCell", property: "stroke", variableName: "blue/500", resolvedValue: "#006bd8" },
    { element: "InactiveTabName", property: "textColor", variableName: "neutrals/500", resolvedValue: "#64748b" },
    { element: "ActiveTabName", property: "textColor", variableName: "blue/500", resolvedValue: "#006bd8" },
    { element: "ActiveCounter", property: "fill", variableName: "blue/500", resolvedValue: "#006bd8" },
    { element: "ActiveCounter", property: "textColor", variableName: "white", resolvedValue: "#ffffff" },
    { element: "InactiveCounter", property: "fill", variableName: "neutrals/100", resolvedValue: "#e3e8ed" },
    { element: "InactiveCounter", property: "textColor", variableName: "neutrals/500", resolvedValue: "#64748b" },
    { element: "TabCell", property: "paddingTop/Bottom", variableName: "scale/8", resolvedValue: "8" },
    { element: "TabCell", property: "paddingLeft/Right", variableName: "scale/12", resolvedValue: "12" },
    { element: "TabCell", property: "itemSpacing", variableName: "scale/6", resolvedValue: "6" },
    { element: "TabName (M)", property: "fontSize", variableName: "fontsize/m", resolvedValue: "14" },
    { element: "TabName (M)", property: "lineHeight", variableName: "lineheight/24", resolvedValue: "24" },
    { element: "TabName (M)", property: "fontWeight", variableName: "weight/semibold", resolvedValue: "600" },
    { element: "TabName (S)", property: "fontSize", variableName: "fontsize/s", resolvedValue: "12" },
    { element: "TabName (S)", property: "lineHeight", variableName: "lineheight/16", resolvedValue: "16" },
    { element: "TabName (S inactive)", property: "fontWeight", variableName: "weight/regular", resolvedValue: "400" },
    { element: "TabName (S active)", property: "fontWeight", variableName: "weight/semibold", resolvedValue: "600" },
  ],

  guidelines: {
    do: [
      {
        description:
          "[placeholder] Use tabs to organize related content into separate panels that users can switch between.",
      },
      {
        description:
          "[placeholder] Keep tab labels short (1-2 words) to maintain a clean, scannable layout.",
      },
      {
        description:
          "[placeholder] Use the inverted variant on dark backgrounds to maintain readability.",
      },
      {
        description:
          "[placeholder] Ensure at least one tab is always active to indicate the current content.",
      },
      {
        description:
          "[placeholder] Use the counter badge to indicate the number of items within a tab's content.",
      },
    ],
    dont: [
      {
        description:
          "[placeholder] Don't use tabs for sequential steps or wizard flows -- use a stepper instead.",
      },
      {
        description:
          "[placeholder] Don't use more than 7 tabs -- consider grouping or using a different navigation pattern.",
      },
      {
        description:
          "[placeholder] Don't use tabs for actions or commands -- they are for content navigation only.",
      },
      {
        description:
          "[placeholder] Don't nest tabs within tabs -- this creates confusing navigation hierarchy.",
      },
    ],
  },

  accessibility: {
    role: "tablist",
    keyboard: [
      "Arrow Left/Right -- Moves focus to the previous/next tab.",
      "Tab -- Moves focus into/out of the tab list.",
      "Space/Enter -- Activates the focused tab.",
      "Home -- Moves focus to the first tab.",
      "End -- Moves focus to the last tab.",
    ],
    ariaAttributes: [
      'role="tablist" -- Identifies the container as a tab list.',
      'role="tab" -- Each tab cell has the tab role.',
      "aria-selected -- Indicates whether a tab is the active tab (true/false).",
      'role="tabpanel" -- Associated content panels should use this role.',
      "aria-controls -- Each tab references the ID of its corresponding panel.",
      "aria-labelledby -- Each panel references the ID of its controlling tab.",
    ],
  },

  relatedComponents: ["segmented-button", "button"],

  considerations: [
    "[placeholder] When tab count may exceed the visible container width → implement horizontal scroll or an overflow menu; the base component does not handle this.",
    "[placeholder] When tab content loads asynchronously → keep the tab bar interactive during loading to avoid layout jumps; show a skeleton inside the panel, not on the tabs.",
    "[placeholder] When a counter badge shows zero → hide the badge entirely rather than displaying '0', which adds visual clutter without information.",
  ],
};
