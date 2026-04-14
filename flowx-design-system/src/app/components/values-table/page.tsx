"use client";

import React from "react";
import { valuesTableSpec } from "@/lib/components-data/values-table";
import { inputFieldSpec } from "@/lib/components-data/input-field";
import {
  getTextColor,
  getElementStyle,
} from "@/lib/components-data/variant-style-helpers";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXErrorIcon, FlowXTooltip } from "@/components/docs/shared-elements";
import { PencilSimple, TrashSimple, Check, X as XIcon, SortAscending, Funnel } from "@phosphor-icons/react";

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
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

const columnHeaders = [
  { label: "Code", bold: true, hasFilter: true, width: 90 },
  { label: "EN", bold: false, hasSort: true },
  { label: "FR", bold: false, hasSort: true },
];

interface CellData {
  value: string;
  isPlaceholder?: boolean;
}

const readOnlyRow1: CellData[] = [
  { value: "CODE 2" },
  { value: "Value" },
  { value: "Value" },
];

const readOnlyRow2: CellData[] = [
  { value: "CODE 1" },
  { value: "Value" },
  { value: "Value" },
];

const readOnlyRow3: CellData[] = [
  { value: "CODE 1" },
  { value: "Value" },
  { value: "Value" },
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
  { value: "Add a value...", hasError: true, isPlaceholder: true },
  { value: "Value" },
];

/* ------------------------------------------------------------------ */
/*  Table cells                                                       */
/* ------------------------------------------------------------------ */

