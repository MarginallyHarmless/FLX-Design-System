"use client";

import { switchSpec } from "@/lib/components-data/switch";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";

/* ------------------------------------------------------------------ */
/*  FlowXSwitch — local preview component matching Figma design        */
/*  Vanilla HTML/CSS via inline styles — no shadcn, no Tailwind        */
/* ------------------------------------------------------------------ */

function FlowXSwitch({
  on = false,
  state = "default",
  inverted = false,
  size = "medium",
  label = "Label",
  labelPosition = "right",
}: {
  on?: boolean;
  state?: "default" | "disabled";
  inverted?: boolean;
  size?: "small" | "medium";
  label?: string;
  labelPosition?: "left" | "right";
}) {
  const isSmall = size === "small";
  const isDisabled = state === "disabled";

  /* ---- Track dimensions ---- */
  const trackW = isSmall ? 28 : 42;
  const trackH = isSmall ? 16 : 24;

  /* ---- Knob dimensions ---- */
  const getKnobSize = () => {
    if (!isSmall) return 16;
    return on ? 12 : 10;
  };
  const knobSize = getKnobSize();

  /* ---- Track fill ---- */
  const getTrackFill = () => {
    if (on) {
      if (isDisabled) return inverted ? "#5b6a7e" : "#8390a2";
      return inverted ? "#3389e0" : "#006bd8";
    }
    // Off
    return inverted ? "#5b6a7e" : "#ffffff";
  };

  /* ---- Track stroke (Off state only — On has NO stroke) ---- */
  const getTrackStroke = () => {
    if (on) return "transparent";
    if (inverted) return "#8390a2";
    return "#cbd1db";
  };

  /* ---- Knob fill ---- */
  const getKnobFill = () => {
    if (on) return "#ffffff";
    if (isDisabled) return inverted ? "#a6b0be" : "#cbd1db";
    return inverted ? "#ffffff" : "#64748b";
  };

  /* ---- Label color ---- */
  const getLabelColor = () => {
    return inverted ? "#ffffff" : "#0f1114";
  };

  /* ---- Knob position ---- */
  const getKnobMarginLeft = () => {
    if (on) {
      // Push knob to the right: trackW - knobSize - padding
      if (isSmall) return trackW - knobSize - 2;
      return trackW - knobSize - 4;
    }
    // Off: knob at left
    if (isSmall) return 3;
    return 4;
  };

  const getKnobMarginTop = () => {
    // Center vertically: (trackH - knobSize) / 2
    return (trackH - knobSize) / 2;
  };

  const trackFill = getTrackFill();
  const trackStroke = getTrackStroke();
  const knobFill = getKnobFill();
  const labelColor = getLabelColor();
  const knobMarginLeft = getKnobMarginLeft();
  const knobMarginTop = getKnobMarginTop();
  const hasStroke = !on;

  const labelEl = (
    <span
      style={{
        fontSize: isSmall ? 12 : 14,
        lineHeight: isSmall ? "16px" : "22px",
        color: labelColor,
        fontWeight: 400,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );

  const trackEl = (
    <div
      style={{
        position: "relative",
        width: trackW,
        height: trackH,
        borderRadius: 20,
        backgroundColor: trackFill,
        border: hasStroke ? `1.5px solid ${trackStroke}` : "none",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    >
      {/* Knob */}
      <div
        style={{
          position: "absolute",
          top: hasStroke ? knobMarginTop - 1.5 : knobMarginTop,
          left: hasStroke ? knobMarginLeft - 1.5 : knobMarginLeft,
          width: knobSize,
          height: knobSize,
          borderRadius: "50%",
          backgroundColor: knobFill,
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-flowx)",
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      {labelPosition === "left" && labelEl}
      {trackEl}
      {labelPosition === "right" && labelEl}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const switchTokens = [
  {
    name: "--color-blue-500 (#006bd8)",
    value: "On track fill (default, light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "--color-blue-400 (#3389e0)",
    value: "On track fill (default, inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#3389e0" }} />,
  },
  {
    name: "--color-neutrals-400 (#8390a2)",
    value: "On track fill (disabled, light) / Off track stroke (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#8390a2" }} />,
  },
  {
    name: "--color-neutrals-600 (#5b6a7e)",
    value: "On track fill (disabled, inverted) / Off track fill (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#5b6a7e" }} />,
  },
  {
    name: "--color-neutrals-500 (#64748b)",
    value: "Off knob fill (default, light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#64748b" }} />,
  },
  {
    name: "--color-neutrals-200 (#cbd1db)",
    value: "Off track stroke (light) / Off knob fill (disabled, light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#cbd1db" }} />,
  },
  {
    name: "--color-neutrals-300 (#a6b0be)",
    value: "Off knob fill (disabled, inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#a6b0be" }} />,
  },
  {
    name: "--color-white (#ffffff)",
    value: "On knob fill (all) / Off track fill (light) / Inverted label text",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#ffffff", border: "1px solid #e3e8ed" }} />,
  },
  {
    name: "--color-neutrals-950 (#0f1114)",
    value: "Label text color (light backgrounds)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#0f1114" }} />,
  },
  {
    name: "--radius-full (20px)",
    value: "Track border radius (pill shape)",
    preview: <div style={{ width: 30, height: 16, borderRadius: 20, border: "2px solid #cbd1db" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function SwitchPage() {
  const spec = switchSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={switchTokens}
      interactivePreview={
        <ComponentPreview
          title="Switch"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "on",
              type: "boolean",
            },
            {
              name: "state",
              options: ["default", "disabled"],
            },
            {
              name: "size",
              options: ["medium", "small"],
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "label position",
              options: ["right", "left"],
            },
          ]}
          render={(values) => (
            <FlowXSwitch
              on={values.on === true}
              state={
                (values.state as "default" | "disabled") || "default"
              }
              size={
                (values.size as "small" | "medium") || "medium"
              }
              inverted={values.inverted === true}
              labelPosition={
                (values["label position"] as "left" | "right") || "right"
              }
            />
          )}
        />
      }
      useCases={
        spec.variants && spec.variants.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spec.variants.map((v) => {
              const isInverted = v.props.inverted === "on";
              const isLeftAlign = v.props.layout === "left-align";
              const isCardUseCase = v.props.layout === "card";
              if (isLeftAlign) {
                return (
                  <div
                    key={v.name}
                    className={`flex flex-col gap-3 rounded-lg p-6 sm:col-span-2 ${
                      isInverted ? "bg-neutral-900 text-white" : ""
                    }`}
                    style={!isInverted ? { backgroundColor: "#f7f8f9" } : undefined}
                  >
                    <div className="flex flex-col gap-3">
                      <FlowXSwitch on={true} size="medium" label="Email notifications" labelPosition="right" />
                      <FlowXSwitch on={false} size="medium" label="Push notifications" labelPosition="right" />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isInverted ? "text-neutral-200" : ""}`}>
                        {v.name}
                      </p>
                      <p className={`mt-0.5 text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
                        {v.useCase}
                      </p>
                    </div>
                  </div>
                );
              }
              if (isCardUseCase) {
                return (
                  <div
                    key={v.name}
                    className={`flex flex-col gap-3 rounded-lg p-6 sm:col-span-2 ${
                      isInverted ? "bg-neutral-900 text-white" : ""
                    }`}
                    style={!isInverted ? { backgroundColor: "#f7f8f9" } : undefined}
                  >
                    <div
                      className="rounded-lg border bg-white px-4 py-3 flex items-center justify-between"
                      style={{
                        borderColor: isInverted ? "#374151" : "#e3e8ed",
                        backgroundColor: isInverted ? "#1f2937" : "#ffffff",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: isInverted ? "#ffffff" : "#0f1114",
                          fontFamily: "var(--font-flowx)",
                        }}
                      >
                        {v.props.cardTitle || "Enable notifications"}
                      </span>
                      <FlowXSwitch
                        on={v.props.on === "on"}
                        state={
                          (v.props.state as "default" | "disabled") || "default"
                        }
                        inverted={isInverted}
                        size={(v.props.size as "small" | "medium") || "medium"}
                        label=""
                      />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isInverted ? "text-neutral-200" : ""}`}>
                        {v.name}
                      </p>
                      <p className={`mt-0.5 text-xs ${isInverted ? "text-neutral-400" : "text-muted-foreground"}`}>
                        {v.useCase}
                      </p>
                    </div>
                  </div>
                );
              }
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
                  <FlowXSwitch
                    on={v.props.on === "on"}
                    state={
                      (v.props.state as "default" | "disabled") || "default"
                    }
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
                <div className="flex gap-3">
                  <FlowXSwitch
                    on={false}
                    state={s as "default" | "disabled"}
                    label="Off"
                  />
                  <FlowXSwitch
                    on={true}
                    state={s as "default" | "disabled"}
                    label="On"
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
                <FlowXSwitch
                  on={true}
                  size={s as "small" | "medium"}
                  label={`Size ${s}`}
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
