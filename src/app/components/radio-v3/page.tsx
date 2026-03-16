"use client";

import Link from "next/link";
import { radioV3Spec } from "@/lib/components-data/radio-v3";
import { getComponent } from "@/lib/components-data/registry";
import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

/* ------------------------------------------------------------------ */
/*  FlowXRadio — local preview component matching Figma design         */
/*  Vanilla HTML/CSS via inline styles — no shadcn, no Tailwind        */
/* ------------------------------------------------------------------ */

function FlowXRadio({
  selected = false,
  state = "default",
  border = true,
  inverted = false,
  size = "medium",
  label = "Label",
  value = "Value",
}: {
  selected?: boolean;
  state?: "default" | "error" | "disabled";
  border?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  label?: string;
  value?: string;
}) {
  const isSmall = size === "small";
  const isDisabled = state === "disabled";
  const isError = state === "error";

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

  /* ---- Label color ---- */
  const getLabelColor = () => {
    if (isDisabled) return inverted ? "#64748b" : "#8390a2";
    return inverted ? "#ffffff" : "#1d232c";
  };

  /* ---- Value text color ---- */
  const getValueColor = () => {
    if (isDisabled) return inverted ? "#8390a2" : "#64748b";
    return inverted ? "#ffffff" : "#1d232c";
  };

  const containerBg = getContainerBg();
  const containerBorder = getContainerBorder();
  const radioFill = getRadioFill();
  const radioStroke = getRadioStroke();
  const labelColor = getLabelColor();
  const valueColor = getValueColor();

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
      <span
        style={{
          fontSize: isSmall ? 12 : 14,
          lineHeight: isSmall ? "16px" : "24px",
          color: labelColor,
          fontWeight: 600,
        }}
      >
        {label}
      </span>

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
            gap: isSmall ? 8 : 8,
            height: isSmall ? 28 : 36,
            paddingLeft: border ? 8 : 0,
            paddingRight: border ? 12 : 0,
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
        {isError && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <circle cx="8" cy="8" r="7" stroke="#e62200" strokeWidth="1.5" />
            <path
              d="M8 5V8.5"
              stroke="#e62200"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11" r="0.75" fill="#e62200" />
          </svg>
        )}
      </div>
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
            />
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
                  <FlowXRadio
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
                  <p
                    className={`text-xs ${
                      isInverted
                        ? "text-neutral-400"
                        : "text-muted-foreground"
                    }`}
                  >
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
                <FlowXRadio
                  selected={true}
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
        <TokenTable tokens={radioTokens} />
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
