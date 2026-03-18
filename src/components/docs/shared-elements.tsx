/* ------------------------------------------------------------------ */
/*  Shared sub-components for FlowX Design System component previews   */
/*  Single source of truth for Label, Description, and Error Icon      */
/* ------------------------------------------------------------------ */

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
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ flexShrink: 0 }}
        >
          <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1" />
          <path d="M8 7V11" stroke={color} strokeWidth="1" strokeLinecap="round" />
          <circle cx="8" cy="5" r="0.75" fill={color} />
        </svg>
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
  return (
    <svg
      width={size}
      height={size}
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
  );
}