function ReadOnlyCell({ data }: { data: CellData }) {
  return (
    <div
      style={{
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

/**
 * Reusable inline input cell that pulls styles from inputFieldSpec
 * to match the Input Field component exactly (label off, small size).
 */
function InputCell({
  value,
  state = "default",
  isPlaceholder = false,
}: {
  value: string;
  state?: "default" | "focused" | "error";
  isPlaceholder?: boolean;
}) {
  const spec = inputFieldSpec;
  const variantProps = { State: state === "default" ? "Default" : state === "focused" ? "Focused" : "Error", Size: "Medium", Inverted: "Off" };

  const containerStyle = getElementStyle(spec, variantProps, "InputContainer");
  const valueColor = getTextColor(spec, variantProps, "ValueText");
  const placeholderColor = getTextColor(spec, variantProps, "Placeholder");
  const isFocused = state === "focused";
  const isError = state === "error";

  const focusRingColor = isFocused ? containerStyle?.stroke : undefined;

  return (
    <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "100%",
          height: containerStyle?.height ?? 28,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 8,
          border: `${containerStyle?.strokeWidth ?? 1}px solid ${containerStyle?.stroke}`,
          backgroundColor: containerStyle?.fill ?? "#ffffff",
          outline: focusRingColor ? `2px solid ${focusRingColor}` : undefined,
          outlineOffset: isFocused ? 1 : undefined,
          fontSize: 14,
          lineHeight: "24px",
          fontWeight: 400,
          color: isPlaceholder ? placeholderColor : valueColor,
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </span>
        {isError && (
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <FlowXErrorIcon size={14} />
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 6px)",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
              }}
            >
              <FlowXTooltip useCase="error" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EditableCell({ data }: { data: EditCellData }) {
  if (data.isReadOnly) {
    return (
      <div style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: 400, color: colors.cellText }}>
        {data.value}
      </div>
    );
  }

  return (
    <InputCell
      value={data.value}
      state={data.isFocused ? "focused" : "default"}
      isPlaceholder={data.isPlaceholder}
    />
  );
}

function ErrorCell({ data }: { data: ErrorCellData }) {
  if (data.isReadOnly) {
    return (
      <div style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: 400, color: colors.cellText }}>
        {data.value}
      </div>
    );
  }

  return (
    <InputCell
      value={data.value}
      state={data.hasError ? "error" : "default"}
      isPlaceholder={data.isPlaceholder}
    />
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
        <PencilSimple size={16} color="currentColor" />
      </SmallSecondaryButton>
      <SmallSecondaryButton scope="Brand">
        <TrashSimple size={16} color="currentColor" />
      </SmallSecondaryButton>
    </div>
  );
}

function EditActions({ disabled = false }: { disabled?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <SmallPrimaryButton scope="Success" state={disabled ? "Disabled" : "Default"}>
        <Check size={14} color={disabled ? "#8390a2" : "#ffffff"} />
      </SmallPrimaryButton>
      <SmallPrimaryButton scope="Danger">
        <XIcon size={14} color="#ffffff" />
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
        width: 0.5,
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

function BatchEditActions() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <SmallSecondaryButton scope="Brand">
        <TrashSimple size={16} color="currentColor" />
      </SmallSecondaryButton>
    </div>
  );
}

function FlowXValuesTable({
  editMode = false,
  error = false,
  bordered = true,
  batchEdit = false,
}: {
  editMode?: boolean;
  error?: boolean;
  bordered?: boolean;
  batchEdit?: boolean;
}) {
  const actionColWidth = batchEdit ? 60 : 96;

  return (
    <div
      style={{
        fontFamily: "var(--font-flowx)",
        fontSize: 14,
        backgroundColor: colors.white,
        border: bordered ? `0.5px solid ${colors.border}` : "none",
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
        boxShadow: bordered ? "none" : "2px 2px 24px 0px rgba(22, 52, 98, 0.08)",
      }}
    >
      {/* ---- Header ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 50,
          backgroundColor: bordered ? colors.headerBg : colors.white,
          borderBottom: `0.5px solid ${colors.border}`,
        }}
      >
        {columnHeaders.map((col, i) => (
          <React.Fragment key={col.label}>
            {i > 0 && <VerticalSep />}
            <div
              style={{
                flex: col.width ? undefined : 1,
                width: col.width,
                flexShrink: col.width ? 0 : undefined,
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
              {col.hasFilter && <Funnel size={12} color="#64748b" />}
              {col.hasSort && <SortAscending size={12} color="#64748b" />}
            </div>
          </React.Fragment>
        ))}
        {/* Action column header spacer */}
        <VerticalSep />
        <div style={{ width: actionColWidth, flexShrink: 0 }} />
      </div>

      {/* ---- Row 1: always read-only OR batch-edit ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 56,
          borderBottom: `0.5px solid ${colors.border}`,
        }}
      >
        {batchEdit
          ? readOnlyRow1.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <EditableCell data={{ value: cell.value }} />
                </div>
              </React.Fragment>
            ))
          : readOnlyRow1.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ReadOnlyCell data={cell} />
                </div>
              </React.Fragment>
            ))}
        <VerticalSep />
        <div style={{ width: actionColWidth, flexShrink: 0, display: "flex", justifyContent: "center", paddingLeft: 16, paddingRight: 16 }}>
          {batchEdit ? <BatchEditActions /> : <ReadOnlyActions />}
        </div>
      </div>

      {/* ---- Row 2: read-only OR editable OR batch-edit (hidden when error-only) ---- */}
      {(editMode || !error) && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 56,
          borderBottom: `0.5px solid ${colors.border}`,
        }}
      >
        {(editMode || batchEdit)
          ? editRow.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <EditableCell data={batchEdit ? { ...cell, isReadOnly: false } : cell} />
                </div>
              </React.Fragment>
            ))
          : readOnlyRow2.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ReadOnlyCell data={cell} />
                </div>
              </React.Fragment>
            ))}
        <VerticalSep />
        <div
          style={{
            width: actionColWidth,
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            alignItems: "center",
          }}
        >
          {batchEdit ? <BatchEditActions /> : editMode ? <EditActions /> : <ReadOnlyActions />}
        </div>
      </div>
      )}

      {/* ---- Row 3: read-only OR error OR batch-edit ---- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 56,
        }}
      >
        {error
          ? errorRow.map((cell, i) => (
              <React.Fragment key={i}>
                {i > 0 && <VerticalSep />}
                <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                  <ErrorCell data={cell} />
                </div>
              </React.Fragment>
            ))
          : batchEdit
            ? readOnlyRow3.map((cell, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <VerticalSep />}
                  <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                    <EditableCell data={{ value: cell.value }} />
                  </div>
                </React.Fragment>
              ))
            : readOnlyRow3.map((cell, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <VerticalSep />}
                  <div style={{ flex: columnHeaders[i]?.width ? undefined : 1, width: columnHeaders[i]?.width, flexShrink: columnHeaders[i]?.width ? 0 : undefined, paddingLeft: 14, paddingRight: 14, display: "flex", alignItems: "center", minWidth: 0 }}>
                    <ReadOnlyCell data={cell} />
                  </div>
                </React.Fragment>
              ))}
        <VerticalSep />
        <div
          style={{
            width: actionColWidth,
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
            paddingLeft: 16,
            paddingRight: 16,
            alignItems: "center",
          }}
        >
          {error ? <EditActions disabled /> : batchEdit ? <BatchEditActions /> : <ReadOnlyActions />}
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
          title="Table (Values)"
          description="Toggle edit mode and error state to see different row behaviors."
          controls={[
            {
              name: "editType",
              options: ["By Row", "Always On"],
              default: "By Row",
            },
            {
              name: "Row Edit State",
              type: "boolean",
              disabledWhen: "editType",
              disabledWhenValue: "Always On",
            },
            {
              name: "error",
              type: "boolean",
            },
            {
              name: "bordered",
              type: "boolean",
              default: true,
            },
          ]}
          render={(values) => (
            <div style={{ width: "100%", padding: 16 }}>
              <FlowXValuesTable
                editMode={values.editType !== "Always On" && values["Row Edit State"] === true}
                batchEdit={values.editType === "Always On"}
                error={values.error === true}
                bordered={values.bordered !== false}
              />
            </div>
          )}
        />
      }
      renderGuidelinePreview={(props) => (
        <div style={{ width: 420, maxWidth: "100%" }}>
          <FlowXValuesTable
            bordered={props.bordered === "on"}
            batchEdit={props.batchEdit === "on"}
            editMode={props.editMode === "on"}
            error={props.error === "on"}
          />
        </div>
      )}
      guidelinePreviewWidth="sm:w-3/5"
      statesReference={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div style={{ overflowX: "auto" }}>
              <FlowXValuesTable />
            </div>
            <span className="text-xs text-muted-foreground">Read-only</span>
          </div>
          <div className="flex flex-col gap-3">
            <div style={{ overflowX: "auto" }}>
              <FlowXValuesTable editMode />
            </div>
            <span className="text-xs text-muted-foreground">Editing (single row)</span>
          </div>
          <div className="flex flex-col gap-3">
            <div style={{ overflowX: "auto" }}>
              <FlowXValuesTable batchEdit />
            </div>
            <span className="text-xs text-muted-foreground">Batch edit (all rows editable, page-level save)</span>
          </div>
          <div className="flex flex-col gap-3">
            <div style={{ overflowX: "auto" }}>
              <FlowXValuesTable error />
            </div>
            <span className="text-xs text-muted-foreground">Error</span>
          </div>
        </div>
      }
      sizes={<></>}
    />
  );
}
