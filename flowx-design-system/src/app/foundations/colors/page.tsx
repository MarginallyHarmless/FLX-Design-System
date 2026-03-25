"use client";

import { ColorPalette } from "@/components/docs/color-palette";
import { TokenTable } from "@/components/docs/token-table";
import { colorPalettes, colorTokenList } from "@/lib/tokens";

export default function ColorsPage() {
  const tokenRows = colorTokenList.map((t) => ({
    name: t.name,
    value: t.value,
    preview: (
      <div
        className="size-6 rounded border border-black/10"
        style={{ backgroundColor: t.value }}
      />
    ),
  }));

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="mt-2 text-muted-foreground">
          The FlowX color system provides a comprehensive palette for building
          consistent, accessible interfaces.
        </p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Color Palettes</h2>
        <ColorPalette palettes={colorPalettes} />
      </section>

      <section>
        <h2 className="mb-6 text-xl font-semibold">Color Tokens</h2>
        <TokenTable tokens={tokenRows} />
      </section>
    </div>
  );
}
