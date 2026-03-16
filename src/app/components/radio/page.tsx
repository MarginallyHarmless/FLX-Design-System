"use client";

import Link from "next/link";
import { radioSpec } from "@/lib/components-data/radio";
import { getComponent } from "@/lib/components-data/registry";
import { Separator } from "@/components/ui/separator";
import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

/* ------------------------------------------------------------------ */
/*  FlowXRadio — local preview component matching Figma design        */
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
  state?: "default" | "error" | "disabled" | "hover" | "focus";
  border?: boolean;
  inverted?: boolean;
  size?: "small" | "medium";
  label?: string;
  value?: string;
}) {
  const isSmall = size === "small";
  const isDisabled = state === "disabled";
  const isError = state === "error";
  const isHover = state === "hover";
  const isFocus = state === "focus";

  // Container background
  const containerBg = isDisabled
    ? selected
      ? inverted
        ? "#3b4555"
        : "#e3e8ed"
      : inverted
        ? "#3b4555"
        : "#f5f7f9"
    : inverted
      ? selected
        ? "#004c99"
        : "#475263"
      : selected
        ? "#e6f0fb"
        : "#ffffff";

  // Container border
  const containerBorder = isError
    ? "#eb4e33"
    : isDisabled
      ? inverted
        ? "#5b6a7e"
        : "#64748b"
      : selected
        ? inverted
          ? "#3389e0"
          : "#006bd8"
        : isHover
          ? inverted
            ? "#8390a2"
            : "#cbd1db"
          : inverted
            ? "#64748b"
            : "#e3e8ed";

  // Radio fill (checked state)
  const radioFill = selected
    ? isError
      ? "#eb4e33"
      : isDisabled
        ? "#a6b0be"
        : inverted
          ? "#3389e0"
          : "#006bd8"
    : "transparent";

  // Radio border (unchecked)
  const radioBorder = isError
    ? "#eb4e33"
    : selected
      ? "transparent"
      : inverted
        ? "#8390a2"
        : "#cbd1db";

  // Text colors
  const textColor = isDisabled
    ? "#64748b"
    : inverted
      ? "#ffffff"
      : "#1d232c";

  const labelColor = isDisabled
    ? "#8390a2"
    : inverted
      ? "#ffffff"
      : "#1d232c";

  const iconSize = isSmall ? 16 : 24;
  const innerDotSize = isSmall ? 6 : 9.6;

  return (
    <div
      className={`inline-flex flex-col gap-0.5 ${isDisabled ? "opacity-50" : ""}`}
      style={{ fontFamily: "var(--font-flowx)" }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: isSmall ? 10 : 12,
          lineHeight: isSmall ? "12px" : "16px",
          color: labelColor,
          fontWeight: 400,
        }}
      >
        {label}
      </span>

      {/* Input Container + optional error icon */}
      <div className="inline-flex items-center gap-1">
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            height: isSmall ? 28 : 36,
            paddingLeft: border ? 6 : 0,
            paddingRight: border ? 12 : 0,
            borderRadius: border ? 8 : 0,
            border: border ? `1px solid ${containerBorder}` : "none",
            backgroundColor: border ? containerBg : "transparent",
            cursor: isDisabled ? "not-allowed" : "pointer",
            outline: isFocus
              ? `2px solid ${inverted ? "#3389e0" : "#006bd8"}`
              : undefined,
            outlineOffset: isFocus ? 1 : undefined,
          }}
        >
          {/* Radio icon */}
          <div
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: "50%",
              border: selected
                ? "none"
                : `1.5px solid ${radioBorder}`,
              backgroundColor: selected ? radioFill : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {selected && (
              <div
                style={{
                  width: innerDotSize,
                  height: innerDotSize,
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                }}
              />
            )}
          </div>

          {/* Value text */}
          <span
            style={{
              fontSize: isSmall ? 12 : 14,
              lineHeight: isSmall ? "16px" : "24px",
              color: textColor,
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
            <circle cx="8" cy="8" r="7" stroke="#eb4e33" strokeWidth="1.5" />
            <path
              d="M8 5V8.5"
              stroke="#eb4e33"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="8" cy="11" r="0.75" fill="#eb4e33" />
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
    name: "--color-primary",
    value: "Brand primary / selected ring fill (#006bd8)",
    preview: <div className="size-5 rounded-full bg-primary" />,
  },
  {
    name: "--color-destructive",
    value: "Error state border & radio fill (#eb4e33)",
    preview: <div className="size-5 rounded-full bg-destructive" />,
  },
  {
    name: "--color-input",
    value: "Unselected radio border (#cbd1db)",
    preview: <div className="size-5 rounded-full border-2 border-input" />,
  },
  {
    name: "--radius-lg",
    value: "0.5rem (input container)",
    preview: (
      <div className="size-5 rounded-lg border-2 border-foreground/30" />
    ),
  },
  {
    name: "--color-blue-50",
    value: "Selected container background (#e6f0fb)",
    preview: (
      <div className="size-5 rounded" style={{ backgroundColor: "#e6f0fb" }} />
    ),
  },
  {
    name: "--color-muted-foreground",
    value: "Disabled text color (#64748b)",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function RadioPage() {
  const spec = radioSpec;

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

      <Separator />

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
            <div
              className={`inline-flex items-center justify-center rounded-lg p-6 ${
                values.inverted ? "bg-neutral-900" : ""
              }`}
            >
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
            </div>
          )}
        />
      </section>

      <Separator />

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
                      ? "border border-neutral-700 bg-neutral-900 text-white"
                      : "border"
                  }`}
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
                  <div className="text-center">
                    <p className="text-sm font-medium">{v.name}</p>
                    {v.useCase && (
                      <p
                        className={`mt-0.5 text-xs ${
                          isInverted
                            ? "text-neutral-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {v.useCase}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <Separator />

      {/* 5. States */}
      {spec.states && spec.states.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap items-start gap-6">
            {spec.states.map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <span className="text-xs font-medium text-muted-foreground capitalize">
                  {s}
                </span>
                <div className="flex gap-3">
                  <FlowXRadio
                    selected={false}
                    state={
                      s as "default" | "error" | "disabled" | "hover" | "focus"
                    }
                    value="Unselected"
                  />
                  <FlowXRadio
                    selected={true}
                    state={
                      s as "default" | "error" | "disabled" | "hover" | "focus"
                    }
                    value="Selected"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

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

      <Separator />

      {/* 7. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      <Separator />

      {/* 8. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      <Separator />

      {/* 9. Dos and Don'ts */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      <Separator />

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

      <Separator />

      {/* 11. Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design Tokens Used</h2>
        <TokenTable tokens={radioTokens} />
      </section>

      <Separator />

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
