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
      <div className="rounded-lg border border-green-200 dark:border-green-900">
        <div className="flex items-center gap-2 rounded-t-lg bg-green-50 px-4 py-2.5 dark:bg-green-900/30">
          <Check size={16} className="text-green-600 dark:text-green-400" />
          <span className="text-sm font-semibold text-green-700 dark:text-green-400">
            Do
          </span>
        </div>
        <ul className="flex flex-col gap-2 px-4 py-3">
          {guidelines.do.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check size={14} className="mt-0.5 shrink-0 text-green-500" />
              {item.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Don't column */}
      <div className="rounded-lg border border-red-200 dark:border-red-900">
        <div className="flex items-center gap-2 rounded-t-lg bg-red-50 px-4 py-2.5 dark:bg-red-900/30">
          <X size={16} className="text-red-600 dark:text-red-400" />
          <span className="text-sm font-semibold text-red-700 dark:text-red-400">
            Don&apos;t
          </span>
        </div>
        <ul className="flex flex-col gap-2 px-4 py-3">
          {guidelines.dont.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <X size={14} className="mt-0.5 shrink-0 text-red-500" />
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
