import type { ComponentSpec } from "@/lib/components-data/types";

interface AnatomyDiagramProps {
  anatomy: ComponentSpec["anatomy"];
}

export function AnatomyDiagram({ anatomy }: AnatomyDiagramProps) {
  if (!anatomy || anatomy.length === 0) return null;

  return (
    <ol className="flex flex-col gap-3">
      {anatomy.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {i + 1}
          </span>
          <div>
            <span className="text-sm font-semibold">{item.part}</span>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
