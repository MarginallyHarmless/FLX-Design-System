"use client";

import { useState } from "react";
import { ICON_OPTIONS, PhosphorIcon } from "@/lib/phosphor-icons";

interface Control {
  name: string;
  options?: string[];
  type?: "boolean" | "icon";
  default?: any;
  /** Name of another control that must be truthy for this control to be enabled. */
  disabledUnless?: string;
  /** Name of another control — when its value equals this string (or is truthy if no value specified), this control is disabled. */
  disabledWhen?: string;
  /** The value of the other control that triggers the disabled state. Defaults to truthy check. */
  disabledWhenValue?: any;
  /** Name of another boolean control — when truthy, this boolean control is forced on. */
  forcedOnWhen?: string;
  /** Override this control's value when another control is truthy. Later entries take priority. */
  setValueWhen?: { watch: string; value: any }[];
  /** This boolean control can only be on when the watched control has the specified value. Clears automatically otherwise. */
  requiredValue?: { control: string; value: any };
}

interface ComponentPreviewProps {
  title: string;
  description?: string;
  controls: Control[];
  render: (values: Record<string, any>) => React.ReactNode;
}

function SegmentControl({
  options,
  value,
  onChange,
  disabled = false,
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        borderRadius: 10,
        backgroundColor: "#f0f2f5",
        padding: 3,
        gap: 2,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : undefined,
      }}
    >
      {options.map((opt) => {
        const isActive = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            disabled={disabled}
            style={{
              padding: "6px 16px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#1d232c" : "#64748b",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              boxShadow: isActive
                ? "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)"
                : "none",
              cursor: disabled ? "default" : "pointer",
              transition: "all 0.15s ease",
              lineHeight: "20px",
              whiteSpace: "nowrap",
            }}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        );
      })}
    </div>
  );
}

export function ComponentPreview({
  title,
  description,
  controls,
  render,
}: ComponentPreviewProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    for (const c of controls) {
      if (c.default !== undefined) {
        init[c.name] = c.default;
      } else if (c.type === "boolean") {
        init[c.name] = false;
      } else if (c.type === "icon") {
        init[c.name] = c.default ?? ICON_OPTIONS[0];
      } else if (c.options && c.options.length > 0) {
        init[c.name] = c.options[0];
      }
    }
    return init;
  });

  const update = (name: string, value: any) =>
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Apply setValueWhen: if a control watches the changed control, update its value
      for (const c of controls) {
        if (c.setValueWhen) {
          for (const rule of c.setValueWhen) {
            if (rule.watch === name && next[name]) {
              next[c.name] = rule.value;
            }
          }
        }
      }
      // Clear boolean controls whose requiredValue is no longer satisfied
      for (const c of controls) {
        if (c.requiredValue && next[c.name]) {
          if (next[c.requiredValue.control] !== c.requiredValue.value) {
            next[c.name] = false;
          }
        }
      }
      return next;
    });

  return (
    <div
      className="rounded-3xl border border-neutral-100 bg-card text-card-foreground dark:border-neutral-800"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)" }}
    >
      {/* Canvas */}
      <div
        className="flex min-h-[280px] items-center justify-center rounded-t-3xl p-14 transition-colors duration-200"
        style={{
          fontFamily: "var(--font-flowx)",
          background: values.inverted
            ? "#1a1f27"
            : "linear-gradient(180deg, #ffffff 0%, #f7f8f9 100%)",
          borderBottom: "1px solid",
          borderBottomColor: values.inverted ? "#374151" : "#f0f1f3",
        }}
      >
        {render((() => {
          const resolved = { ...values };
          for (const c of controls) {
            if (c.forcedOnWhen && values[c.forcedOnWhen]) {
              resolved[c.name] = true;
            }
            if (c.setValueWhen) {
              for (const rule of c.setValueWhen) {
                if (values[rule.watch]) resolved[c.name] = rule.value;
              }
            }
          }
          return resolved;
        })())}
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <div className="flex flex-wrap items-start gap-6 rounded-b-3xl px-6 py-5">
          {controls.map((c) => {
            const segmentOptions = c.type === "boolean"
              ? ["Off", "On"]
              : c.options ?? [];

            const isForcedOn = c.forcedOnWhen
              ? !!values[c.forcedOnWhen]
              : false;

            const activeRule = c.setValueWhen?.find((rule) => values[rule.watch]);

            const segmentValue = activeRule
              ? (c.type === "boolean" ? (activeRule.value ? "On" : "Off") : activeRule.value)
              : c.type === "boolean"
                ? ((isForcedOn || values[c.name]) ? "On" : "Off")
                : (values[c.name] ?? segmentOptions[0]);

            const isDisabledWhen = c.disabledWhen
              ? (c.disabledWhenValue !== undefined
                ? values[c.disabledWhen] === c.disabledWhenValue
                : !!values[c.disabledWhen])
              : false;

            const isDisabled = isForcedOn || isDisabledWhen || (c.disabledUnless
              ? !values[c.disabledUnless]
              : false);

            return (
              <div key={c.name} className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-muted-foreground capitalize">
                  {c.name}
                </span>
                {c.type === "icon" ? (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <PhosphorIcon name={segmentValue as any} size={16} />
                    <select
                      value={segmentValue}
                      disabled={isDisabled}
                      onChange={(e) => update(c.name, e.target.value)}
                      style={{
                        padding: "5px 8px",
                        borderRadius: 6,
                        border: "1px solid #e3e8ed",
                        fontSize: 13,
                        color: "#1d232c",
                        backgroundColor: "#ffffff",
                        cursor: isDisabled ? "default" : "pointer",
                        opacity: isDisabled ? 0.4 : 1,
                      }}
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <SegmentControl
                    options={segmentOptions}
                    value={segmentValue}
                    disabled={isDisabled}
                    onChange={(val) => {
                      if (c.type === "boolean") {
                        update(c.name, val === "On");
                      } else {
                        update(c.name, val);
                      }
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
