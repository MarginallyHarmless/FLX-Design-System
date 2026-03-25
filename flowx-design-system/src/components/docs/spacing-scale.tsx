import { spacingTokenList } from "@/lib/tokens";

const MAX_BAR_WIDTH = 320;

export function SpacingScale() {
  const maxPx = Math.max(...spacingTokenList.map((s) => s.valuePx), 1);

  return (
    <div className="flex flex-col gap-2">
      {spacingTokenList.map((s) => (
        <div key={s.name} className="flex items-center gap-3">
          <span className="w-44 shrink-0 font-mono text-xs text-muted-foreground">
            {s.name}
          </span>
          <div
            className="h-4 rounded-sm bg-primary/70"
            style={{
              width: `${Math.max((s.valuePx / maxPx) * MAX_BAR_WIDTH, 2)}px`,
            }}
          />
          <span className="text-xs text-muted-foreground">
            {s.valuePx}px / {s.valueRem}
          </span>
        </div>
      ))}
    </div>
  );
}
