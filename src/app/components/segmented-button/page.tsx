"use client";

import { useState } from "react";
import { segmentedButtonSpec } from "@/lib/components-data/segmented-button";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";

/* ------------------------------------------------------------------ */
/*  FlowXSegmentedButton — local preview component matching Figma      */
/*  Vanilla HTML/CSS via inline styles — no shadcn, no Tailwind        */
/* ------------------------------------------------------------------ */

function FlowXSegmentedButton({
  disabled = false,
  inverted = false,
  size = "medium",
  options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  selectedIndex = 0,
  label = "Label",
  onSelect,
}: {
  disabled?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  options?: string[];
  selectedIndex?: number;
  label?: string;
  onSelect?: (index: number) => void;
}) {
  const isSmall = size === "small";

  /* ---- Container dimensions ---- */
  const containerHeight = isSmall ? 28 : 36;
  const containerPadding = 4;
  const containerItemSpacing = isSmall ? 2 : 4;
  const segmentHeight = isSmall ? 20 : 28;
  const segmentWidth = isSmall ? 65 : 73;

  /* ---- Container fill ---- */
  const containerFill = inverted ? "rgba(255,255,255,0.1)" : "#e3e8ed";

  /* ---- Selected segment fill ---- */
  const getSelectedFill = () => {
    if (disabled) return inverted ? "#64748b" : "#8390a2";
    return inverted ? "#3389e0" : "#006bd8";
  };

  /* ---- Text colors ---- */
  const selectedTextColor = "#ffffff";
  const unselectedTextColor = inverted ? "#a6b0be" : "#475263";
  const labelColor = inverted ? "#ffffff" : "#1d232c";

  /* ---- Typography ---- */
  const fontSize = isSmall ? 12 : 14;
  const labelFontSize = isSmall ? 12 : 14;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
        fontFamily: "var(--font-flowx)",
        cursor: disabled ? "not-allowed" : "default",
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: labelFontSize,
          lineHeight: isSmall ? "16px" : "22px",
          fontWeight: 600,
          color: labelColor,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Container */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: containerHeight,
          padding: containerPadding,
          gap: containerItemSpacing,
          borderRadius: 8,
          backgroundColor: containerFill,
          boxSizing: "border-box",
        }}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex;
          return (
            <button
              key={index}
              disabled={disabled}
              onClick={() => {
                if (!disabled && onSelect) {
                  onSelect(index);
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: segmentWidth,
                height: segmentHeight,
                borderRadius: 6,
                backgroundColor: isSelected ? getSelectedFill() : "transparent",
                color: isSelected ? selectedTextColor : unselectedTextColor,
                fontSize,
                fontWeight: 400,
                fontFamily: "var(--font-flowx)",
                lineHeight: isSmall ? "16px" : "22px",
                border: "none",
                padding: 0,
                cursor: disabled ? "not-allowed" : "pointer",
                whiteSpace: "nowrap",
                outline: "none",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive wrapper for preview — manages selectedIndex state      */
/* ------------------------------------------------------------------ */

function InteractiveSegmentedButton(props: {
  disabled?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  options?: string[];
  label?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <FlowXSegmentedButton
      {...props}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const segmentedButtonTokens = [
  {
    name: "--color-blue-500 (#006bd8)",
    value: "Selected segment fill (default, light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-blue-400 (#3389e0)",
    value: "Selected segment fill (default, inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#3389e0" }} />,
  },
  {
    name: "--color-neutrals-400 (#8390a2)",
    value: "Selected segment fill (disabled, light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#8390a2" }} />,
  },
  {
    name: "--color-neutrals-500 (#64748b)",
    value: "Selected segment fill (disabled, inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#64748b" }} />,
  },
  {
    name: "--color-neutrals-100 (#e3e8ed)",
    value: "Container track fill (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e3e8ed" }} />,
  },
  {
    name: "--color-neutrals-700 (#475263)",
    value: "Unselected segment text (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#475263" }} />,
  },
  {
    name: "--color-neutrals-300 (#a6b0be)",
    value: "Unselected segment text (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#a6b0be" }} />,
  },
  {
    name: "--color-neutrals-900 (#1d232c)",
    value: "Label text color (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#1d232c" }} />,
  },
  {
    name: "--color-white (#ffffff)",
    value: "Selected segment text (all) / Label text (inverted) / Container fill (inverted, 10% opacity)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#ffffff", border: "1px solid #e3e8ed" }} />,
  },
  {
    name: "--radius-lg (8px)",
    value: "Container track border radius",
    preview: <div style={{ width: 30, height: 16, borderRadius: 8, border: "2px solid #cbd1db" }} />,
  },
  {
    name: "--radius-md (6px)",
    value: "Individual segment border radius",
    preview: <div style={{ width: 30, height: 16, borderRadius: 6, border: "2px solid #cbd1db" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SegmentedButtonPage() {
  const spec = segmentedButtonSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={segmentedButtonTokens}
      interactivePreview={
        <ComponentPreview
          title="Segmented Button"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "disabled",
              type: "boolean",
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "size",
              options: ["small", "medium"],
            },
          ]}
          render={(values) => (
            <InteractiveSegmentedButton
              disabled={values.disabled === true}
              inverted={values.inverted === true}
              size={
                (values.size as "small" | "medium") || "medium"
              }
            />
          )}
        />
      }
      useCases={
        spec.variants && spec.variants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
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
                  <FlowXSegmentedButton
                    disabled={v.props.disabled === "on"}
                    inverted={isInverted}
                    size={(v.props.size as "small" | "medium") || "medium"}
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
                <FlowXSegmentedButton
                  disabled={s === "disabled"}
                  options={["Tab 1", "Tab 2", "Tab 3"]}
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
                <FlowXSegmentedButton
                  size={s as "small" | "medium"}
                  options={["Tab 1", "Tab 2", "Tab 3"]}
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
