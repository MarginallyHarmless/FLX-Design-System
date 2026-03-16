import { TypeScale } from "@/components/docs/type-scale";
import { TokenTable } from "@/components/docs/token-table";
import { typographyPrimitives } from "@/lib/tokens";

export default function TypographyPage() {
  const primitiveRows = [
    ...Object.entries(typographyPrimitives.fontSizes).map(([key, val]) => ({
      name: `font-size-${key}`,
      value: `${val}px`,
    })),
    ...Object.entries(typographyPrimitives.lineHeights).map(([key, val]) => ({
      name: `line-height-${key}`,
      value: `${val}px`,
    })),
    ...Object.entries(typographyPrimitives.weights).map(([key, val]) => ({
      name: `font-weight-${key}`,
      value: String(val),
    })),
  ];

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Typography</h1>
        <p className="mt-2 text-muted-foreground">
          FlowX uses Open Sans as its primary typeface across all product
          interfaces.
        </p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Type Scale</h2>
        <TypeScale />
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Primitives Reference</h2>
        <TokenTable tokens={primitiveRows} />
      </section>
    </div>
  );
}
