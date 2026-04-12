"use client";

import { radioV3Spec } from "@/lib/components-data/radio-v3";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  FlowXRadio — local preview component matching Figma design         */
/*  Vanilla HTML/CSS via inline styles — no shadcn, no Tailwind        */
/* ------------------------------------------------------------------ */

function FlowXRadio({
  selected = false,
  state = "default",
  border: borderProp = true,
  inverted = false,
  size = "medium",
  label = "Label",
  value = "Value",
  hasDescription = false,
  subtitle = "",
}: {
  selected?: boolean;
  state?: "default" | "error" | "disabled";
  border?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  label?: string;
  value?: string;
  hasDescription?: boolean;
  subtitle?: string;
}) {
  const isSmall = size === "small";
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const hasSubtitle = !!subtitle;
  const border = hasSubtitle || borderProp;

  /* ---- Container background ---- */
  const getContainerBg = () => {
    if (!border) return "transparent";
    if (isDisabled) {
      if (inverted) return "#475263";
      return selected ? "#e3e8ed" : "#e3e8ed";
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
      if (inverted) return "#5b6a7e";
      return selected ? "#64748b" : "#e3e8ed";
    }
    if (isError) {
      if (inverted) return "#eb4e33";
      return selected ? "#e62200" : "#eb4e33";
    }
    // default
    if (inverted) return selected ? "#3389e0" : "#64748b";
    return selected ? "#006bd8" : "#e3e8ed";
  };

  /* ---- Radio icon fill (selected) ---- */
  const getRadioFill = () => {
    if (!selected) return "transparent";
    if (isDisabled) return inverted ? "#a6b0be" : "#64748b";
    if (isError) return "#e62200";
    return inverted ? "#3389e0" : "#006bd8";
  };

  /* ---- Radio icon stroke (unselected) ---- */
  const getRadioStroke = () => {
    if (selected) return "transparent";
    if (isDisabled) return "#64748b";
    return "#cbd1db";
  };

  /* ---- Value text color ---- */
  const getValueColor = () => {
    if (isDisabled) return inverted ? "#8390a2" : "#64748b";
    return inverted ? "#ffffff" : "#1d232c";
  };

  /* ---- Subtitle text color ---- */
  const getSubtitleColor = () => {
    if (isDisabled) return inverted ? "#a6b0be" : "#64748b";
    return inverted ? "#cbd1db" : "#64748b";
  };

  const containerBg = getContainerBg();
  const containerBorder = getContainerBorder();
  const radioFill = getRadioFill();
  const radioStroke = getRadioStroke();
  const valueColor = getValueColor();
  const subtitleColor = getSubtitleColor();

  const radioSize = isSmall ? 16 : 24;
  const innerDotSize = isSmall ? 6 : 10;

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
            alignItems: hasSubtitle ? "flex-start" : "center",
            gap: 8,
            ...(hasSubtitle
              ? { paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12 }
              : { height: isSmall ? 28 : 36, paddingLeft: border ? 8 : 0, paddingRight: border ? 12 : 0 }),
            borderRadius: border ? 8 : 0,
            border: border ? `1px solid ${containerBorder}` : "none",
            backgroundColor: containerBg,
          }}
        >
          {/* Radio Icon */}
          {selected ? (
            <svg
              width={radioSize}
              height={radioSize}
              viewBox="0 0 20 20"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM15.8535 6.14648C15.6583 5.95122 15.3417 5.95122 15.1465 6.14648L8.5 12.793L5.35352 9.64648C5.15825 9.45122 4.84175 9.45122 4.64648 9.64648C4.45122 9.84175 4.45122 10.1583 4.64648 10.3535L8.14648 13.8535C8.34175 14.0488 8.65825 14.0488 8.85352 13.8535L15.8535 6.85352C16.0488 6.65825 16.0488 6.34175 15.8535 6.14648Z"
                fill={radioFill}
              />
            </svg>
          ) : (
            <div
              style={{
                width: radioSize,
                height: radioSize,
                borderRadius: "50%",
                border: `1.5px solid ${radioStroke}`,
                backgroundColor: "transparent",
                flexShrink: 0,
                boxSizing: "border-box",
              }}
            />
          )}

          {/* Value text + optional subtitle */}
          {hasSubtitle ? (
            <div style={{ display: "flex", flexDirection: "column", gap: isSmall ? 2 : 0 }}>
              <span
                style={{
                  fontSize: isSmall ? 12 : 14,
                  lineHeight: isSmall ? "16px" : "24px",
                  fontWeight: 600,
                  color: valueColor,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: isSmall ? 10 : 12,
                  lineHeight: isSmall ? "12px" : "16px",
                  fontWeight: 400,
                  color: subtitleColor,
                }}
              >
                {subtitle}
              </span>
            </div>
          ) : (
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
          )}
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

const radioTokens = [
  {
    name: "--color-primary (#006bd8)",
    value: "Selected radio fill & selected container border",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-blue-50 (#e6f0fb)",
    value: "Selected container background (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e6f0fb" }} />,
  },
  {
    name: "--color-destructive (#e62200)",
    value: "Error state radio fill, border & error icon",
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
    name: "--color-neutrals-300 (#cbd1db)",
    value: "Unselected radio circle stroke",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#cbd1db" }} />,
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

export default function RadioV3Page() {
  const spec = radioV3Spec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={radioTokens}
      interactivePreview={
        <ComponentPreview
          title="Radio"
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
              options: ["medium", "small"],
            },
            {
              name: "border",
              type: "boolean",
              forcedOnWhen: "subtitle",
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "hasDescription",
              type: "boolean",
            },
            {
              name: "subtitle",
              type: "boolean",
            },
          ]}
          render={(values) => (
            <FlowXRadio
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
              subtitle={values.subtitle ? "This is a description text for the radio group item." : ""}
            />
          )}
        />
      }
      renderGuidelinePreview={(props) => (
        <FlowXRadio
          selected={props.selected === "on"}
          state={(props.state as "default" | "error" | "disabled") || "default"}
          border={props.border === "on"}
          inverted={props.inverted === "on"}
        />
      )}
      statesReference={
        spec.states && spec.states.length > 0 ? (
          <div className="flex flex-wrap items-start gap-6">
            {spec.states.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <div className="flex gap-3">
                  <FlowXRadio
                    selected={false}
                    state={
                      s as "default" | "error" | "disabled"
                    }
                    value="Unchecked"
                  />
                  <FlowXRadio
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
                <FlowXRadio
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
