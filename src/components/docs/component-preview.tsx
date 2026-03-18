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
  /** Name of another boolean control — when truthy, this boolean control is forced on. */
  forcedOnWhen?: string;
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
        borderRadius: 8,
        backgroundColor: "#e3e8ed",
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
              padding: "5px 14px",
              borderRadius: 6,
              border: "none",
              fontSize: 13,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#1d232c" : "#64748b",
              backgroundColor: isActive ? "#ffffff" : "transparent",
              boxShadow: isActive
                ? "0 1px 2px rgba(0,0,0,0.08)"
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
    setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      {/* Canvas */}
      <div
        className="flex min-h-[200px] items-center justify-center rounded-t-lg border-b p-8 transition-colors duration-200"
        style={{
          fontFamily: "var(--font-flowx)",
          backgroundColor: values.inverted ? "#1a1f27" : "#f7f8f9",
        }}
      >
        {render((() => {
          const resolved = { ...values };
          for (const c of controls) {
            if (c.forcedOnWhen && values[c.forcedOnWhen]) {
              resolved[c.name] = true;
            }
          }
          return resolved;
        })())}
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <div className="flex flex-wrap items-start gap-6 px-4 py-4">
          {controls.map((c) => {
            const segmentOptions = c.type === "boolean"
              ? ["Off", "On"]
              : c.options ?? [];

            const isForcedOn = c.forcedOnWhen
              ? !!values[c.forcedOnWhen]
              : false;

            const segmentValue = c.type === "boolean"
              ? ((isForcedOn || values[c.name]) ? "On" : "Off")
              : (values[c.name] ?? segmentOptions[0]);

            const isDisabled = isForcedOn || (c.disabledUnless
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

      {/* Footer */}
      <div className="rounded-b-lg px-4 py-2 text-xs text-muted-foreground" style={{ backgroundColor: "#f7f8f9" }}>
        📐 Design reference
      </div>
    </div>
  );
}
