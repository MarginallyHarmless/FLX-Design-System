"use client";

import { useState } from "react";

interface ColorPaletteProps {
  palettes: Record<string, Record<string | number, string>>;
}

function Swatch({ shade, hex }: { shade: string; hex: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex flex-col items-center gap-1"
      title={`Copy ${hex}`}
    >
      <div
        className="size-12 rounded-md border border-black/10 transition-transform group-hover:scale-110"
        style={{ backgroundColor: hex }}
      />
      <span className="text-[10px] font-medium text-muted-foreground">
        {shade}
      </span>
      <span className="text-[10px] text-muted-foreground transition-opacity">
        {copied ? "Copied!" : hex}
      </span>
    </button>
  );
}

export function ColorPalette({ palettes }: ColorPaletteProps) {
  return (
    <div className="flex flex-col gap-8">
      {Object.entries(palettes).map(([name, shades]) => (
        <div key={name}>
          <h3 className="mb-3 text-sm font-semibold capitalize">{name}</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(shades).map(([shade, hex]) => (
              <Swatch key={shade} shade={String(shade)} hex={hex} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
