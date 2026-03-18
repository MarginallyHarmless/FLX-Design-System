"use client";

import { inputFieldSpec } from "@/lib/components-data/input-field";
import {
  getTextColor,
  getElementStyle,
  getElementTypography,
} from "@/lib/components-data/variant-style-helpers";

import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { FlowXLabel, FlowXDescription, FlowXErrorIcon } from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  FlowXInputField — data-driven preview component                    */
/*  ALL colors and typography come from inputFieldSpec.variantStyles    */
/*  via helpers. Zero hardcoded hex values.                             */
/* ------------------------------------------------------------------ */

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function FlowXInputField({
  state = "default",
  filled = false,
  size = "medium",
  inverted = false,
  hasTopLabel = true,
  hasIconStart = false,
  hasIconEnd = false,
  hasPrefix = false,
  hasSuffix = false,
  hasDescription = false,
  placeholder = "Placeholder",
  value = "",
}: {
  state?: "default" | "focused" | "error" | "disabled" | "hover";
  filled?: boolean;
  size?: "small" | "medium";
  inverted?: boolean;
  hasTopLabel?: boolean;
  hasIconStart?: boolean;
  hasIconEnd?: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  hasDescription?: boolean;
  placeholder?: string;
  value?: string;
}) {
  const spec = inputFieldSpec;
  const variantProps = {
    State: capitalize(state),
    Size: capitalize(size),
    Inverted: inverted ? "On" : "Off",
  };

  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isFocused = state === "focused";

  // All visual data from the spec — no hardcoded values
  const containerStyle = getElementStyle(spec, variantProps, "InputContainer");
  const valueColor = getTextColor(spec, variantProps, "ValueText");
  const placeholderColor = getTextColor(spec, variantProps, "Placeholder");
  const prefixSuffixColor = getTextColor(spec, variantProps, "PrefixSuffix");

  const inputTypo = getElementTypography(spec, variantProps, "ValueText");
  const prefixTypo = getElementTypography(spec, variantProps, "PrefixSuffix");

  const iconStartStyle = getElementStyle(spec, variantProps, "IconStart");
  const iconEndStyle = getElementStyle(spec, variantProps, "IconEnd");

  const hasValue = value.length > 0;

  // Focus ring color comes from the Focused variant's container stroke
  const focusRingColor = isFocused ? containerStyle?.stroke : undefined;

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
        hasLabel={hasTopLabel}
      />

      {/* Input Container + optional error icon */}
      <div className="inline-flex items-center gap-1.5">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            height: containerStyle?.height,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8,
            border: `${containerStyle?.strokeWidth ?? 1}px solid ${containerStyle?.stroke}`,
            backgroundColor: containerStyle?.fill,
            cursor: isDisabled ? "not-allowed" : "text",
            outline: focusRingColor
              ? `2px solid ${focusRingColor}`
              : undefined,
            outlineOffset: isFocused ? 1 : undefined,
            width: "100%",
          }}
        >
          {/* Icon Start */}
          {hasIconStart && (
            <svg
              width={iconStartStyle?.width ?? 16}
              height={iconStartStyle?.height ?? 16}
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <circle cx="7" cy="7" r="5.5" stroke={prefixSuffixColor} strokeWidth="1.2" />
              <path d="M11 11L14 14" stroke={prefixSuffixColor} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}

          {/* Prefix */}
          {hasPrefix && (
            <span
              style={{
                fontSize: prefixTypo?.fontSize,
                color: prefixSuffixColor,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              $
            </span>
          )}

          {/* Input text / Placeholder */}
          <span
            style={{
              fontSize: inputTypo?.fontSize,
              lineHeight: inputTypo?.lineHeight ? `${inputTypo.lineHeight}px` : undefined,
              color: hasValue ? valueColor : placeholderColor,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
            }}
          >
            {hasValue ? value : placeholder}
          </span>

          {/* Suffix */}
          {hasSuffix && (
            <span
              style={{
                fontSize: prefixTypo?.fontSize,
                color: prefixSuffixColor,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              kg
            </span>
          )}

          {/* Icon End */}
          {hasIconEnd && (
            <svg
              width={iconEndStyle?.width ?? 16}
              height={iconEndStyle?.height ?? 16}
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path d="M4 6L8 10L12 6" stroke={prefixSuffixColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {/* Error Icon */}
          {isError && <FlowXErrorIcon />}
        </div>
      </div>

      {/* Description */}
      <FlowXDescription
        state={state === "hover" ? "default" : state}
        inverted={inverted}
        visible={hasDescription}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const inputFieldTokens = [
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
    value: "Input background (outlined)",
    preview: <div className="size-5 rounded border-2 bg-background" />,
  },
  {
    name: "--color-muted",
    value: "Input background (filled)",
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
    value: "Placeholder & prefix/suffix text",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
  {
    name: "--color-foreground",
    value: "Input value text",
    preview: <div className="size-5 rounded bg-foreground" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function InputFieldPage() {
  const spec = inputFieldSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={inputFieldTokens}
      interactivePreview={
        <ComponentPreview
          title="Input Field"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "state",
              options: ["default", "focused", "error", "disabled"],
            },
            {
              name: "size",
              options: ["medium", "small"],
            },
            {
              name: "filled",
              type: "boolean",
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "hasTopLabel",
              type: "boolean",
              default: true,
            },
            {
              name: "hasIconStart",
              type: "boolean",
            },
            {
              name: "hasPrefix",
              type: "boolean",
            },
            {
              name: "hasSuffix",
              type: "boolean",
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
              <FlowXInputField
                state={
                  (values.state as "default" | "focused" | "error" | "disabled") ||
                  "default"
                }
                size={
                  (values.size as "small" | "medium") || "medium"
                }
                value={values.filled === true ? "Value" : ""}
                inverted={values.inverted === true}
                hasTopLabel={values.hasTopLabel !== false}
                hasIconStart={values.hasIconStart === true}
                hasIconEnd={values.hasIconEnd === true}
                hasPrefix={values.hasPrefix === true}
                hasSuffix={values.hasSuffix === true}
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
                <FlowXInputField
                  state={
                    (v.props.state as
                      | "default"
                      | "focused"
                      | "error"
                      | "disabled") || "default"
                  }
                  value={v.props.filled === "on" ? "Value" : ""}
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
                <FlowXInputField
                  state={
                    s as "default" | "focused" | "error" | "disabled" | "hover"
                  }
                  placeholder="Empty"
                />
                <FlowXInputField
                  state={
                    s as "default" | "focused" | "error" | "disabled" | "hover"
                  }
                  value="Filled"
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
              <FlowXInputField
                size={s as "small" | "medium"}
                value={`Size ${s}`}
              />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      }
    />
  );
}
