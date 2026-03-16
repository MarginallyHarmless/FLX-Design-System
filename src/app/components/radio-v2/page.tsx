"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { radioV2Spec } from "@/lib/components-data/radio-v2";
import { getComponent } from "@/lib/components-data/registry";
import { getVariantFile } from "@/lib/components-data/radio-v2-variants";
import { Separator } from "@/components/ui/separator";
import { StatusBanner } from "@/components/docs/status-banner";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

/* ------------------------------------------------------------------ */
/*  Segmented Control                                                  */
/* ------------------------------------------------------------------ */

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="inline-flex rounded-lg border bg-muted p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              value === opt.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */

const radioTokens = [
  {
    name: "--color-primary",
    value: "Brand primary / selected ring fill (#006bd8)",
    preview: <div className="size-5 rounded-full bg-primary" />,
  },
  {
    name: "--color-destructive",
    value: "Error state border & radio fill (#eb4e33)",
    preview: <div className="size-5 rounded-full bg-destructive" />,
  },
  {
    name: "--color-input",
    value: "Unselected radio border (#cbd1db)",
    preview: <div className="size-5 rounded-full border-2 border-input" />,
  },
  {
    name: "--radius-lg",
    value: "0.5rem (input container)",
    preview: (
      <div className="size-5 rounded-lg border-2 border-foreground/30" />
    ),
  },
  {
    name: "--color-blue-50",
    value: "Selected container background (#e6f0fb)",
    preview: (
      <div className="size-5 rounded" style={{ backgroundColor: "#e6f0fb" }} />
    ),
  },
  {
    name: "--color-muted-foreground",
    value: "Disabled text color (#64748b)",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RadioV2Page() {
  const spec = radioV2Spec;

  const [selected, setSelected] = useState<"off" | "on">("off");
  const [variantState, setVariantState] = useState<
    "default" | "error" | "disabled"
  >("default");
  const [border, setBorder] = useState<"on" | "off">("on");
  const [inverted, setInverted] = useState<"off" | "on">("off");
  const [size, setSize] = useState<"medium" | "small">("medium");
  const [showLabel, setShowLabel] = useState<"on" | "off">("on");

  // Label area height at 1x: medium = 26px (24px label + 2px gap), small = 18px (16px + 2px)
  const labelClipTop = showLabel === "off" ? (size === "small" ? 18 : 26) : 0;
  const imgHeight = (size === "small" ? 46 : 62) - labelClipTop;

  const currentFile = getVariantFile(
    selected,
    variantState,
    border,
    inverted,
    size
  );

  return (
    <div className="space-y-10">
      {/* 1. Status Banner */}
      <StatusBanner
        name={spec.name}
        status={spec.status}
        figmaLink={spec.figmaLink}
        lastUpdated={spec.lastUpdated}
      />

      {/* 2. Title + Description */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {spec.description}
        </p>
      </div>

      <Separator />

      {/* 3. Interactive Variant Selector */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Preview</h2>
        <div className="flex flex-wrap gap-4">
          <SegmentedControl
            label="Selected"
            value={selected}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
            onChange={setSelected}
          />
          <SegmentedControl
            label="State"
            value={variantState}
            options={[
              { value: "default", label: "Default" },
              { value: "error", label: "Error" },
              { value: "disabled", label: "Disabled" },
            ]}
            onChange={setVariantState}
          />
          <SegmentedControl
            label="Border"
            value={border}
            options={[
              { value: "on", label: "On" },
              { value: "off", label: "Off" },
            ]}
            onChange={setBorder}
          />
          <SegmentedControl
            label="Inverted"
            value={inverted}
            options={[
              { value: "off", label: "Off" },
              { value: "on", label: "On" },
            ]}
            onChange={setInverted}
          />
          <SegmentedControl
            label="Size"
            value={size}
            options={[
              { value: "medium", label: "Medium" },
              { value: "small", label: "Small" },
            ]}
            onChange={setSize}
          />
          <SegmentedControl
            label="Label"
            value={showLabel}
            options={[
              { value: "on", label: "On" },
              { value: "off", label: "Off" },
            ]}
            onChange={setShowLabel}
          />
        </div>

        <div
          className={`flex items-center justify-center rounded-lg border p-8 ${
            inverted === "on"
              ? "bg-neutral-900 border-neutral-700"
              : "bg-white"
          }`}
        >
          {/* Images are exported at 2x; display at 1x with explicit Figma dimensions */}
          <div style={{ overflow: "hidden", height: imgHeight }}>
            <Image
              src={`/figma-exports/radio/${currentFile}`}
              alt={`Radio variant: ${currentFile.replace(".png", "")}`}
              width={174}
              height={size === "small" ? 46 : 62}
              unoptimized
              style={{ marginTop: -labelClipTop }}
            />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Selected={selected === "on" ? "On" : "Off"}, State=
          {variantState.charAt(0).toUpperCase() + variantState.slice(1)},
          Border={border === "on" ? "On" : "Off"}, Inverted=
          {inverted === "on" ? "On" : "Off"}, Size=
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </p>
      </section>

      <Separator />

      {/* 4. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      <Separator />

      {/* 6. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      <Separator />

      {/* 7. Dos and Don'ts */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      <Separator />

      {/* 8. Accessibility */}
      {spec.accessibility && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Accessibility</h2>
          <div className="space-y-4 rounded-lg border p-6">
            {spec.accessibility.role && (
              <div>
                <h3 className="text-sm font-semibold">Role</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
                    {spec.accessibility.role}
                  </code>
                </p>
              </div>
            )}

            {spec.accessibility.keyboard &&
              spec.accessibility.keyboard.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold">
                    Keyboard Interactions
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {spec.accessibility.keyboard.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <kbd className="mt-0.5 shrink-0 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono">
                          {item.split(" — ")[0]}
                        </kbd>
                        <span>{item.split(" — ")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {spec.accessibility.ariaAttributes &&
              spec.accessibility.ariaAttributes.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold">ARIA Attributes</h3>
                  <ul className="mt-2 space-y-1.5">
                    {spec.accessibility.ariaAttributes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <code className="mt-0.5 shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px]">
                          {item.split(" — ")[0]}
                        </code>
                        <span>{item.split(" — ")[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </section>
      )}

      <Separator />

      {/* 9. Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design Tokens Used</h2>
        <TokenTable tokens={radioTokens} />
      </section>

      <Separator />

      {/* 10. Related Components */}
      {spec.relatedComponents && spec.relatedComponents.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Related Components</h2>
          <div className="flex flex-wrap gap-2">
            {spec.relatedComponents.map((slug) => {
              const related = getComponent(slug);
              return related ? (
                <Link
                  key={slug}
                  href={`/components/${slug}`}
                  className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {related.name}
                </Link>
              ) : (
                <span
                  key={slug}
                  className="inline-flex items-center rounded-lg border border-dashed px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {slug}
                  <span className="ml-1.5 text-[10px] uppercase opacity-60">
                    planned
                  </span>
                </span>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
