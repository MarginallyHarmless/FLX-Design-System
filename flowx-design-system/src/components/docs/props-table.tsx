import type { ComponentSpec } from "@/lib/components-data/types";

interface PropsTableProps {
  props: ComponentSpec["props"];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2.5 text-left font-semibold">Name</th>
            <th className="px-4 py-2.5 text-left font-semibold">Type</th>
            <th className="px-4 py-2.5 text-left font-semibold">Default</th>
            <th className="px-4 py-2.5 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((p, i) => (
            <tr
              key={p.name}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
            >
              <td className="px-4 py-2 font-semibold">{p.name}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                {p.type}
              </td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                {p.default ?? "—"}
              </td>
              <td className="px-4 py-2 text-muted-foreground">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
