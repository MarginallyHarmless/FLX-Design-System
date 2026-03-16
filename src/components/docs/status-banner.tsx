import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface StatusBannerProps {
  name: string;
  status: "stable" | "beta" | "deprecated" | "planned";
  figmaLink?: string;
  lastUpdated?: string;
}

const statusConfig: Record<
  StatusBannerProps["status"],
  { label: string; className: string }
> = {
  stable: {
    label: "Stable",
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  beta: {
    label: "Beta",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  deprecated: {
    label: "Deprecated",
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  planned: {
    label: "Planned",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

export function StatusBanner({
  name,
  status,
  figmaLink,
  lastUpdated,
}: StatusBannerProps) {
  const config = statusConfig[status];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted/40 px-4 py-2.5 text-sm">
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>

      {figmaLink && (
        <a
          href={figmaLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="size-3" />
          Figma
        </a>
      )}

      {lastUpdated && (
        <span className="text-xs text-muted-foreground">
          Updated {lastUpdated}
        </span>
      )}
    </div>
  );
}
