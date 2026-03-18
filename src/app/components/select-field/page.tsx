"use client";

import { selectFieldSpec } from "@/lib/components-data/select-field";
import {
  getTextColor,
  getElementStyle,
  getElementTypography,
} from "@/lib/components-data/variant-style-helpers";

import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  FlowXSelectField — data-driven preview component                    */
/*  ALL colors and typography come from selectFieldSpec.variantStyles    */
/*  via helpers. Zero hardcoded hex values.                             */
/* ------------------------------------------------------------------ */

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function FlowXSelectField({
  state = "default",
  filled = false,
  fillMode = "chips",
  size = "medium",
  inverted = false,
  hasLabel = true,
  hasDescription = false,
  placeholder = "Placeholder",
}: {
  state?: "default" | "focused" | "error" | "disabled";
  filled?: boolean;
  fillMode?: "chips" | "text";
  size?: "small" | "medium";
  inverted?: boolean;
  hasLabel?: boolean;
  hasDescription?: boolean;
  placeholder?: string;
}) {
  const spec = selectFieldSpec;
  const variantProps = {
    State: capitalize(state),
    Size: capitalize(size),
    Inverted: inverted ? "On" : "Off",
  };

  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocused = state === "focused";

  // All visual data from the spec
  const containerStyle = getElementStyle(spec, variantProps, "InputContainer");
  const valueColor = getTextColor(spec, variantProps, "ValueText");
  const placeholderColor = getTextColor(spec, variantProps, "Placeholder");
  const chipStyle = getElementStyle(spec, variantProps, "Chip");
  const chipCountStyle = getElementStyle(spec, variantProps, "ChipCount");
  const caretStyle = getElementStyle(spec, variantProps, "CaretDown");

  const valueTypo = getElementTypography(spec, variantProps, "ValueText");
  const placeholderTypo = getElementTypography(spec, variantProps, "Placeholder");
  const chipTypo = getElementTypography(spec, variantProps, "Chip");

  const showChips = filled && fillMode === "chips";
  const showTextValue = filled && fillMode === "text";

  const focusRingColor = isFocused ? containerStyle?.stroke : undefined;

  const isSmall = size === "small";
  const chipRadius = chipStyle?.cornerRadius ?? (isSmall ? 6 : 8);
  const chipPadV = isSmall ? 0 : 2;
  const chipPadH = 6;
  const chipXSize = isSmall ? 12 : 16;

  const sampleChips = ["Opt 1", "Opt 2", "Opt 3"];

  return (
    <div
      className="inline-flex flex-col gap-0.5"
      style={{ minWidth: 200 }}
    >
      {/* Label */}
      <FlowXLabel
        label="Label"
        size={size === "small" ? "small" : "medium"}
        inverted={inverted}
        disabled={state === "disabled"}
        hasLabel={hasLabel}
      />

      {/* Input Container */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          height: showChips ? "auto" : containerStyle?.height,
          minHeight: containerStyle?.height,
          paddingLeft: 6,
          paddingRight: 12,
          paddingTop: isSmall ? 4 : 2,
          paddingBottom: isSmall ? 4 : 2,
          borderRadius: 8,
          border: `${containerStyle?.strokeWidth ?? 1}px solid ${containerStyle?.stroke}`,
          backgroundColor: containerStyle?.fill,
          cursor: isDisabled ? "not-allowed" : "pointer",
          outline: focusRingColor ? `2px solid ${focusRingColor}` : undefined,
          outlineOffset: isFocused ? 1 : undefined,
          width: "100%",
        }}
      >
        {/* Placeholder, Text Value, or Chips */}
        {showChips ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: isSmall ? 2 : 4,
              flex: 1,
            }}
          >
            {sampleChips.map((chip) => (
              <span
                key={chip}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  paddingLeft: chipPadH,
                  paddingRight: chipPadH,
                  paddingTop: chipPadV,
                  paddingBottom: chipPadV,
                  borderRadius: chipRadius,
                  backgroundColor: chipStyle?.fill,
                  fontSize: chipTypo?.fontSize,
                  lineHeight: chipTypo?.lineHeight ? `${chipTypo.lineHeight}px` : undefined,
                  color: chipStyle?.textColor,
                }}
              >
                {chip}
                <svg
                  width={chipXSize}
                  height={chipXSize}
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ flexShrink: 0, opacity: 0.7 }}
                >
                  <path d="M4 4L12 12M12 4L4 12" stroke={inverted ? (chipStyle?.textColor ?? "#000") : "#64748B"} strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </span>
            ))}
            <span
              style={{
                fontSize: chipTypo?.fontSize,
                lineHeight: chipTypo?.lineHeight ? `${chipTypo.lineHeight}px` : undefined,
                color: chipCountStyle?.textColor,
                paddingLeft: 2,
                paddingRight: 2,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              + 20
            </span>
          </div>
        ) : (
          <span
            style={{
              fontSize: showTextValue ? valueTypo?.fontSize : placeholderTypo?.fontSize,
              lineHeight: showTextValue
                ? (valueTypo?.lineHeight ? `${valueTypo.lineHeight}px` : undefined)
                : (placeholderTypo?.lineHeight ? `${placeholderTypo.lineHeight}px` : undefined),
              color: showTextValue ? valueColor : placeholderColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {showTextValue ? "Selected Option" : placeholder}
          </span>
        )}

        {/* Error Icon */}
        {isError && <FlowXErrorIcon />}

        {/* CaretDown */}
        <svg
          width={caretStyle?.width ?? 24}
          height={caretStyle?.height ?? 24}
          viewBox="0 0 24 24"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <path
            d="M7 10L12 15L17 10"
            stroke={placeholderColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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

const selectFieldTokens = [
  {
    name: "--color-primary",
    value: "Focus ring color",
    preview: <div className="size-5 rounded bg-primary" />,
  },
  {
    name: "--color-destructive",
    value: "Error state border & text",
    preview: <div className="size-5 rounded bg-destructive" />,
  },
  {
    name: "--color-input",
    value: "Default border color",
    preview: <div className="size-5 rounded border-2 border-input" />,
  },
  {
    name: "--color-background",
    value: "Input background (default)",
    preview: <div className="size-5 rounded border-2 bg-background" />,
  },
  {
    name: "--color-muted",
    value: "Chip background (light theme)",
    preview: <div className="size-5 rounded bg-muted" />,
  },
  {
    name: "--radius-lg",
    value: "0.5rem (input container)",
    preview: (
      <div className="size-5 rounded-lg border-2 border-foreground/30" />
    ),
  },
  {
    name: "--color-muted-foreground",
    value: "Placeholder & caret icon",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SelectFieldPage() {
  const spec = selectFieldSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={selectFieldTokens}
      interactivePreview={
        <ComponentPreview
          title="Select Field"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "state",
              options: ["default", "focused", "error", "disabled"],
            },
            {
              name: "size",
              options: ["small", "medium"],
              default: "medium",
            },
            {
              name: "filled",
              type: "boolean",
            },
            {
              name: "fillMode",
              options: ["chips", "text"],
              default: "chips",
              disabledUnless: "filled",
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "hasLabel",
              type: "boolean",
              default: true,
            },
            {
              name: "hasDescription",
              type: "boolean",
            },
          ]}
          render={(values) => (
            <div
              className={`inline-flex items-center justify-center rounded-lg p-6 ${
                values.inverted ? "bg-neutral-900" : ""
              }`}
            >
              <FlowXSelectField
                state={
                  (values.state as "default" | "focused" | "error" | "disabled") ||
                  "default"
                }
                size={
                  (values.size as "small" | "medium") || "medium"
                }
                filled={values.filled === true}
                fillMode={(values.fillMode as "chips" | "text") || "chips"}
                inverted={values.inverted === true}
                hasLabel={values.hasLabel !== false}
                hasDescription={values.hasDescription === true}
              />
            </div>
          )}
        />
      }
      useCases={
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
                <FlowXSelectField
                  state={
                    (v.props.state as
                      | "default"
                      | "focused"
                      | "error"
                      | "disabled") || "default"
                  }
                  filled={v.props.filled === "on"}
                  inverted={isInverted}
                  hasDescription={v.props.state === "error"}
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
      }
      statesReference={
        <div className="flex flex-wrap items-start gap-6">
          {spec.states?.map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className="flex gap-3">
                <FlowXSelectField
                  state={
                    s as "default" | "focused" | "error" | "disabled"
                  }
                  placeholder="Empty"
                />
                <FlowXSelectField
                  state={
                    s as "default" | "focused" | "error" | "disabled"
                  }
                  filled
                  fillMode="text"
                />
                <FlowXSelectField
                  state={
                    s as "default" | "focused" | "error" | "disabled"
                  }
                  filled
                  fillMode="chips"
                />
              </div>
              <span className="text-xs text-muted-foreground capitalize">
                {s}
              </span>
            </div>
          ))}
        </div>
      }
      sizes={
        <div className="flex flex-wrap items-end gap-6">
          {spec.sizes?.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <FlowXSelectField
                size={s as "small" | "medium"}
                filled
              />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      }
    />
  );
}
