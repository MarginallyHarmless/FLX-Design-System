"use client";

import { treeSpec } from "@/lib/components-data/tree";
import { selectFieldSpec } from "@/lib/components-data/select-field";
import { getTextColor, getElementStyle, getElementTypography } from "@/lib/components-data/variant-style-helpers";
import { CaretDown } from "@phosphor-icons/react";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXLabel } from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  Sample data for the tree preview                                   */
/* ------------------------------------------------------------------ */

const FLAT_ITEMS = [
  "Hillsborough",
  "Cedar Springs",
  "Lakeside",
  "Maplewood",
  "Riverside",
  "Sunnyvale",
];

const NESTED_ITEMS = [
  { label: "Cities", isParent: true },
  { label: "Cedar Springs", isChild: true },
  { label: "Lakeside", isChild: true },
  { label: "Cities", isParent: true },
  { label: "Riverside", isChild: true },
  { label: "Sunnyvale", isChild: true },
];

/* ------------------------------------------------------------------ */
/*  CheckboxIcon SVG                                                   */
/* ------------------------------------------------------------------ */

function CheckboxIcon({
  selected,
  size,
  inverted,
  disabled,
}: {
  selected: boolean;
  size: number;
  inverted: boolean;
  disabled: boolean;
}) {
  const fill = selected
    ? disabled
      ? inverted ? "#a6b0be" : "#64748b"
      : inverted ? "#3389e0" : "#006bd8"
    : "transparent";
  const stroke = !selected
    ? disabled
      ? inverted ? "#5b6a7e" : "rgba(15,17,20,0.1)"
      : inverted ? "#64748b" : "#cbd1db"
    : "transparent";

  if (size <= 16) {
    return (
      <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        {selected ? (
          <>
            <rect x="0.5" y="0.5" width="15" height="15" rx="3.2" fill={fill} />
            <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <rect x="0.8" y="0.8" width="14.4" height="14.4" rx="3.2" stroke={stroke} strokeWidth="1" fill="none" />
        )}
      </svg>
    );
  }
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      {selected ? (
        <>
          <rect x="0.5" y="0.5" width="19" height="19" rx="4" fill={fill} />
          <path d="M5.5 10L8.5 13L14.5 7" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <rect x="1" y="1" width="18" height="18" rx="4" stroke={stroke} strokeWidth="1" fill="none" />
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  RadioIcon SVG                                                      */
/* ------------------------------------------------------------------ */

function RadioIcon({
  selected,
  size,
  inverted,
  disabled,
}: {
  selected: boolean;
  size: number;
  inverted: boolean;
  disabled: boolean;
}) {
  const outerStroke = selected
    ? disabled
      ? inverted ? "#a6b0be" : "#64748b"
      : inverted ? "#3389e0" : "#006bd8"
    : disabled
      ? inverted ? "#5b6a7e" : "rgba(15,17,20,0.1)"
      : inverted ? "#64748b" : "#cbd1db";

  const innerFill = selected ? outerStroke : "transparent";
  const r = size <= 16 ? 7 : 9;
  const c = size <= 16 ? 8 : 10;
  const ir = size <= 16 ? 3 : 4;
  const viewBox = size <= 16 ? "0 0 16 16" : "0 0 20 20";

  return (
    <svg width={size <= 16 ? 16 : 20} height={size <= 16 ? 16 : 20} viewBox={viewBox} fill="none" style={{ flexShrink: 0 }}>
      <circle cx={c} cy={c} r={r} stroke={outerStroke} strokeWidth="1" fill="none" />
      {selected && <circle cx={c} cy={c} r={ir} fill={innerFill} />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  CaretDown Icon (used on group parent rows)                         */
/* ------------------------------------------------------------------ */

function CaretDownIcon({ inverted }: { inverted: boolean }) {
  const color = inverted ? "#a6b0be" : "#64748b";
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 6L8 11L13 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  MagnifyingGlass Icon                                               */
/* ------------------------------------------------------------------ */

function SearchIcon({ inverted }: { inverted: boolean }) {
  const color = inverted ? "#a6b0be" : "#64748b";
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="5.5" stroke={color} strokeWidth="1.2" />
      <path d="M13 13L16.5 16.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  FlowXDropdownRow                                                   */
/* ------------------------------------------------------------------ */

function FlowXDropdownRow({
  label,
  type,
  size,
  inverted,
  isParent = false,
  isChild = false,
  selected = false,
  hovered = false,
  disabled = false,
}: {
  label: string;
  type: "Select (Multi)" | "Select (Single)" | "Icons";
  size: "Medium" | "Small";
  inverted: boolean;
  isParent?: boolean;
  isChild?: boolean;
  selected?: boolean;
  hovered?: boolean;
  disabled?: boolean;
}) {
  const isSmall = size === "Small";
  const iconSize = isSmall ? 16 : 20;
  const fontSize = isSmall ? 12 : 14;
  const lineHeight = isSmall ? "16px" : "24px";
  const rowHeight = isSmall ? 24 : 32;

  const getBg = () => {
    if (selected) return inverted ? "#003b77" : "#e6f0fb";
    if (hovered) return inverted ? "#2a313a" : "#f7f8f9";
    return "transparent";
  };

  const getTextColor = () => {
    if (disabled) return inverted ? "#8390a2" : "#a6b0be";
    if (selected) return inverted ? "#b0d1f3" : "#006bd8";
    return inverted ? "#ffffff" : "#000000";
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: 4,
        paddingLeft: isChild ? (isSmall ? 48 : 56) : 4,
        height: rowHeight,
        borderRadius: 4,
        backgroundColor: getBg(),
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "var(--font-flowx)",
      }}
    >
      {type === "Select (Multi)" && (
        <CheckboxIcon
          selected={selected}
          size={iconSize}
          inverted={inverted}
          disabled={disabled}
        />
      )}
      {isParent && <CaretDownIcon inverted={inverted} />}
      <span
        style={{
          flex: 1,
          fontSize,
          lineHeight,
          fontWeight: isParent ? 600 : 400,
          color: getTextColor(),
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FlowXSelectTrigger — closed select field shown above tree          */
/* ------------------------------------------------------------------ */

function FlowXSelectTrigger({
  size = "Medium",
  inverted = false,
}: {
  size?: "Medium" | "Small";
  inverted?: boolean;
}) {
  const spec = selectFieldSpec;
  const sizeKey = size === "Small" ? "Small" : "Medium";
  const variantProps = {
    State: "Focused",
    Size: sizeKey,
    Inverted: inverted ? "On" : "Off",
  };

  const containerStyle = getElementStyle(spec, variantProps, "InputContainer");
  const placeholderColor = getTextColor(spec, variantProps, "Placeholder");
  const placeholderTypo = getElementTypography(spec, variantProps, "Placeholder");
  const caretStyle = getElementStyle(spec, variantProps, "CaretDown");
  const isSmall = size === "Small";
  const width = isSmall ? 200 : 244;

  return (
    <div style={{ width, fontFamily: "var(--font-flowx)" }}>
      <FlowXLabel
        label="Label"
        size={isSmall ? "small" : "medium"}
        inverted={inverted}
        disabled={false}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          height: containerStyle?.height,
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 8,
          border: `${containerStyle?.strokeWidth ?? 1}px solid ${containerStyle?.stroke}`,
          backgroundColor: containerStyle?.fill,
          cursor: "pointer",
          outline: `2px solid ${containerStyle?.stroke}`,
          outlineOffset: 1,
        }}
      >
        <span
          style={{
            flex: 1,
            fontSize: placeholderTypo?.fontSize,
            lineHeight: placeholderTypo?.lineHeight ? `${placeholderTypo.lineHeight}px` : undefined,
            color: placeholderColor,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Placeholder
        </span>
        <CaretDown size={caretStyle?.width ?? (isSmall ? 16 : 24)} color={placeholderColor} style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FlowXTree — main preview component                                 */
/* ------------------------------------------------------------------ */

function FlowXTree({
  type = "Select (Multi)",
  size = "Medium",
  inverted = false,
  nesting = false,
  showHeader = true,
}: {
  type?: "Select (Multi)" | "Select (Single)" | "Icons";
  size?: "Medium" | "Small";
  inverted?: boolean;
  nesting?: boolean;
  showHeader?: boolean;
}) {
  const isSmall = size === "Small";
  const fontSize = isSmall ? 12 : 14;
  const lineHeight = isSmall ? "16px" : "24px";
  const iconSize = isSmall ? 16 : 20;
  const width = isSmall ? 200 : 244;

  const items = nesting ? NESTED_ITEMS : FLAT_ITEMS.map((label) => ({ label, isParent: false, isChild: false }));

  // Pre-select a couple items for visual demo
  const selectedIndices = type === "Select (Single)" ? [4] : [1, 4];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "var(--font-flowx)" }}>
      <FlowXSelectTrigger size={size} inverted={inverted} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width,
          padding: showHeader ? "0 8px" : "8px 8px 0 8px",
          fontFamily: "var(--font-flowx)",
          backgroundColor: inverted ? "#475263" : "#ffffff",
          borderRadius: 8,
          boxShadow: "0 8px 16px #1634621a",
          overflow: "hidden",
        }}
      >
      {/* Header Row */}
      {showHeader && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 0",
          }}
        >
          {type === "Select (Multi)" && (
            <CheckboxIcon
              selected={false}
              size={iconSize}
              inverted={inverted}
              disabled={false}
            />
          )}
          {/* Search input */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: isSmall ? 28 : 36,
              padding: "0 12px",
              borderRadius: 8,
              border: `1px solid ${inverted ? "#64748b" : "#e3e8ed"}`,
              backgroundColor: inverted ? "transparent" : "#ffffff",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize,
                lineHeight,
                color: inverted ? "#a6b0be" : "#64748b",
              }}
            >
              Search...
            </span>
            <SearchIcon inverted={inverted} />
          </div>
        </div>
      )}

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingBottom: 8 }}>
        {items.map((item, i) => {
          const itemObj = typeof item === "string" ? { label: item, isParent: false, isChild: false } : item;
          const isSelected = !itemObj.isParent && selectedIndices.includes(i);
          const isHovered = i === 0 && !itemObj.isParent;
          return (
            <FlowXDropdownRow
              key={`${itemObj.label}-${i}`}
              label={itemObj.label}
              type={type}
              size={size}
              inverted={inverted}
              isParent={itemObj.isParent}
              isChild={itemObj.isChild}
              selected={isSelected}
              hovered={isHovered && !isSelected}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */

const treeTokens = [
  {
    name: "--color-blue-50 (#e6f0fb)",
    value: "Selected row background (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e6f0fb" }} />,
  },
  {
    name: "--color-neutrals-50 (#f7f8f9)",
    value: "Hover row background (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f7f8f9" }} />,
  },
  {
    name: "--color-primary (#006bd8)",
    value: "Checked checkbox/radio fill",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-blue-400 (#3389e0)",
    value: "Checked checkbox/radio fill (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#3389e0" }} />,
  },
  {
    name: "--color-blue-500 (#006bd8)",
    value: "Selected row text color (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-grays-900 (#000000)",
    value: "Default row text color (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#000000" }} />,
  },
  {
    name: "--color-neutrals-100 (#e3e8ed)",
    value: "Container border, search input border",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e3e8ed" }} />,
  },
  {
    name: "--radius-4 (4px)",
    value: "Row border radius",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid #cbd1db" }} />,
  },
  {
    name: "--radius-8 (8px)",
    value: "Container and search input border radius",
    preview: <div style={{ width: 20, height: 20, borderRadius: 8, border: "2px solid #cbd1db" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TreePage() {
  const spec = treeSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={treeTokens}
      interactivePreview={
        <ComponentPreview
          title="Tree"
          description="Explore different selection modes, sizes, and options."
          controls={[
            {
              name: "type",
              options: ["Select (Multi)", "Select (Single)", "Icons"],
            },
            {
              name: "size",
              options: ["Medium", "Small"],
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "nesting",
              type: "boolean",
            },
            {
              name: "showHeader",
              type: "boolean",
              default: true,
            },
          ]}
          render={(values) => (
            <FlowXTree
              type={
                (values.type as "Select (Multi)" | "Select (Single)" | "Icons") ||
                "Select (Multi)"
              }
              size={(values.size as "Medium" | "Small") || "Medium"}
              inverted={values.inverted === true}
              nesting={values.nesting === true}
              showHeader={values.showHeader !== false}
            />
          )}
        />
      }
      useCases={
        spec.variants && spec.variants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spec.variants.map((v) => {
              const isInverted = v.props.inverted === "on";
              return (
                <div
                  key={v.name}
                  className={`flex flex-col items-center gap-3 rounded-lg p-6 ${
                    isInverted
                      ? "bg-neutral-900 text-white"
                      : ""
                  }`}
                  style={!isInverted ? { backgroundColor: "#f7f8f9" } : undefined}
                >
                  <FlowXTree
                    type={v.props.type as "Select (Multi)" | "Select (Single)" | "Icons"}
                    size={v.props.size as "Medium" | "Small"}
                    inverted={isInverted}
                    nesting={v.props.nesting === "on"}
                    showHeader={false}
                  />
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isInverted ? "text-neutral-200" : ""}`}>
                      {v.name}
                    </p>
                    <p className={`mt-0.5 text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
                      {v.useCase}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : undefined
      }
      statesReference={
        spec.states && spec.states.length > 0 ? (
          <div className="flex flex-wrap items-start gap-6">
            {spec.states.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <FlowXDropdownRow
                  label="Maplewood"
                  type="Select (Multi)"
                  size="Medium"
                  inverted={false}
                  selected={s === "selected"}
                  hovered={s === "hover"}
                  disabled={s === "disabled"}
                />
                <span className="text-xs text-muted-foreground capitalize">
                  {s}
                </span>
              </div>
            ))}
          </div>
        ) : undefined
      }
      sizes={
        spec.sizes && spec.sizes.length > 0 ? (
          <div className="flex flex-wrap items-end gap-6">
            {spec.sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <FlowXTree
                  type="Select (Multi)"
                  size={s as "Medium" | "Small"}
                  inverted={false}
                  nesting={false}
                  showHeader={false}
                />
                <span className="text-xs text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        ) : undefined
      }
    />
  );
}
