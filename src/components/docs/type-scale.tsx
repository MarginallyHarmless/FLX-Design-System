import { textStyles, fontFamily } from "@/lib/tokens";

export function TypeScale() {
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(textStyles).map(([key, style]) => (
        <div key={key} className="flex flex-col gap-1 border-b pb-4 last:border-b-0">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-xs font-semibold text-muted-foreground">
              {style.label}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {style.fontSize}px / {style.lineHeight}px / {style.fontWeight}
            </span>
          </div>
          <p
            style={{
              fontFamily: `var(--font-flowx), '${fontFamily}', sans-serif`,
              fontSize: `${style.fontSize}px`,
              lineHeight: `${style.lineHeight}px`,
              fontWeight: style.fontWeight,
            }}
          >
            The quick brown fox jumps over the lazy dog
          </p>
        </div>
      ))}
    </div>
  );
}
