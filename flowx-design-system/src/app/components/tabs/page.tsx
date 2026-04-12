"use client";

import { tabsSpec } from "@/lib/components-data/tabs";
import {
  findVariantStyle,
} from "@/lib/components-data/variant-style-helpers";
import { PhosphorIcon, type IconName } from "@/lib/phosphor-icons";

import { ComponentPageTemplate } from "@/components/docs/component-page-template";
import { ComponentPreview } from "@/components/docs/component-preview";

/* ------------------------------------------------------------------ */
/*  FlowXTabs — data-driven preview component                         */
/*  ALL colors and typography come from tabsSpec.variantStyles          */
/*  via helpers. Zero hardcoded hex values.                             */
/* ------------------------------------------------------------------ */

function FlowXTabs({
  size = "medium",
  inverted = false,
  tabs = ["Tab Name", "Tab Name", "Tab Name", "Tab Name", "Tab Name"],
  activeIndex = 1,
  hasIcon = false,
  iconName,
  hasCounter = false,
}: {
  size?: "small" | "medium";
  inverted?: boolean;
  tabs?: string[];
  activeIndex?: number;
  hasIcon?: boolean;
  iconName?: IconName;
  hasCounter?: boolean;
}) {
  const spec = tabsSpec;
  const variantProps = {
    size: size === "small" ? "small" : "medium",
    inverted: inverted ? "on" : "off",
  };

  const vs = findVariantStyle(spec, variantProps);
  if (!vs) return null;

  const containerStyle = vs.elements.TabsContainer;
  const activeTabCellStyle = vs.elements.ActiveTabCell;
  const inactiveTabCellStyle = vs.elements.InactiveTabCell;
  const activeNameStyle = vs.elements.ActiveTabName;
  const inactiveNameStyle = vs.elements.InactiveTabName;
  const activeCounterStyle = vs.elements.ActiveCounter;
  const inactiveCounterStyle = vs.elements.InactiveCounter;

  const isSmall = size === "small";
  const cellPadding = isSmall ? "6px 12px" : "8px 12px";
  const counterSize = isSmall ? 16 : (activeIndex >= 0 ? 20 : 16);

  return (
    <div
      style={{
        display: "inline-flex",
        borderBottom: `${containerStyle?.strokeWidth ?? 1}px solid ${containerStyle?.stroke}`,
        fontFamily: "var(--font-flowx)",
      }}
    >
      {tabs.map((label, i) => {
        const isActive = i === activeIndex;
        const cellStyle = isActive ? activeTabCellStyle : inactiveTabCellStyle;
        const nameStyle = isActive ? activeNameStyle : inactiveNameStyle;
        const ctrStyle = isActive ? activeCounterStyle : inactiveCounterStyle;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: cellPadding,
              cursor: "pointer",
              borderBottom: isActive
                ? `${cellStyle?.strokeWidth ?? 2}px solid ${cellStyle?.stroke}`
                : `${inactiveTabCellStyle?.strokeWidth ?? 0}px solid transparent`,
              marginBottom: isActive ? -(containerStyle?.strokeWidth ?? 1) : -(containerStyle?.strokeWidth ?? 1),
            }}
          >
            {/* Left Icon */}
            {hasIcon && iconName && (
              <PhosphorIcon name={iconName} size={16} color={nameStyle?.textColor} />
            )}

            {/* Tab Name */}
            <span
              style={{
                fontSize: nameStyle?.fontSize,
                lineHeight: nameStyle?.lineHeight ? `${nameStyle.lineHeight}px` : undefined,
                fontWeight: nameStyle?.fontWeight,
                color: nameStyle?.textColor,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>

            {/* Counter */}
            {hasCounter && (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: isActive && !isSmall ? 20 : 16,
                  height: isActive && !isSmall ? 20 : 16,
                  borderRadius: 99,
                  backgroundColor: ctrStyle?.fill,
                  color: ctrStyle?.textColor,
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: "12px",
                  flexShrink: 0,
                }}
              >
                13
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                            */
/* ------------------------------------------------------------------ */

const tabsTokens = [
  {
    name: "blue/500",
    value: "Active tab text & indicator (#006bd8)",
    preview: <div className="size-5 rounded" style={{ backgroundColor: "#006bd8" }} />,
  },
  {
    name: "neutrals/500",
    value: "Inactive tab text (#64748b)",
    preview: <div className="size-5 rounded" style={{ backgroundColor: "#64748b" }} />,
  },
  {
    name: "neutrals/100",
    value: "Container divider stroke (#e3e8ed)",
    preview: <div className="size-5 rounded" style={{ backgroundColor: "#e3e8ed" }} />,
  },
  {
    name: "neutrals/700",
    value: "Inverted container divider (#475263)",
    preview: <div className="size-5 rounded" style={{ backgroundColor: "#475263" }} />,
  },
  {
    name: "scale/8",
    value: "Tab cell vertical padding (8px)",
    preview: <div className="size-5 rounded border-2 border-foreground/30" />,
  },
  {
    name: "scale/12",
    value: "Tab cell horizontal padding (12px)",
    preview: <div className="size-5 rounded border-2 border-foreground/30" />,
  },
  {
    name: "fontsize/m",
    value: "Medium tab text size (14px)",
    preview: <div className="size-5 rounded border-2 border-foreground/30" />,
  },
  {
    name: "fontsize/s",
    value: "Small tab text size (12px)",
    preview: <div className="size-5 rounded border-2 border-foreground/30" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function TabsPage() {
  const spec = tabsSpec;

  return (
    <ComponentPageTemplate
      spec={spec}
      tokens={tabsTokens}
      interactivePreview={
        <ComponentPreview
          title="Tabs"
          description="Explore different sizes and options."
          controls={[
            {
              name: "size",
              options: ["medium", "small"],
            },
            {
              name: "inverted",
              type: "boolean",
            },
            {
              name: "hasIcon",
              type: "boolean",
            },
            {
              name: "iconName",
              type: "icon",
              default: "User",
              disabledUnless: "hasIcon",
            },
            {
              name: "hasCounter",
              type: "boolean",
            },
          ]}
          render={(values) => (
            <FlowXTabs
              size={(values.size as "small" | "medium") || "medium"}
              inverted={values.inverted === true}
              hasIcon={values.hasIcon === true}
              iconName={(values.iconName as IconName) || "User"}
              hasCounter={values.hasCounter === true}
            />
          )}
        />
      }
      renderGuidelinePreview={(props) => (
        <FlowXTabs
          size={(props.size as "small" | "medium") || "medium"}
          inverted={props.inverted === "on"}
        />
      )}
      statesReference={
        <div className="flex flex-wrap items-start gap-8">
          {["active", "inactive"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <FlowXTabs
                tabs={["Tab Name"]}
                activeIndex={s === "active" ? 0 : -1}
              />
              <span className="text-xs text-muted-foreground capitalize">
                {s}
              </span>
            </div>
          ))}
        </div>
      }
      sizes={
        <div className="flex flex-wrap items-end gap-8">
          {spec.sizes?.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <FlowXTabs
                size={s as "small" | "medium"}
                tabs={["Tab 1", "Tab 2", "Tab 3"]}
                activeIndex={1}
              />
              <span className="text-xs text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      }
    />
  );
}
