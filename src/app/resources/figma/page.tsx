export default function FigmaResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Figma Resources</h1>
        <p className="mt-2 text-muted-foreground">
          Access the FlowX Design System Figma file containing all components,
          tokens, and design guidelines needed to create consistent product
          interfaces.
        </p>
      </div>

      <div className="rounded-lg border p-6 space-y-3">
        <h2 className="text-lg font-semibold">FlowX Design System — Figma Library</h2>
        <p className="text-sm text-muted-foreground">
          The Figma library includes all production components, colour styles,
          typography scales, and spacing tokens. Enable it as a team library to
          stay in sync with the latest updates.
        </p>
        <p className="text-sm text-muted-foreground italic">
          Figma link coming soon.
        </p>
      </div>
    </div>
  );
}
