"use client";

import React from "react";
import { valuesTableSpec } from "@/lib/components-data/values-table";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";

/* ------------------------------------------------------------------ */
/*  Colors extracted from Figma (scan_text_nodes + get_node_info)     */
/* ------------------------------------------------------------------ */

const colors = {
  border: "#cbd1db",
  headerBg: "rgba(247, 248, 249, 0.5)",
  headerText: "#64748b",
  headerTextBold: "#0f1114",
  cellText: "#0f1114",
  placeholder: "#0f1114",
  placeholderOpacity: 0.3,
  white: "#ffffff",
  inputBorder: "#cbd1db",
  inputBorderFocus: "#006bd8",
  errorBorder: "#e62200",
  errorText: "#e62200",
  editBtnBorder: "#e3e8ed",
  saveBtnActive: "#008060",
  saveBtnDisabled: "#e3e8ed",
  cancelBtn: "#e62200",
};

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                         */
/* ------------------------------------------------------------------ */

function SortIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 5L6 2L9 5" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 7L6 10L9 7" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1.5 2.5H10.5L7 6.5V9.5L5 10.5V6.5L1.5 2.5Z" stroke="#64748b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M11.5 2L14 4.5L5.5 13H3V10.5L11.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 5H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 5V13H11V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 3H9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3.5 3.5L10.5 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10.5 3.5L3.5 10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke={colors.errorBorder} strokeWidth="1.5" />
      <path d="M8 5V8.5" stroke={colors.errorBorder} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.75" fill={colors.errorBorder} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

const columnHeaders = [
  { label: "Code", bold: true, hasFilter: true },
  { label: "en - English", bold: false, hasSort: true },
  { label: "fr-French", bold: false, hasSort: true },
];

interface CellData {
  value: string;
  isPlaceholder?: boolean;
}

const readOnlyRow1: CellData[] = [
  { value: "CODE 2" },
  { value: "Filled Cell" },
  { value: "Filled Cell" },
];

const readOnlyRow2: CellData[] = [
  { value: "CODE 1" },
  { value: "Filled Cell" },
  { value: "Filled Cell" },
];

const readOnlyRow3: CellData[] = [
  { value: "CODE 1" },
  { value: "Filled Cell" },
  { value: "Filled Cell" },
];

interface EditCellData {
  value: string;
  isPlaceholder?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
}

const editRow: EditCellData[] = [
  { value: "CODE 1", isReadOnly: true },
  { value: "Value" },
  { value: "Value", isFocused: true },
];

interface ErrorCellData {
  value: string;
  isPlaceholder?: boolean;
  hasError?: boolean;
  isReadOnly?: boolean;
  errorMessage?: string;
}

const errorRow: ErrorCellData[] = [
  { value: "CODE 1", isReadOnly: true },
  { value: "Value", hasError: true },
  { value: "Filled Cell" },
];

/* ------------------------------------------------------------------ */
/*  Table cells                                                       */
/* ------------------------------------------------------------------ */

function ReadOnlyCell({ data }: { data: CellData }) {
  return (
    <div
      style={{
        width: 153,
        height: 52,
        display: "flex",
        alignItems: "center",
        fontSize: 14,
        fontWeight: 400,
        color: colors.cellText,
        opacity: data.isPlaceholder ? colors.placeholderOpacity : 1,
      }}
    >
      {data.value}
    </div>
  );
}

