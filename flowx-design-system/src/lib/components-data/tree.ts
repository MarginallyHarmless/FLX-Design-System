import { type ComponentSpec } from "./types";

export const treeSpec: ComponentSpec = {
  slug: "tree",
  name: "Tree",
  description:
    "A hierarchical dropdown list for selecting items with optional search, grouping, and multiple selection modes.",
  status: "beta",
  figmaLink:
    "https://www.figma.com/design/aGMqzHMsAiwCUU5DSgUe1S/?node-id=428-21871",
  lastUpdated: "2026-03-25",

  variants: [
    {
      name: "Multi-Select",
      useCase: "Allow users to select multiple items from the list using checkboxes.",
      props: { type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "off" },
    },
    {
      name: "Single-Select",
      useCase: "Restrict selection to a single item using radio buttons.",
      props: { type: "Select (Single)", size: "Medium", inverted: "off", nesting: "off" },
    },
    {
      name: "Icons",
      useCase: "Display items without selection controls, using icons for navigation or actions.",
      props: { type: "Icons", size: "Medium", inverted: "off", nesting: "off" },
    },
    {
      name: "With Nesting",
      useCase: "Group items under collapsible parent categories for hierarchical data.",
      props: { type: "Select (Multi)", size: "Medium", inverted: "off", nesting: "on" },
    },
    {
      name: "Inverted",
      useCase: "Use on dark surfaces such as modals or side panels with dark backgrounds.",
      props: { type: "Select (Multi)", size: "Medium", inverted: "on", nesting: "off" },
    },
    {
      name: "Small Size",
      useCase: "Compact variant for space-constrained layouts or secondary UI areas.",
      props: { type: "Select (Multi)", size: "Small", inverted: "off", nesting: "off" },
    },
  ],

  props: [
    {
      name: "type",
      type: "string",
      default: '"Select (Multi)"',
      options: ["Select (Multi)", "Select (Single)", "Icons"],
      description: "The selection mode of the tree: multi-select with checkboxes, single-select with radio buttons, or icon-only rows.",
    },
    {
      name: "size",
      type: "string",
      default: '"Medium"',
      options: ["Medium", "Small"],
      description: "The size of the tree component and its rows.",
    },
    {
      name: "inverted",
      type: "boolean",
      default: "false",
      description: "Use inverted color scheme for dark backgrounds.",
    },
    {
      name: "nesting",
      type: "boolean",
      default: "false",
      description: "Enable hierarchical grouping with parent categories and indented child items.",
    },
    {
      name: "showHeader",
      type: "boolean",
      default: "true",
      description: "Show the header row containing the select-all checkbox and search input.",
    },
  ],

  states: ["default", "hover", "selected", "disabled"],

  sizes: ["Medium", "Small"],

  anatomy: [
    {
      part: "Select Header Row",
      description: "Top row containing a select-all checkbox icon and a search input field.",
    },
    {
      part: "Search Input",
      description: "Text input with magnifying glass icon for filtering tree items.",
    },
    {
      part: "Checkbox / Radio Icon",
      description: "Selection indicator — checkbox for multi-select, radio for single-select, hidden in Icons mode.",
    },
    {
      part: "Row Label",
      description: "Primary text content of each dropdown row.",
    },
    {
      part: "Group Parent",
      description: "Bold category row with a caret icon, used when nesting is enabled to group child items.",
    },
    {
      part: "Group Child",
      description: "Indented row nested under a group parent, with left padding for visual hierarchy.",
    },
    {
      part: "Caret Icon",
      description: "Right-aligned chevron on group parent rows indicating expandable/collapsible state.",
    },
    {
      part: "Separator",
      description: "Horizontal divider line between groups of items.",
    },
  ],

  guidelines: {
    do: [
      { description: "Use multi-select when users need to pick several items from a list." },
      { description: "Use single-select when only one choice is valid." },
      { description: "Enable nesting for hierarchical data like locations or categories." },
      { description: "Show the search header when the list contains more than 7 items." },
      { description: "Use the small size in compact layouts like sidebars or popovers." },
    ],
    dont: [
      { description: "Don't use a tree for flat lists with fewer than 5 items — use checkboxes or radios instead." },
      { description: "Don't nest more than 2 levels deep to avoid usability issues." },
      { description: "Don't hide the header when search is essential for discoverability." },
      { description: "Don't mix selection types (multi and single) within the same tree instance." },
    ],
  },

  accessibility: {
    role: "tree / treeitem",
    keyboard: [
      "Arrow Up/Down to navigate between rows",
      "Arrow Right to expand a collapsed group parent",
      "Arrow Left to collapse an expanded group parent",
      "Space or Enter to toggle selection on the focused row",
      "Home/End to jump to first/last visible row",
    ],
    ariaAttributes: [
      "aria-expanded on group parent rows",
      "aria-selected on selected rows",
      "aria-level to indicate nesting depth",
      "aria-multiselectable on the tree root for multi-select mode",
    ],
  },

  relatedComponents: ["checkbox", "radio", "select-field"],

  considerations: [
    "The tree component uses Dropdown_row sub-components internally — each row is an instance with its own variant properties (Contents, state, Group Parent, Group Child, Size, Inverted).",
    "Nesting uses indentation via left padding on Group Child rows rather than actual DOM nesting.",
    "The header row's search input is a full Input Field component instance with its own state management.",
  ],
};
