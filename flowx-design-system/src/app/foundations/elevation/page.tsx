import { shadowLevels } from "@/lib/tokens";

export default function ElevationPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Elevation</h1>
        <p className="mt-2 text-muted-foreground">
          Shadow tokens create depth and visual hierarchy in the FlowX
          interface.
        </p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Shadow Levels</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shadowLevels.map((level) => (
            <div
              key={level.name}
              className="flex flex-col gap-3 rounded-xl border bg-card p-6"
              style={{ boxShadow: level.css }}
            >
              <span className="text-sm font-semibold">
                shadow-{level.name}
              </span>
              <code className="text-xs text-muted-foreground break-all">
                {level.css}
              </code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
