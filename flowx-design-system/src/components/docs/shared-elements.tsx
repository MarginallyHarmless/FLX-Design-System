/* ------------------------------------------------------------------ */
/*  Shared sub-components for FlowX Design System component previews   */
/*  Single source of truth for Label, Description, and Error Icon      */
/* ------------------------------------------------------------------ */

import { WarningCircle, Info } from "@phosphor-icons/react";

export function FlowXLabel({
  label = "Label",
  size = "medium",
  inverted = false,
  disabled = false,
  showInfo = false,
  hasLabel = true,
}: {
  label?: string;
  size?: "small" | "medium";
  inverted?: boolean;
  disabled?: boolean;
  showInfo?: boolean;
  hasLabel?: boolean;
}) {
  if (!hasLabel) return null;

  const isSmall = size === "small";

  const getColor = () => {
    if (disabled) return inverted ? "#64748b" : "#8390a2";
    return inverted ? "#ffffff" : "#1d232c";
  };

  const color = getColor();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? 4 : 8,
      }}
    >
      <span
        style={{
          fontSize: isSmall ? 12 : 14,
          lineHeight: isSmall ? "16px" : "24px",
          fontWeight: 600,
          color,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
      {showInfo && (
        <Info size={16} color={color} weight="bold" style={{ flexShrink: 0 }} />
      )}
    </div>
  );
}

export function FlowXDescription({
  text,
  state = "default",
  inverted = false,
  visible = true,
}: {
  text?: string;
  state?: "default" | "error" | "disabled" | "focused";
  inverted?: boolean;
  visible?: boolean;
}) {
  if (!visible) return null;

  const isError = state === "error";
  const isDisabled = state === "disabled";

  const getColor = () => {
    if (isError) return "#e62200";
    if (isDisabled) return "#64748b";
    return inverted ? "#8390a2" : "#6b7789";
  };

  const defaultText = isError ? "Error message goes here" : "Helper text goes here";

  return (
    <span
      style={{
        fontSize: 12,
        lineHeight: "16px",
        fontWeight: 400,
        color: getColor(),
        whiteSpace: "nowrap",
      }}
    >
      {text ?? defaultText}
    </span>
  );
}

export function FlowXErrorIcon({ size = 16 }: { size?: number }) {
  return <WarningCircle size={size} color="#e62200" weight="bold" style={{ flexShrink: 0 }} />;
}

export function FlowXTooltip({
  text,
  useCase = "default",
  inverted = false,
}: {
  text?: string;
  useCase?: "default" | "error";
  inverted?: boolean;
}) {
  const isError = useCase === "error";

  const getFill = () => {
    if (isError) return inverted ? "#eb4e33" : "#e62200";
    return "#475263";
  };

  const defaultText = isError
    ? "This field is required"
    : "This is a tooltip - placeholder text";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        backgroundColor: getFill(),
      }}
    >
      <span
        style={{
          fontSize: 12,
          lineHeight: "16px",
          fontWeight: 400,
          color: "#ffffff",
          whiteSpace: "nowrap",
        }}
      >
        {text ?? defaultText}
      </span>
    </div>
  );
}
