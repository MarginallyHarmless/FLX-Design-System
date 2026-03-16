import { SpacingScale } from "@/components/docs/spacing-scale";

export default function SpacingPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Spacing</h1>
        <p className="mt-2 text-muted-foreground">
          A consistent spacing scale ensures visual rhythm and alignment across
          all FlowX interfaces.
        </p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Spacing Scale</h2>
        <SpacingScale />
      </section>
    </div>
  );
}
