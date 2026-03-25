import { Check, X } from "@phosphor-icons/react";
import type { ComponentSpec } from "@/lib/components-data/types";

interface DosAndDontsProps {
  guidelines: ComponentSpec["guidelines"];
}

export function DosAndDonts({ guidelines }: DosAndDontsProps) {
  if (!guidelines) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Do column */}
      <div className="rounded-lg border" style={{ borderColor: "var(--flowx-green-100, #b0d8ce)" }}>
        <div className="flex items-center gap-2 rounded-t-lg px-4 py-2.5" style={{ backgroundColor: "var(--flowx-green-50, #e6f2ef)" }}>
          <Check size={16} style={{ color: "var(--flowx-green-500, #008060)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--flowx-green-500, #008060)" }}>
            Do
          </span>
        </div>
        <ul className="flex flex-col gap-2 px-4 py-3">
          {guidelines.do.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check size={14} className="mt-0.5 shrink-0" style={{ color: "var(--flowx-green-500, #008060)" }} />
              {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Don't column */}
      <div className="rounded-lg border" style={{ borderColor: "var(--flowx-red-100, #f7bab0)" }}>
        <div className="flex items-center gap-2 rounded-t-lg px-4 py-2.5" style={{ backgroundColor: "var(--flowx-red-50, #fde9e6)" }}>
          <X size={16} style={{ color: "var(--flowx-red-500, #e62200)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--flowx-red-500, #e62200)" }}>
            Don&apos;t
          </span>
        </div>
        <ul className="flex flex-col gap-2 px-4 py-3">
          {guidelines.dont.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <X size={14} className="mt-0.5 shrink-0" style={{ color: "var(--flowx-red-500, #e62200)" }} />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