function EditableCell({ data }: { data: EditCellData }) {
  if (data.isReadOnly) {
    return (
      <div
        style={{
          width: 153,
          height: 52,
          display: "flex",
          alignItems: "center",
          fontSize: 14,
          fontWeight: 400,
          color: colors.cellText,
        }}
      >
        {data.value}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 160,
        height: 52,
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 36,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 4,
          border: `1px solid ${data.isFocused ? colors.inputBorderFocus : colors.inputBorder}`,
          backgroundColor: colors.white,
          outline: data.isFocused ? `2px solid ${colors.inputBorderFocus}` : undefined,
          outlineOffset: data.isFocused ? 1 : undefined,
          fontSize: 14,
          fontWeight: 400,
          color: data.isPlaceholder ? "#93999f" : colors.cellText,
        }}
      >
        {data.value}
        {data.isFocused && (
          <span
            style={{
              display: "inline-block",
              width: 1,
              height: 18,
              backgroundColor: colors.cellText,
              marginLeft: 1,
              animation: "blink 1s step-end infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ErrorCell({ data }: { data: ErrorCellData }) {
  if (data.isReadOnly) {
    return (
      <div
        style={{
          width: 153,
          height: 52,
          display: "flex",
          alignItems: "center",
          fontSize: 14,
          fontWeight: 400,
          color: colors.cellText,
        }}
      >
        {data.value}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 160,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div
        style={{
          width: "100%",
          height: 36,
          display: "flex",
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: data.hasError ? 8 : 10,
          borderRadius: 4,
          border: `1px solid ${data.hasError ? colors.errorBorder : colors.inputBorder}`,
          backgroundColor: colors.white,
          fontSize: 14,
          fontWeight: 400,
          color: colors.cellText,
          gap: 6,
        }}
      >
        <span style={{ flex: 1 }}>{data.value}</span>
        {data.hasError && <ErrorIcon />}
      </div>
      {data.errorMessage && (
        <span style={{ fontSize: 12, color: colors.errorText, lineHeight: "18px" }}>
          {data.errorMessage}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small Secondary icon-only button (matches Button component spec)  */
/*  Size Small: 28px height, 8px corner radius, 16px icon             */
/* ------------------------------------------------------------------ */

function SmallSecondaryButton({
  scope = "Brand",
  state = "Default",
  children,
}: {
  scope?: "Brand" | "Danger" | "Success";
  state?: "Default" | "Disabled";
  children: React.ReactNode;
}) {
  /* Colors from button.ts variantStyles — Secondary, Off (not inverted) */
  const colorMap: Record<string, Record<string, { fill: string; stroke: string; iconColor: string }>> = {
    Brand: {
      Default:  { fill: "#ffffff", stroke: "#e3e8ed", iconColor: "#1d232c" },
      Disabled: { fill: "transparent", stroke: "#cbd1db", iconColor: "#a6b0be" },
    },
    Danger: {
      Default:  { fill: "#ffffff", stroke: "#e3e8ed", iconColor: "#1d232c" },
      Disabled: { fill: "transparent", stroke: "#cbd1db", iconColor: "#a6b0be" },
    },
    Success: {
      Default:  { fill: "#ffffff", stroke: "#e3e8ed", iconColor: "#1d232c" },
      Disabled: { fill: "transparent", stroke: "#cbd1db", iconColor: "#a6b0be" },
    },
  };

  const c = colorMap[scope]?.[state] ?? colorMap.Brand.Default;

  return (
    <div
      style={{
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: c.fill,
        border: `1px solid ${c.stroke}`,
        cursor: state === "Disabled" ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        color: c.iconColor,
      }}
    >
      {children}
    </div>
  );
}

/* Small Primary icon-only button (for save/cancel in edit mode) */
function SmallPrimaryButton({
  scope = "Brand",
  state = "Default",
  children,
}: {
  scope?: "Brand" | "Danger" | "Success";
  state?: "Default" | "Disabled";
  children: React.ReactNode;
}) {
  const colorMap: Record<string, Record<string, { fill: string; iconColor: string }>> = {
    Brand:   { Default: { fill: "#006bd8", iconColor: "#ffffff" }, Disabled: { fill: "#e3e8ed", iconColor: "#8390a2" } },
    Danger:  { Default: { fill: "#e62200", iconColor: "#ffffff" }, Disabled: { fill: "#e3e8ed", iconColor: "#8390a2" } },
    Success: { Default: { fill: "#008060", iconColor: "#ffffff" }, Disabled: { fill: "#e3e8ed", iconColor: "#8390a2" } },
  };

  const c = colorMap[scope]?.[state] ?? colorMap.Brand.Default;

  return (
    <div
      style={{
        width: 28,
        height: 28,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        backgroundColor: c.fill,
        border: "none",
        cursor: state === "Disabled" ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        color: c.iconColor,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Action buttons                                                    */
/* ------------------------------------------------------------------ */

function ReadOnlyActions() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <SmallSecondaryButton scope="Brand">
        <PencilIcon />
      </SmallSecondaryButton>
      <SmallSecondaryButton scope="Brand">
        <TrashIcon />
      </SmallSecondaryButton>
    </div>
  );
}

function EditActions({ disabled = false }: { disabled?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <SmallPrimaryButton scope="Success" state={disabled ? "Disabled" : "Default"}>
        <CheckIcon color={disabled ? "#8390a2" : "#ffffff"} />
      </SmallPrimaryButton>
      <SmallPrimaryButton scope="Danger">
        <XIcon />
      </SmallPrimaryButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Separator                                                         */
/* ------------------------------------------------------------------ */

function VerticalSep() {
  return (
    <div
      style={{
        width: 1,
        alignSelf: "stretch",
        backgroundColor: colors.border,
        flexShrink: 0,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  FlowXValuesTable — the preview component                         */
/* ------------------------------------------------------------------ */

function FlowXValuesTable({
  editMode = false,
  error = false,
}: {
  editMode?: boolean;
  error?: boolean;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-flowx)",
        fontSize: 14,
        backgroundColor: colors.white,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* ---- Header ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 50,
          backgroundColor: colors.headerBg,
          borderBottom: `1px solid ${colors.border}`,
          paddingLeft: 14,
        }}
      >
        {columnHeaders.map((col, i) => (
          <React.Fragment key={col.label}>
            {i > 0 && <VerticalSep />}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 4,
                paddingLeft: 14,
                paddingRight: 14,
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: col.bold ? 700 : 400,
                  color: col.bold ? colors.headerTextBold : colors.headerText,
                  lineHeight: "18px",
                }}
              >
                {col.label}
              </span>
              {col.hasFilter && <FilterIcon />}
              {col.hasSort && <SortIcon />}
            </div>
          </React.Fragment>
        ))}
        {/* Action column header spacer */}
        <VerticalSep />
        <div style={{ width: 96, flexShrink: 0 }} />
      </div>

      {/* ---- Row 1: always read-only ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minHeight: 56,
          borderBottom: `1px solid ${colors.border}`,
          paddingLeft: 14,
        }}
      >
        {readOnlyRow1.map((cell, i) => (
          <React.Fragment key={i}>
            {i > 0 && <VerticalSep />}
            <div style={{ flex: 1, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
              <ReadOnlyCell data={cell} />
            </div>
          </React.Fragment>
        ))}
        <VerticalSep />
        <div style={{ width: 96, flexShrink: 0, display: "flex", justifyContent: "center", paddingLeft: 16, paddingRight: 16 }}>
          <ReadOnlyActions />
        </div>
      </div>

      {/* ---- Row 2: read-only OR editable ---- */}
      <div
        style={{
          display: "flex",
          alignItems: editMode ? "flex-start" : "center",
          minHeight: 56,
          borderBottom: `1px solid ${colors.border}`,
          paddingLeft: 14,
          paddingTop: editMode ? 10 : 0,
          paddingBottom: editMode ? 10 : 0,
        }}
      >
        {editMode
          ? editRow.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: 1, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <EditableCell data={cell} />
                </div>
              </React.Fragment>
            ))
          : readOnlyRow2.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: 1, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ReadOnlyCell data={cell} />
                </div>
              </React.Fragment>
            ))}
        <VerticalSep />
        <div
          style={{
            width: 96,
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: editMode ? 8 : 0,
          }}
        >
          {editMode ? <EditActions /> : <ReadOnlyActions />}
        </div>
      </div>

      {/* ---- Row 3: read-only OR error ---- */}
      <div
        style={{
          display: "flex",
          alignItems: error ? "flex-start" : "center",
          minHeight: 56,
          paddingLeft: 14,
          paddingTop: error ? 10 : 0,
          paddingBottom: error ? 10 : 0,
        }}
      >
        {error
          ? errorRow.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: 1, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ErrorCell data={cell} />
                </div>
              </React.Fragment>
            ))
          : readOnlyRow3.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: 1, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ReadOnlyCell data={cell} />
                </div>
              </React.Fragment>
            ))}
        <VerticalSep />
        <div
          style={{
            width: 96,
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: error ? 8 : 0,
          }}
        >
          {error ? <EditActions disabled /> : <ReadOnlyActions />}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const tableTokens = [
  {
    name: "neutrals/300 (#cbd1db)",
    value: "Table border, cell separators",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#cbd1db" }} />,
  },
  {
    name: "grays/50 (#ffffff)",
    value: "Table background, input background",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#ffffff", border: "1px solid #e3e8ed" }} />,
  },
  {
    name: "neutrals/50 (#f7f8f9)",
    value: "Header row background (50% opacity)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f7f8f9" }} />,
  },
  {
    name: "neutrals/900 (#0f1114)",
    value: "Cell text, input value text",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#0f1114" }} />,
  },
  {
    name: "blue/500 (#006bd8)",
    value: "Focused input border ring",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "red/500 (#e62200)",
    value: "Error border, error text, cancel button",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e62200" }} />,
  },
  {
    name: "green/600 (#008060)",
    value: "Save button (active)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#008060" }} />,
  },
  {
    name: "neutrals/100 (#e3e8ed)",
    value: "Button borders, disabled save button",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e3e8ed" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ValuesTablePage() {
  const spec = valuesTableSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={tableTokens}
      interactivePreview={
        <ComponentPreview
          title="Values Table"
          description="Toggle edit mode and error state to see different row behaviors."
          controls={[
            {
              name: "editMode",
              type: "boolean",
            },
            {
              name: "error",
              type: "boolean",
              disabledUnless: "editMode",
            },
          ]}
          render={(values) => (
            <div style={{ overflowX: "auto", padding: 16 }}>
              <FlowXValuesTable
                editMode={values.editMode === true}
                error={values.error === true}
              />
            </div>
          )}
        />
      }
      useCases={
        <div className="grid gap-8">
          {spec.variants.map((v) => (
            <div
              key={v.name}
              className="flex flex-col gap-3 rounded-lg p-6"
              style={{ backgroundColor: "#f7f8f9" }}
            >
              <div style={{ overflowX: "auto" }}>
                <FlowXValuesTable
                  editMode={v.props.editMode === "on"}
                  error={v.props.error === "on"}
                />
              </div>
              <div>
                <p className="text-sm font-medium">{v.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{v.useCase}</p>
              </div>
            </div>
          ))}
        </div>
      }
      statesReference={
        <div className="flex flex-col gap-8">
          {["read-only", "editing", "error"].map((s) => (
            <div key={s} className="flex flex-col gap-3">
              <div style={{ overflowX: "auto" }}>
                <FlowXValuesTable
                  editMode={s === "editing" || s === "error"}
                  error={s === "error"}
                />
              </div>
              <span className="text-xs text-muted-foreground capitalize">{s}</span>
            </div>
          ))}
        </div>
      }
      sizes={<></>}
    />
  );
}
