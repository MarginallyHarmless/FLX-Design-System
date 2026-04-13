import { type ComponentSpec } from "./types";

export const buttonSpec: ComponentSpec = {
  slug: "button",
  name: "Button",
  description:
    "Triggers actions like submitting forms, confirming dialogs, or navigating between steps.",
  status: "stable",
  figmaLink: "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=64-727",
  lastUpdated: "2026-03-17",

  variants: [
    { name: "Brand Primary", useCase: "Main call-to-action — the most common button.", props: { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off" } },
    { name: "Brand Secondary", useCase: "Secondary actions that sit alongside the primary CTA.", props: { scope: "Brand", variant: "Secondary", state: "Default", inverted: "Off" } },
    { name: "Brand Tertiary", useCase: "Low-emphasis actions such as Cancel or Learn more.", props: { scope: "Brand", variant: "Tertiary", state: "Default", inverted: "Off" } },
    { name: "Danger Primary", useCase: "Destructive actions like Delete or Remove.", props: { scope: "Danger", variant: "Primary", state: "Default", inverted: "Off" } },
    { name: "Danger Secondary", useCase: "Destructive secondary actions with less emphasis.", props: { scope: "Danger", variant: "Secondary", state: "Default", inverted: "Off" } },
    { name: "Success Primary", useCase: "Positive confirmation actions like Approve or Confirm.", props: { scope: "Success", variant: "Primary", state: "Default", inverted: "Off" } },
    { name: "Success Secondary", useCase: "Positive secondary actions with less emphasis.", props: { scope: "Success", variant: "Secondary", state: "Default", inverted: "Off" } },
    { name: "Inverted Primary", useCase: "Primary button on dark backgrounds.", props: { scope: "Brand", variant: "Primary", state: "Default", inverted: "On" } },
    { name: "Inverted Secondary", useCase: "Secondary button on dark backgrounds.", props: { scope: "Brand", variant: "Secondary", state: "Default", inverted: "On" } },
    { name: "Inverted Tertiary", useCase: "Tertiary button on dark backgrounds.", props: { scope: "Brand", variant: "Tertiary", state: "Default", inverted: "On" } },
  ],

  props: [
    {
      name: "scope",
      type: "string",
      default: '"Brand"',
      options: ["Brand", "Danger", "Success"],
      description: "The color scope determining the button's intent.",
    },
    {
      name: "variant",
      type: "string",
      default: '"Primary"',
      options: ["Primary", "Secondary", "Tertiary"],
      description: "The visual hierarchy of the button.",
    },
    {
      name: "state",
      type: "string",
      default: '"Default"',
      options: ["Default", "Hover", "Pressed", "Disabled"],
      description: "The interaction state of the button.",
    },
    {
      name: "size",
      type: "string",
      default: '"Medium"',
      options: ["Medium", "Small", "XS", "XXS"],
      description: "The size of the button.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Use inverted color scheme for dark backgrounds.",
    },
    {
      name: "hasLabel",
      type: "boolean",
      default: "true",
      description: "Whether the label text is visible. Controlled by 'Has Label' component property in Figma.",
    },
    {
      name: "hasIconStart",
      type: "boolean",
      default: "false",
      description: "Whether the leading (left) icon is visible. Controlled by 'Has Icon Start' component property in Figma.",
    },
    {
      name: "hasIconEnd",
      type: "boolean",
      default: "false",
      description: "Whether the trailing (right) icon is visible. Controlled by 'Has Icon End' component property in Figma.",
    },
    {
      name: "label",
      type: "string",
      default: '"Button"',
      description: "The button text label content. Controlled by 'Label' component property in Figma.",
    },
  ],

  states: ["Default", "Hover", "Pressed", "Disabled"],

  sizes: ["XXS", "XS", "Small", "Medium"],

  elements: [
    {
      part: "Container",
      description: "The button container with auto-layout, holding the icon and label.",
      layout: {
        direction: "HORIZONTAL",
        primaryAlign: "CENTER",
        counterAlign: "CENTER",
        itemSpacing: 6,
        padding: { top: 6, right: 12, bottom: 6, left: 12 },
      },
      dimensions: { cornerRadius: 8 },
    },
    {
      part: "Label",
      description: "The button text displayed centrally.",
      typography: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 600,
        fontFamily: "Open Sans",
      },
    },
    {
      part: "LeadingIcon",
      description: "Optional check icon displayed before the label.",
      toggleable: true,
      defaultVisible: false,
      toggleProperty: "Check",
      dimensions: { width: 24, height: 24 },
    },
    {
      part: "TrailingIcon",
      description: "Optional arrow icon displayed after the label.",
      toggleable: true,
      defaultVisible: false,
      toggleProperty: "ArrowRight",
      dimensions: { width: 24, height: 24 },
    },
  ],

  tokenBindings: [
    { element: "Container", property: "fills", variableName: "blue/500", resolvedValue: "#006bd8" },
    // Medium: paddingH=scale/12 (12), paddingV=scale/6 (6), itemSpacing=scale/6 (6), cornerRadius=Radius/200 (8)
    { element: "Container (Medium)", property: "paddingLeft", variableName: "scale/12", resolvedValue: "12" },
    { element: "Container (Medium)", property: "paddingTop", variableName: "scale/6", resolvedValue: "6" },
    { element: "Container (Medium)", property: "itemSpacing", variableName: "scale/6", resolvedValue: "6" },
    { element: "Container (Medium)", property: "cornerRadius", variableName: "Radius/200", resolvedValue: "8" },
    // Small: paddingH=scale/8 (8), paddingV=scale/6 (6), itemSpacing=scale/6 (6), cornerRadius=radius/8 (8)
    { element: "Container (Small)", property: "paddingLeft", variableName: "scale/8", resolvedValue: "8" },
    { element: "Container (Small)", property: "paddingTop", variableName: "scale/6", resolvedValue: "6" },
    { element: "Container (Small)", property: "cornerRadius", variableName: "radius/8", resolvedValue: "8" },
    // XS: paddingH=scale/6 (6), paddingV=scale/6 (6), itemSpacing=scale/6 (6), cornerRadius=radius/8 (8)
    { element: "Container (XS)", property: "paddingLeft", variableName: "scale/6", resolvedValue: "6" },
    { element: "Container (XS)", property: "cornerRadius", variableName: "radius/8", resolvedValue: "8" },
    // XXS: paddingH=scale/4 (4), paddingV=scale/2 (2), itemSpacing=scale/2 (2), cornerRadius=radius/4 (4)
    { element: "Container (XXS)", property: "paddingLeft", variableName: "scale/4", resolvedValue: "4" },
    { element: "Container (XXS)", property: "paddingTop", variableName: "scale/2", resolvedValue: "2" },
    { element: "Container (XXS)", property: "itemSpacing", variableName: "scale/2", resolvedValue: "2" },
    { element: "Container (XXS)", property: "cornerRadius", variableName: "radius/4", resolvedValue: "4" },
  ],

  anatomy: [
    {
      part: "Container",
      description:
        "The rounded rectangle wrapping all content. Uses auto-layout (horizontal, center-aligned) with scope-dependent fill color.",
    },
    {
      part: "Leading Icon (Check)",
      description:
        "Optional icon slot before the label. Hidden by default, toggled via component properties.",
    },
    {
      part: "Label",
      description:
        "The button text — Open Sans SemiBold, sized per the Size prop.",
    },
    {
      part: "Trailing Icon (ArrowRight)",
      description:
        "Optional icon slot after the label. Hidden by default, toggled via component properties.",
    },
  ],

  guidelines: {
    do: [
      { description: "[placeholder] Use Primary buttons for the single most important action on a page." },
      { description: "[placeholder] Use Danger scope for destructive actions to clearly signal risk." },
      { description: "[placeholder] Use Secondary or Tertiary variants for supporting actions." },
      { description: "[placeholder] Keep button labels short and action-oriented (e.g. Save, Delete, Continue)." },
      { description: "[placeholder] Maintain consistent sizing within a button group." },
    ],
    dont: [
      { description: "[placeholder] Don't use more than one Primary button per section — it dilutes hierarchy." },
      { description: "[placeholder] Don't use Danger scope for non-destructive actions." },
      { description: "[placeholder] Don't rely on color alone to convey meaning — include descriptive labels." },
      { description: "[placeholder] Don't mix sizes in the same button group." },
      { description: "[placeholder] Don't use disabled buttons without an explanation via tooltip." },
    ],
  },

  accessibility: {
    role: "button",
    keyboard: [
      "Enter — Activates the button.",
      "Space — Activates the button.",
      "Tab — Moves focus to the next focusable element.",
      "Shift+Tab — Moves focus to the previous focusable element.",
    ],
    ariaAttributes: [
      "aria-disabled — Set to true when the button is disabled.",
      "aria-label — Provide when the button has no visible text (icon-only).",
      "aria-busy — Set to true during async operations.",
    ],
  },

  usageGuidelines: [
    {
      type: "info",
      title: "Choosing the right hierarchy",
      description:
        "Use Primary for the most important call-to-action. Aim for one per screen, section, or container. Use Secondary for regular, non-primary actions; you may use several per screen. Use Tertiary for the lowest-priority actions, often in a group of three or paired with a Primary to signal an optional action.",
      previews: [
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off" },
        { scope: "Brand", variant: "Secondary", state: "Default", inverted: "Off" },
        { scope: "Brand", variant: "Tertiary", state: "Default", inverted: "Off" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right scope",
      description:
        "Use Brand for the majority of actions across the product. Reserve Danger for destructive or irreversible actions such as Delete, Remove, or Discard so the risk is visually clear. Use Success to confirm positive outcomes like Keep Generated Content, typically after a decision has been made.",
      previews: [
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off" },
        { scope: "Danger", variant: "Primary", state: "Default", inverted: "Off" },
        { scope: "Success", variant: "Primary", state: "Default", inverted: "Off" },
      ],
    },
    {
      type: "info",
      title: "Using icons in buttons",
      description:
        "Most buttons don't need an icon; a clear label is usually enough. Use an icon-only button when the icon's meaning is unambiguous. Pair a leading icon with the label when the icon is recognizable and reinforces the button's meaning. Trailing icons should be used in specific use cases as a nod to the interaction.",
      previews: [
        { scope: "Danger", variant: "Secondary", state: "Default", inverted: "Off", hasLabel: "false", hasIconStart: "true", iconStart: "TrashSimple" },
        { scope: "Brand", variant: "Secondary", state: "Default", inverted: "Off", hasIconStart: "true", iconStart: "Plus", label: "Add" },
        { scope: "Brand", variant: "Secondary", state: "Default", inverted: "Off", hasIconEnd: "true", iconEnd: "ArrowRight", label: "Continue" },
      ],
    },
    {
      type: "info",
      title: "Using the disabled state",
      description:
        "Use the Disabled state to maintain layout continuity and to communicate that an action may become available later. Always pair a disabled button with a hover tooltip that explains why it is disabled, so users understand what they need to do to enable it.",
      previews: [
        { scope: "Brand", variant: "Primary", state: "Disabled", inverted: "Off", label: "Publish", tooltip: "Add a title before publishing" },
      ],
    },
    {
      type: "info",
      title: "Form submission buttons",
      description:
        "Avoid disabling form submit buttons. Keep them active and surface validation feedback on click so users can see exactly what needs to be fixed.",
      previews: [
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off", label: "Submit", showInput: "true" },
      ],
    },
    {
      type: "info",
      title: "Choosing the right size",
      description:
        "Use Medium as the default size across admin pages. Use Small in tighter spaces such as canvas areas like UI Designer, Data Model, and Agent Builder. Reserve XS and XXS for cases where space is extremely limited and use them sparingly.",
      previews: [
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off", size: "Medium", label: "Medium" },
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off", size: "Small", label: "Small" },
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off", size: "XS", label: "XS" },
        { scope: "Brand", variant: "Primary", state: "Default", inverted: "Off", size: "XXS", label: "XXS" },
      ],
    },
  ],

  relatedComponents: ["input-field", "radio"],

  considerations: [
    "[placeholder] When multiple buttons compete for attention in the same section → use only one Primary per group; demote others to Secondary or Tertiary.",
    "[placeholder] When a destructive action is reversible → prefer Danger Secondary over Danger Primary to match the severity level.",
    "[placeholder] When using icon-only buttons (hasLabel=false) → always provide an aria-label; the XXS size is designed for this pattern but still needs a text alternative.",
    "[placeholder] When mixing scope colors in the same button group → keep the hierarchy consistent (e.g. Brand Primary + Danger Secondary, not Brand Secondary + Danger Primary).",
  ],
};
