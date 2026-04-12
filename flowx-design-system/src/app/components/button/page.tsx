"use client";

import { buttonSpec } from "@/lib/components-data/button";
import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PhosphorIcon, type IconName } from "@/lib/phosphor-icons";

/* ------------------------------------------------------------------ */
/*  Color lookup tables — every value extracted from Figma, never      */
/*  guessed. Keyed by [scope][variant][inverted][state].               */
/* ------------------------------------------------------------------ */

type StateColors = { fill: string; stroke: string; textColor: string; iconColor?: string };

const COLORS: Record<
  string,
  Record<string, Record<string, Record<string, StateColors>>>
> = {
  Brand: {
    Primary: {
      Off: {
        Default:  { fill: "#006bd8", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#005fc0", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#004c99", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#e3e8ed", stroke: "transparent", textColor: "#8390a2" },
      },
      On: {
        Default:  { fill: "#3389e0", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#006bd8", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#005fc0", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#475263", stroke: "transparent", textColor: "#8390a2" },
      },
    },
    Secondary: {
      Off: {
        Default:  { fill: "#ffffff", stroke: "#e3e8ed", textColor: "#006bd8", iconColor: "#1d232c" },
        Hover:    { fill: "#f7f8f9", stroke: "#e3e8ed", textColor: "#006bd8", iconColor: "#1d232c" },
        Pressed:  { fill: "#e3e8ed", stroke: "#e3e8ed", textColor: "#006bd8", iconColor: "#1d232c" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be", iconColor: "#1d232c" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "#5b6a7e", textColor: "#3389e0", iconColor: "#ffffff" },
        Hover:    { fill: "#475263", stroke: "#5b6a7e", textColor: "#3389e0", iconColor: "#ffffff" },
        Pressed:  { fill: "#5b6a7e", stroke: "#5b6a7e", textColor: "#3389e0", iconColor: "#ffffff" },
        Disabled: { fill: "transparent", stroke: "#5b6a7e", textColor: "#64748b", iconColor: "#ffffff" },
      },
    },
    Tertiary: {
      Off: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#006bd8" },
        Hover:    { fill: "#f7f8f9", stroke: "transparent", textColor: "#006bd8" },
        Pressed:  { fill: "#e3e8ed", stroke: "transparent", textColor: "#006bd8" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#3389e0" },
        Hover:    { fill: "#475263", stroke: "transparent", textColor: "#3389e0" },
        Pressed:  { fill: "#5b6a7e", stroke: "transparent", textColor: "#3389e0" },
        Disabled: { fill: "transparent", stroke: "transparent", textColor: "#64748b" },
      },
    },
  },
  Danger: {
    Primary: {
      Off: {
        Default:  { fill: "#e62200", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#d11f00", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#a31800", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#e3e8ed", stroke: "transparent", textColor: "#8390a2" },
      },
      On: {
        Default:  { fill: "#eb4e33", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#e62200", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#d11f00", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#475263", stroke: "transparent", textColor: "#8390a2" },
      },
    },
    Secondary: {
      Off: {
        Default:  { fill: "#ffffff", stroke: "#e3e8ed", textColor: "#e62200", iconColor: "#1d232c" },
        Hover:    { fill: "#f7f8f9", stroke: "#e3e8ed", textColor: "#e62200", iconColor: "#1d232c" },
        Pressed:  { fill: "#e3e8ed", stroke: "#e3e8ed", textColor: "#e62200", iconColor: "#1d232c" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be", iconColor: "#1d232c" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "#5b6a7e", textColor: "#eb4e33", iconColor: "#ffffff" },
        Hover:    { fill: "#475263", stroke: "#5b6a7e", textColor: "#eb4e33", iconColor: "#ffffff" },
        Pressed:  { fill: "#5b6a7e", stroke: "#5b6a7e", textColor: "#eb4e33", iconColor: "#ffffff" },
        Disabled: { fill: "transparent", stroke: "#5b6a7e", textColor: "#64748b", iconColor: "#ffffff" },
      },
    },
    Tertiary: {
      Off: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#e62200" },
        Hover:    { fill: "#f7f8f9", stroke: "transparent", textColor: "#e62200" },
        Pressed:  { fill: "#e3e8ed", stroke: "transparent", textColor: "#e62200" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#eb4e33" },
        Hover:    { fill: "#475263", stroke: "transparent", textColor: "#eb4e33" },
        Pressed:  { fill: "#5b6a7e", stroke: "transparent", textColor: "#eb4e33" },
        Disabled: { fill: "transparent", stroke: "transparent", textColor: "#64748b" },
      },
    },
  },
  Success: {
    Primary: {
      Off: {
        Default:  { fill: "#008060", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#007457", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#005b44", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#e3e8ed", stroke: "transparent", textColor: "#8390a2" },
      },
      On: {
        Default:  { fill: "#339980", stroke: "transparent", textColor: "#ffffff" },
        Hover:    { fill: "#008060", stroke: "transparent", textColor: "#ffffff" },
        Pressed:  { fill: "#007457", stroke: "transparent", textColor: "#ffffff" },
        Disabled: { fill: "#475263", stroke: "transparent", textColor: "#8390a2" },
      },
    },
    Secondary: {
      Off: {
        Default:  { fill: "#ffffff", stroke: "#e3e8ed", textColor: "#008060", iconColor: "#1d232c" },
        Hover:    { fill: "#f7f8f9", stroke: "#e3e8ed", textColor: "#008060", iconColor: "#1d232c" },
        Pressed:  { fill: "#e3e8ed", stroke: "#e3e8ed", textColor: "#008060", iconColor: "#1d232c" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be", iconColor: "#1d232c" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "#5b6a7e", textColor: "#339980", iconColor: "#ffffff" },
        Hover:    { fill: "#475263", stroke: "#5b6a7e", textColor: "#339980", iconColor: "#ffffff" },
        Pressed:  { fill: "#5b6a7e", stroke: "#5b6a7e", textColor: "#339980", iconColor: "#ffffff" },
        Disabled: { fill: "transparent", stroke: "#5b6a7e", textColor: "#64748b", iconColor: "#ffffff" },
      },
    },
    Tertiary: {
      Off: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#008060" },
        Hover:    { fill: "#f7f8f9", stroke: "transparent", textColor: "#008060" },
        Pressed:  { fill: "#e3e8ed", stroke: "transparent", textColor: "#008060" },
        Disabled: { fill: "transparent", stroke: "#cbd1db", textColor: "#a6b0be" },
      },
      On: {
        Default:  { fill: "transparent", stroke: "transparent", textColor: "#339980" },
        Hover:    { fill: "#475263", stroke: "transparent", textColor: "#339980" },
        Pressed:  { fill: "#5b6a7e", stroke: "transparent", textColor: "#339980" },
        Disabled: { fill: "transparent", stroke: "transparent", textColor: "#64748b" },
      },
    },
  },
};

/* ---- Size tokens (from Figma) ---- */
const SIZE_MAP: Record<
  string,
  { height: number; fontSize: number; lineHeight: number; cornerRadius: number; itemSpacing: number; iconSize: number; paddingH: number; paddingV: number }
> = {
  Medium: { height: 36, fontSize: 14, lineHeight: 24, cornerRadius: 8, itemSpacing: 6, iconSize: 24, paddingH: 12, paddingV: 6 },
  Small:  { height: 28, fontSize: 12, lineHeight: 16, cornerRadius: 8, itemSpacing: 6, iconSize: 16, paddingH: 8,  paddingV: 6 },
  XS:     { height: 24, fontSize: 10, lineHeight: 12, cornerRadius: 8, itemSpacing: 6, iconSize: 12, paddingH: 6,  paddingV: 6 },
  XXS:    { height: 16, fontSize: 10, lineHeight: 12, cornerRadius: 4, itemSpacing: 2, iconSize: 12, paddingH: 4,  paddingV: 2 },
};

/* ------------------------------------------------------------------ */
/*  FlowXButton — preview component matching Figma pixel-for-pixel     */
/*  All color/size values from Figma extraction, zero hardcoded guess  */
/* ------------------------------------------------------------------ */

function FlowXButton({
  scope = "Brand",
  variant = "Primary",
  state = "Default",
  size = "Medium",
  inverted = false,
  hasLabel = true,
  hasIconStart = false,
  hasIconEnd = false,
  iconStart,
  iconEnd,
  label = "Button",
}: {
  scope?: "Brand" | "Danger" | "Success";
  variant?: "Primary" | "Secondary" | "Tertiary";
  state?: "Default" | "Hover" | "Pressed" | "Disabled";
  size?: "Medium" | "Small" | "XS" | "XXS";
  inverted?: boolean;
  hasLabel?: boolean;
  hasIconStart?: boolean;
  hasIconEnd?: boolean;
  iconStart?: IconName;
  iconEnd?: IconName;
  label?: string;
}) {
  const inv = inverted ? "On" : "Off";
  const colors = COLORS[scope]?.[variant]?.[inv]?.[state] ?? COLORS.Brand.Primary.Off.Default;
  const sizeTokens = SIZE_MAP[size] ?? SIZE_MAP.Medium;

  const hasBorder = colors.stroke !== "transparent";
  const iconCount = (hasIconStart ? 1 : 0) + (hasIconEnd ? 1 : 0);
  const isIconOnly = !hasLabel && iconCount === 1;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: sizeTokens.itemSpacing,
        height: sizeTokens.height,
        ...(isIconOnly
          ? { width: sizeTokens.height }
          : { paddingLeft: sizeTokens.paddingH, paddingRight: sizeTokens.paddingH }),
        borderRadius: sizeTokens.cornerRadius,
        backgroundColor: colors.fill,
        border: hasBorder ? `1px solid ${colors.stroke}` : "none",
        fontFamily: "var(--font-flowx)",
        cursor: state === "Disabled" ? "not-allowed" : "pointer",
        boxSizing: "border-box",
      }}
    >
      {hasIconStart && iconStart && (
        <PhosphorIcon name={iconStart} size={sizeTokens.iconSize} color={colors.iconColor ?? colors.textColor} />
      )}
      {hasLabel && (
        <span
          style={{
            fontSize: sizeTokens.fontSize,
            lineHeight: `${sizeTokens.lineHeight}px`,
            fontWeight: 600,
            color: colors.textColor,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
      {hasIconEnd && iconEnd && (
        <PhosphorIcon name={iconEnd} size={sizeTokens.iconSize} color={colors.iconColor ?? colors.textColor} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */

const buttonTokens = [
  {
    name: "blue/500 (#006bd8)",
    value: "Brand Primary container fill (default)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#006bd8" }} />,
  },
  {
    name: "blue/400 (#3389e0)",
    value: "Brand Primary container fill (inverted default)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#3389e0" }} />,
  },
  {
    name: "red/500 (#e62200)",
    value: "Danger Primary container fill (default)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e62200" }} />,
  },
  {
    name: "green/500 (#008060)",
    value: "Success Primary container fill (default)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#008060" }} />,
  },
  {
    name: "grays/100 (#e3e8ed)",
    value: "Disabled container fill (light), Secondary border, Pressed fill",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#e3e8ed" }} />,
  },
  {
    name: "grays/50 (#f7f8f9)",
    value: "Hover background for Secondary & Tertiary (light)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f7f8f9" }} />,
  },
  {
    name: "grays/600 (#475263)",
    value: "Disabled container fill (inverted), Hover bg (inverted Secondary/Tertiary)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#475263" }} />,
  },
  {
    name: "grays/500 (#5b6a7e)",
    value: "Inverted Secondary border, Pressed bg (inverted)",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#5b6a7e" }} />,
  },
  {
    name: "scale/6 (6px)",
    value: "Container padding-top/bottom, item spacing",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid #cbd1db" }} />,
  },
  {
    name: "scale/12 (12px)",
    value: "Container padding-left/right",
    preview: <div style={{ width: 20, height: 20, borderRadius: 4, border: "2px solid #cbd1db" }} />,
  },
  {
    name: "Radius/200 (8px)",
    value: "Container corner radius (Medium, Small, XS); 4px for XXS",
    preview: <div style={{ width: 20, height: 20, borderRadius: 8, border: "2px solid #cbd1db" }} />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ButtonPage() {
  const spec = buttonSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={buttonTokens}
      interactivePreview={
        <ComponentPreview
          title="Button"
          description="Explore different scopes, variants, states, and sizes."
          controls={[
            {
              name: "scope",
              options: ["Brand", "Danger", "Success"],
            },
            {
              name: "variant",
              options: ["Primary", "Secondary", "Tertiary"],
            },
            {
              name: "state",
              options: ["Default", "Hover", "Pressed", "Disabled"],
            },
            {
              name: "size",
              options: ["Medium", "Small", "XS", "XXS"],
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
              name: "hasIconStart",
              type: "boolean",
            },
            {
              name: "iconStart",
              type: "icon",
              default: "Check",
              disabledUnless: "hasIconStart",
            },
            {
              name: "hasIconEnd",
              type: "boolean",
            },
            {
              name: "iconEnd",
              type: "icon",
              default: "ArrowRight",
              disabledUnless: "hasIconEnd",
            },
          ]}
          render={(values) => (
            <FlowXButton
              scope={(values.scope as "Brand" | "Danger" | "Success") || "Brand"}
              variant={(values.variant as "Primary" | "Secondary" | "Tertiary") || "Primary"}
              state={(values.state as "Default" | "Hover" | "Pressed" | "Disabled") || "Default"}
              size={(values.size as "Medium" | "Small" | "XS" | "XXS") || "Medium"}
              inverted={values.inverted === true}
              hasLabel={values.hasLabel !== false}
              hasIconStart={values.hasIconStart === true}
              hasIconEnd={values.hasIconEnd === true}
              iconStart={values.hasIconStart ? (values.iconStart as IconName) : undefined}
              iconEnd={values.hasIconEnd ? (values.iconEnd as IconName) : undefined}
            />
          )}
        />
      }
      renderGuidelinePreview={(props) => (
        <FlowXButton
          scope={(props.scope as "Brand" | "Danger" | "Success") || "Brand"}
          variant={(props.variant as "Primary" | "Secondary" | "Tertiary") || "Primary"}
          state={(props.state as "Default" | "Hover" | "Pressed" | "Disabled") || "Default"}
          inverted={props.inverted === "On"}
        />
      )}
      statesReference={
        spec.states && spec.states.length > 0 ? (
          <div className="space-y-6">
            {(["Brand", "Danger", "Success"] as const).map((scope) => (
              <div key={scope}>
                <p className="mb-3 text-sm font-semibold">{scope}</p>
                <div className="flex flex-wrap items-start gap-4">
                  {spec.states.map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <div className="flex gap-2">
                        <FlowXButton scope={scope} variant="Primary" state={s as "Default" | "Hover" | "Pressed" | "Disabled"} />
                        <FlowXButton scope={scope} variant="Secondary" state={s as "Default" | "Hover" | "Pressed" | "Disabled"} />
                        <FlowXButton scope={scope} variant="Tertiary" state={s as "Default" | "Hover" | "Pressed" | "Disabled"} />
                      </div>
                      <span className="text-xs text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
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
                <FlowXButton
                  size={s as "Medium" | "Small" | "XS" | "XXS"}
                  label="Button"
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
