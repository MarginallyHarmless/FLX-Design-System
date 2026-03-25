import { type ComponentSpec } from "./types";

export const valuesTableSpec: ComponentSpec = {
  slug: "values-table",
  name: "Table (Values)",
  description:
    "Editable table for managing simple items that don't warrant their own details page — inline editing with validation.",
  status: "stable",
  figmaLink: "",
  lastUpdated: "2026-03-18",

  variants: [
    {
      name: "Read-only",
      useCase: "Default view — rows display values as plain text with edit/delete actions.",
      props: { editMode: "off", error: "off" },
    },
    {
      name: "Edit Mode",
      useCase: "Row enters edit mode with inline input fields and save/cancel actions.",
      props: { editMode: "on", error: "off" },
    },
    {
      name: "Validation Error",
      useCase: "Edit mode with validation errors shown on specific cells.",
      props: { editMode: "on", error: "on" },
    },
  ],

  props: [
    {
      name: "editMode",
      type: "boolean",
      default: "false",
      description: "When true, the second row switches from read-only text to inline input fields.",
    },
    {
      name: "error",
      type: "boolean",
      default: "false",
      description:
        "When true (and editMode is on), the third row shows validation errors with red borders and error messages.",
    },
  ],

  states: ["read-only", "editing", "error"],

  anatomy: [
    { part: "Table Container", description: "Outer wrapper with white background, 1px border (#cbd1db), and 16px corner radius." },
    { part: "Header Row", description: "Column headers with semi-transparent background (#f7f8f980), sort/filter icons, and bottom border." },
    { part: "Header Column", description: "Individual column header with label (12px Bold) and optional sort/filter icon." },
    { part: "Data Row", description: "Horizontal row containing cells separated by vertical dividers, with an action column." },
    { part: "Read-only Cell", description: "Plain text cell (14px Regular, #0f1114). Placeholder text at 30% opacity." },
    { part: "Editable Cell", description: "Inline input field with 4px corner radius, 1px border. Supports default, focused, and placeholder states." },
    { part: "Error Cell", description: "Input field with red border (#e62200), error icon, and optional error message below." },
    { part: "Action Column", description: "Contains row action buttons: edit/delete (read-only) or save/cancel (editing)." },
    { part: "Edit Button", description: "28x28px icon button with white fill and #e3e8ed border." },
    { part: "Delete Button", description: "28x28px icon button with white fill and #e3e8ed border." },
    { part: "Save Button", description: "28x28px icon button with green fill (#008060) in active state, gray (#e3e8ed) when disabled." },
    { part: "Cancel Button", description: "28x28px icon button with red fill (#e62200)." },
    { part: "Error Message", description: "12px Regular red text below the cell: 'Field is required'." },
    { part: "Tooltip", description: "Validation tooltip showing detailed error message on hover." },
  ],

  guidelines: {
    do: [
      { description: "[placeholder] Show clear validation errors inline with the affected cell." },
      { description: "[placeholder] Provide save/cancel actions when a row is in edit mode." },
      { description: "[placeholder] Use placeholder text ('Add a value...') for empty cells to indicate they accept input." },
      { description: "[placeholder] Disable the save button when validation errors are present." },
    ],
    dont: [
      { description: "[placeholder] Don't allow saving a row with validation errors." },
      { description: "[placeholder] Don't show edit and save/cancel buttons simultaneously on the same row." },
      { description: "[placeholder] Don't use the table for non-tabular or unstructured data." },
    ],
  },

  accessibility: {
    role: "table",
    keyboard: [
      "Tab — Move focus between cells and action buttons",
      "Enter — Activate edit mode on a read-only row, or save changes in edit mode",
      "Escape — Cancel editing and revert to read-only state",
    ],
    ariaAttributes: [
      "role=\"table\" — On the outer container",
      "role=\"row\" — On each data row",
      "role=\"columnheader\" — On header cells",
      "role=\"cell\" — On data cells",
      "aria-invalid=\"true\" — On cells with validation errors",
      "aria-describedby — Links error cells to their error message",
    ],
  },

  relatedComponents: ["input-field"],

  considerations: [
    "[placeholder] When entering edit mode on one row → disable edit buttons on other rows to prevent concurrent edits and confusing save states.",
    "[placeholder] When a language column has no translation yet → show placeholder text ('Add a value...') with reduced opacity so the cell is clearly actionable, not broken.",
    "[placeholder] When the table has many rows → keep the header sticky so column context is visible during scroll.",
  ],

  decisionLog: [
    { date: "2024-09-24", decision: "Use modal for adding new entities instead of edit-in-place", reasoning: "Consistency with all other entity lists outweighs the convenience of inline creation. The original interaction was edit-in-place (pre-table redesign) but the team agreed consistency is more valuable." },
  ],
};
