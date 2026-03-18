"use client";

import { checkboxSpec } from "@/lib/components-data/checkbox";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  FlowXCheckbox — local preview component matching Figma design      */
/*  Vanilla HTML/CSS via inline styles — no shadcn, no Tailwind        */
/* ------------------------------------------------------------------ */

function FlowXCheckbox({
  selected = false,
  state = "default",
  border = true,
  inverted = false,
  size = "medium",
  label = "Label",
  value = "Value",
  hasDescription = false,
}: {
  selected?: boolean;
  state?: "default" | "error" | "disabled";
  border?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  label?: string;
  value?: string;
  hasDescription?: boolean;
}) {
  const isSmall = size === "small";
  const isDisabled = state === "disabled";
  const isError = state === "error";

  /* ---- Container background ---- */
  const getContainerBg = () => {
    if (!border) return "transparent";
    if (isDisabled) {
      if (inverted) return "#475263";
      return "#e3e8ed";
    }
    if (isError) {
      if (inverted) return selected ? "#610e00" : "transparent";
      return selected ? "#fde9e6" : "#ffffff";
    }
    // default
    if (inverted) return selected ? "#002d5b" : "transparent";
    return selected ? "#e6f0fb" : "#ffffff";
  };

  /* ---- Container border color ---- */
  const getContainerBorder = () => {
    if (isDisabled) {
      if (inverted) return selected ? "#8390a2" : "#5b6a7e";
      return selected ? "#64748b" : "rgba(15,17,20,0.1)";
    }
    if (isError) {
      if (inverted) return "#eb4e33";
      return "#e62200";
    }
    // default
    if (inverted) return selected ? "#3389e0" : "#64748b";
    return selected ? "#006bd8" : "#e3e8ed";
  };

  /* ---- Checkbox icon fill (selected) ---- */
  const getCheckboxFill = () => {
    if (!selected) return "transparent";
    if (isDisabled) return inverted ? "#a6b0be" : "#64748b";
    if (isError) {
      if (inverted) return border ? "#eb4e33" : "#e62200";
      return "#e62200";
    }
    return inverted ? "#3389e0" : "#006bd8";
  };

  /* ---- Checkbox icon stroke (unselected) ---- */
  /* The checkbox icon itself does NOT change color for error states —
     only the container border turns red. The icon uses the same neutral
     stroke as the default state (Figma: same CheckboxIcon variant). */
  const getCheckboxStroke = () => {
    if (selected) return "transparent";
    if (isDisabled) {
      if (inverted) return "#5b6a7e";
      return "rgba(15,17,20,0.1)";
    }
    // default & error use the same icon color
    if (inverted) return "#64748b";
    return "#cbd1db";
  };

  /* ---- Value text color ---- */
  const getValueColor = () => {
    if (isDisabled) {
      if (inverted) {
        return border ? "#8390a2" : "#64748b";
      }
      return "#64748b";
    }
    return inverted ? "#ffffff" : "#1d232c";
  };

  const containerBg = getContainerBg();
  const containerBorder = getContainerBorder();
  const checkboxFill = getCheckboxFill();
  const checkboxStroke = getCheckboxStroke();
  const valueColor = getValueColor();

  const iconSize = isSmall ? 16 : 24;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: 2,
        fontFamily: "var(--font-flowx)",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      {/* Label */}
      <FlowXLabel
        label={label}
        size={size}
        inverted={inverted}
        disabled={state === "disabled"}
      />

      {/* Input row: container + optional error icon */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Input Container */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isSmall ? (border ? 4 : 6) : (border ? 6 : 8),
            height: isSmall ? 28 : 36,
            paddingLeft: border ? (isSmall ? 6 : 8) : 0,
            paddingRight: border ? (isSmall ? 6 : 8) : 0,
            borderRadius: border ? 8 : 0,
            border: border ? `1px solid ${containerBorder}` : "none",
            backgroundColor: containerBg,
          }}
        >
          {/* Checkbox Icon */}
          {selected ? (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox={isSmall ? "0 0 16 16" : "0 0 24 24"}
              fill="none"
              style={{ flexShrink: 0 }}
            >
              {isSmall ? (
                <>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="15"
                    height="15"
                    rx="3.2"
                    fill={checkboxFill}
                  />
                  <path
                    d="M4.5 8L7 10.5L11.5 5.5"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="4.8"
                    fill={checkboxFill}
                  />
                  <path
                    d="M6.5 12L10 15.5L17.5 8"
                    stroke="white"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}
            </svg>
          ) : (
            <svg
              width={iconSize}
              height={iconSize}
              viewBox={isSmall ? "0 0 16 16" : "0 0 24 24"}
              fill="none"
              style={{ flexShrink: 0 }}
            >
              {isSmall ? (
                <rect
                  x="0.8"
                  y="0.8"
                  width="14.4"
                  height="14.4"
                  rx="3.2"
                  stroke={checkboxStroke}
                  strokeWidth="1"
                  fill="none"
                />
              ) : (
                <rect
                  x="1.2"
                  y="1.2"
                  width="21.6"
                  height="21.6"
                  rx="4.8"
                  stroke={checkboxStroke}
                  strokeWidth="1"
                  fill="none"
                />
              )}
            </svg>
          )}

          {/* Value text */}
          <span
            style={{
              fontSize: isSmall ? 12 : 14,
              lineHeight: isSmall ? "16px" : "24px",
              color: valueColor,
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </span>
        </div>

        {/* Error icon outside container */}
        {isError && <FlowXErrorIcon />}
      </div>

      {/* Description */}
      <FlowXDescription
        state={state}
        inverted={inverted}
        visible={hasDescription}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const checkboxTokens = [
  {
    name: "--color-primary (#006bd8)",
    value: "Checked checkbox fill & selected container border",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-blue-50 (#e6f0fb)",
    value: "Selected container background (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e6f0fb" }} />,
  },
  {
    name: "--color-blue-400 (#3389e0)",
    value: "Checked checkbox fill & border (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#3389e0" }} />,
  },
  {
    name: "--color-blue-900 (#002d5b)",
    value: "Selected container background (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#002d5b" }} />,
  },
  {
    name: "--color-destructive (#e62200)",
    value: "Error state checkbox fill, border & error icon",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e62200" }} />,
  },
  {
    name: "--color-error-bg (#fde9e6)",
    value: "Error selected container background (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#fde9e6" }} />,
  },
  {
    name: "--color-neutrals-100 (#e3e8ed)",
    value: "Default container border, disabled background",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e3e8ed" }} />,
  },
  {
    name: "--color-neutrals-500 (#64748b)",
    value: "Disabled checkbox fill, inverted default border",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#64748b" }} />,
  },
  {
    name: "--radius-lg (8px)",
    value: "Input container border radius",
    preview: <div style={{ width: 20, height: 20, borderRadius: 8, border: "2px solid #cbd1db" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function CheckboxPage() {
  const spec = checkboxSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={checkboxTokens}
      interactivePreview={
        <ComponentPreview
          title="Checkbox"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "selected",
              type: "boolean",
            },
            {
              name: "state",
              options: ["default", "error", "disabled"],
            },
            {
              name: "size",
              options: ["small", "medium"],
            },
            {
              name: "border",
              type: "boolean",
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "hasDescription",
              type: "boolean",
            },
          ]}
          render={(values) => (
            <FlowXCheckbox
              selected={values.selected === true}
              state={
                (values.state as "default" | "error" | "disabled") ||
                "default"
              }
              size={
                (values.size as "small" | "medium") || "medium"
              }
              border={values.border !== false}
              inverted={values.inverted === true}
              hasDescription={values.hasDescription === true}
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
                  <FlowXCheckbox
                    selected={v.props.selected === "on"}
                    state={
                      (v.props.state as
                        | "default"
                        | "error"
                        | "disabled") || "default"
                    }
                    border={v.props.border === "on"}
                    inverted={isInverted}
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
                <div className="flex gap-3">
                  <FlowXCheckbox
                    selected={false}
                    state={
                      s as "default" | "error" | "disabled"
                    }
                    value="Unchecked"
                  />
                  <FlowXCheckbox
                    selected={true}
                    state={
                      s as "default" | "error" | "disabled"
                    }
                    value="Checked"
                  />
                </div>
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
                <FlowXCheckbox
                  selected={true}
                  size={s as "small" | "medium"}
                  value={`Size ${s}`}
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
