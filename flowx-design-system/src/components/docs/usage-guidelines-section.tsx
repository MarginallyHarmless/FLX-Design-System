import type { ReactNode } from "react";
import { Check, X, Lightbulb, Warning, Info } from "@phosphor-icons/react";
import type { UsageGuideline } from "@/lib/components-data/types";

type IllustrationType = "do" | "dont" | "decision" | "exception" | "info";

const illustrationConfig: Record<IllustrationType, { bg: string; color: string; Icon: typeof Check }> = {
  do:        { bg: "var(--flowx-green-50, #e6f2ef)",  color: "var(--flowx-green-500, #008060)",  Icon: Check },
  dont:      { bg: "var(--flowx-red-50, #fde9e6)",    color: "var(--flowx-red-500, #e62200)",    Icon: X },
  decision:  { bg: "var(--flowx-blue-50, #e6f0fb)",   color: "var(--flowx-blue-500, #006bd8)",   Icon: Lightbulb },
  exception: { bg: "var(--flowx-yellow-50, #fff8e7)", color: "var(--flowx-yellow-500, #feb913)", Icon: Warning },
  info:      { bg: "#f7f8f9",                          color: "#64748b",                          Icon: Info },
};

function IllustrationPanel({ type }: { type: IllustrationType }) {
  const config = illustrationConfig[type];
  if (!config) return null;
  const { bg, color, Icon } = config;

  return (
    <div
      className="flex items-center justify-center rounded-lg p-6"
      style={{ backgroundColor: bg, minHeight: 80 }}
    >
      <Icon size={24} style={{ color }} />
    </div>
  );
}

function GuidelineRow({
  item,
  renderPreview,
  isLast,
  previewWidth = "sm:w-2/5",
}: {
  item: UsageGuideline;
  renderPreview: (props: Record<string, string>) => ReactNode;
  isLast: boolean;
  previewWidth?: string;
}) {
  const isUseCase = item.type === "use-case";

  return (
    <div
      className={`flex flex-col gap-4 py-6 sm:flex-row ${isLast ? "" : "border-b"}`}
      style={isLast ? undefined : { borderColor: "#f7f8f9" }}
    >
      {/* Left column */}
      <div className={`shrink-0 ${previewWidth}`}>
        {isUseCase ? (
          <div
            className={`flex items-center justify-center rounded-lg p-6 ${
              item.props.inverted === "on" ? "bg-neutral-900" : ""
            }`}
            style={item.props.inverted !== "on" ? { backgroundColor: "#f7f8f9" } : undefined}
          >
            {renderPreview(item.props)}
          </div>
        ) : (
          <IllustrationPanel type={item.type} />
        )}
      </div>

      {/* Right column */}
      <div className="flex flex-col justify-center gap-1">
        <p className="text-sm font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        {item.type === "decision" && item.date && (
          <span className="mt-1 font-mono text-xs text-muted-foreground">{item.date}</span>
        )}
      </div>
    </div>
  );
}

interface UsageGuidelinesSectionProps {
  guidelines: UsageGuideline[];
  renderPreview: (props: Record<string, string>) => ReactNode;
  previewWidth?: string;
}

export function UsageGuidelinesSection({ guidelines, renderPreview, previewWidth }: UsageGuidelinesSectionProps) {
  if (!guidelines || guidelines.length === 0) return null;

  return (
    <div>
      {guidelines.map((item, i) => (
        <GuidelineRow
          key={`${item.type}-${item.title}-${i}`}
          item={item}
          renderPreview={renderPreview}
          isLast={i === guidelines.length - 1}
          previewWidth={previewWidth}
        />
      ))}
    </div>
  );
}
