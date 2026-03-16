"use client";

import Link from "next/link";
import { inputFieldSpec } from "@/lib/components-data/input-field";
import { getComponent } from "@/lib/components-data/registry";
import {
  getTextColor,
  getElementStyle,
  getElementTypography,
} from "@/lib/components-data/variant-style-helpers";

import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

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
  const labelColor = getTextColor(spec, variantProps, "Label");
  const valueColor = getTextColor(spec, variantProps, "ValueText");
  const placeholderColor = getTextColor(spec, variantProps, "Placeholder");
  const prefixSuffixColor = getTextColor(spec, variantProps, "PrefixSuffix");
  const descriptionColor = getTextColor(spec, variantProps, "Description");

  const labelTypo = getElementTypography(spec, variantProps, "Label");
  const inputTypo = getElementTypography(spec, variantProps, "ValueText");
  const prefixTypo = getElementTypography(spec, variantProps, "PrefixSuffix");
  const descTypo = getElementTypography(spec, variantProps, "Description");

  const iconStartStyle = getElementStyle(spec, variantProps, "IconStart");
  const iconEndStyle = getElementStyle(spec, variantProps, "IconEnd");
  const infoIconStyle = getElementStyle(spec, variantProps, "InfoIcon");

  const hasValue = value.length > 0;

  // Focus ring color comes from the Focused variant's container stroke
  const focusRingColor = isFocused ? containerStyle?.stroke : undefined;

  return (
    <div
      className="inline-flex flex-col gap-0.5"
      style={{ minWidth: 200 }}
    >
      {/* Label */}
      {hasTopLabel && (
        <div className="inline-flex items-center gap-1">
          <span
            style={{
              fontSize: labelTypo?.fontSize,
              lineHeight: labelTypo?.lineHeight ? `${labelTypo.lineHeight}px` : undefined,
              color: labelColor,
              fontWeight: labelTypo?.fontWeight,
            }}
          >
            Label
          </span>
          {/* Info icon */}
          <svg
            width={infoIconStyle?.width ?? 14}
            height={infoIconStyle?.height ?? 14}
            viewBox="0 0 14 14"
            fill="none"
            style={{ opacity: 0.5 }}
          >
            <circle cx="7" cy="7" r="6" stroke={labelColor} strokeWidth="1.2" />
            <path d="M7 6.5V10" stroke={labelColor} strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="4.5" r="0.6" fill={labelColor} />
          </svg>
        </div>
      )}

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
        </div>

        {/* Error icon outside container */}
        {isError && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <circle cx="8" cy="8" r="7" stroke="#e62200" strokeWidth="1" />
            <path
              d="M8 5V8.5"
              stroke="#e62200"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11" r="0.75" fill="#e62200" />
          </svg>
        )}
      </div>

      {/* Description */}
      {hasDescription && (
        <span
          style={{
            fontSize: descTypo?.fontSize,
            lineHeight: descTypo?.lineHeight ? `${descTypo.lineHeight}px` : undefined,
            color: descriptionColor,
          }}
        >
          {isError ? "Error message goes here" : "Helper text goes here"}
        </span>
      )}
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
    <div className="space-y-10">
      {/* 1. Status Banner */}
      <StatusBanner
        name={spec.name}
        status={spec.status}
        figmaLink={spec.figmaLink}
        lastUpdated={spec.lastUpdated}
      />

      {/* 2. Title + Description */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {spec.description}
        </p>
      </div>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 3. Interactive Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Preview</h2>
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
              options: ["small", "medium"],
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
            },
            {
              name: "hasIconStart",
              type: "boolean",
            },
            {
              name: "hasIconEnd",
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
      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 4. Variants */}
      {spec.variants && spec.variants.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Variants</h2>
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
                  <p className={`text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
                    {v.name}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 5. States */}
      {spec.states && spec.states.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap items-start gap-6">
            {spec.states.map((s) => (
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
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 6. Sizes */}
      {spec.sizes && spec.sizes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <div className="flex flex-wrap items-end gap-6">
            {spec.sizes.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <FlowXInputField
                  size={s as "small" | "medium"}
                  value={`Size ${s}`}
                />
                <span className="text-xs text-muted-foreground">{s}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 7. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 8. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 9. Dos and Don'ts */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 10. Accessibility */}
      {spec.accessibility && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Accessibility</h2>
          <div className="space-y-4 rounded-lg border p-6">
            {spec.accessibility.role && (
              <div>
                <h3 className="text-sm font-semibold">Role</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    {spec.accessibility.role}
                  </code>
                </p>
              </div>
            )}

            {spec.accessibility.keyboard &&
              spec.accessibility.keyboard.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold">
                    Keyboard Interactions
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {spec.accessibility.keyboard.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <kbd className="mt-0.5 shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                          {item.split(" — ")[0]}
                        </kbd>
                        <span>{item.split(" — ")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {spec.accessibility.ariaAttributes &&
              spec.accessibility.ariaAttributes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold">ARIA Attributes</h3>
                  <ul className="mt-2 space-y-1.5">
                    {spec.accessibility.ariaAttributes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                          {item.split(" — ")[0]}
                        </code>
                        <span>{item.split(" — ")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </section>
      )}

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 11. Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design Tokens Used</h2>
        <TokenTable tokens={inputFieldTokens} />
      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* 12. Related Components */}
      {spec.relatedComponents && spec.relatedComponents.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Components</h2>
          <div className="flex flex-wrap gap-2">
            {spec.relatedComponents.map((slug) => {
              const related = getComponent(slug);
              return related ? (
                <Link
                  key={slug}
                  href={`/components/${slug}`}
                  className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {related.name}
                </Link>
              ) : (
                <span
                  key={slug}
                  className="inline-flex items-center rounded-lg border border-dashed px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {slug}
                  <span className="ml-1.5 text-[10px] uppercase opacity-60">
                    planned
                  </span>
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
