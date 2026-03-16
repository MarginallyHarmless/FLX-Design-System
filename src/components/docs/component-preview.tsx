"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Control {
  name: string;
  options?: string[];
  type?: "boolean";
}

interface ComponentPreviewProps {
  title: string;
  description?: string;
  controls: Control[];
  render: (values: Record<string, any>) => React.ReactNode;
}

export function ComponentPreview({
  title,
  description,
  controls,
  render,
}: ComponentPreviewProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    for (const c of controls) {
      if (c.type === "boolean") {
        init[c.name] = false;
      } else if (c.options && c.options.length > 0) {
        init[c.name] = c.options[0];
      }
    }
    return init;
  });

  const update = (name: string, value: any) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      {/* Banner */}
      <div className="rounded-t-lg bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
        📐 Design reference — production uses PrimeVue / PrimeReact
      </div>

      {/* Header */}
      <div className="border-b px-4 py-3">
        <h3 className="text-base font-semibold">{title}</h3>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Canvas */}
      <div
        className="flex min-h-[200px] items-center justify-center rounded-none border-b p-8"
        style={{ fontFamily: "var(--font-flowx)", backgroundColor: "#f7f8f9" }}
      >
        {render(values)}
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <div className="flex flex-wrap items-center gap-4 px-4 py-3">
          {controls.map((c) => (
            <label
              key={c.name}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="font-medium">{c.name}</span>
              {c.type === "boolean" ? (
                <input
                  type="checkbox"
                  checked={!!values[c.name]}
                  onChange={(e) => update(c.name, e.target.checked)}
                  className="accent-primary"
                />
              ) : c.options ? (
                <select
                  value={values[c.name] ?? ""}
                  onChange={(e) => update(c.name, e.target.value)}
                  className="rounded-md border bg-background px-2 py-1 text-sm"
                >
                  {c.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : null}
            </label>
          ))}
        </div>
      )}

      {/* Code placeholder */}
      <Accordion>
        <AccordionItem value="code">
          <AccordionTrigger className="px-4 text-xs text-muted-foreground">
            View code
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <pre className="rounded-md bg-muted p-3 text-xs">
              <code>{"// Code snippet placeholder"}</code>
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
