"use client";

import Link from "next/link";
import { checkboxSpec } from "@/lib/components-data/checkbox";
import { getComponent } from "@/lib/components-data/registry";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { StatusBanner } from "@/components/docs/status-banner";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

const checkboxTokens = [
  {
    name: "--color-primary",
    value: "Brand primary / checked fill",
    preview: <div className="size-5 rounded bg-primary" />,
  },
  {
    name: "--color-destructive",
    value: "Error state border & ring",
    preview: <div className="size-5 rounded bg-destructive" />,
  },
  {
    name: "--color-input",
    value: "Unchecked border color",
    preview: <div className="size-5 rounded border-2 border-input" />,
  },
  {
    name: "--radius-sm",
    value: "0.25rem (checkbox icon)",
    preview: (
      <div className="size-5 rounded-sm border-2 border-foreground/30" />
    ),
  },
  {
    name: "--radius-lg",
    value: "0.5rem (input container)",
    preview: (
      <div className="size-5 rounded-lg border-2 border-foreground/30" />
    ),
  },
  {
    name: "--color-muted-foreground",
    value: "Secondary text (prefix/suffix)",
    preview: <div className="size-5 rounded bg-muted-foreground" />,
  },
];

export default function CheckboxPage() {
  const spec = checkboxSpec;

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

      {/* 3. Interactive Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Preview</h2>
        <ComponentPreview
          title="Checkbox"
          description="Explore different states, sizes, and options."
          controls={[
            {
              name: "checked",
              type: "boolean",
            },
            {
              name: "state",
              options: ["default", "error", "disabled"],
            },
            {
              name: "size",
              options: ["small", "medium"],
            },
            {
              name: "border",
              type: "boolean",
            },
          ]}
          render={(values) => (
            <div
              className={`inline-flex items-center gap-3 rounded-lg px-4 py-3 ${
                values.border !== false ? "border" : ""
              }`}
            >
              <Checkbox
                checked={values.checked}
                disabled={values.state === "disabled"}
                aria-invalid={values.state === "error" ? true : undefined}
                className={
                  values.size === "small" ? "size-3.5 [&>svg]:size-3" : ""
                }
              />
              <Label
                className={`${
                  values.state === "disabled"
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                } ${values.size === "small" ? "text-sm" : ""}`}
              >
                Checkbox label
              </Label>
            </div>
          )}
        />
      </section>

      <Separator />

      {/* 4. Variants */}
      {spec.variants && spec.variants.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Variants</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spec.variants.map((v) => (
              <div
                key={v.name}
                className={`flex flex-col items-center gap-3 rounded-lg p-6 ${
                  v.props.inverted === "on"
                    ? "border border-neutral-700 bg-neutral-900 text-white"
                    : "border"
                }`}
              >
                <div
                  className={`inline-flex items-center gap-3 rounded-lg px-4 py-3 ${
                    v.props.border === "on" ? "border" : ""
                  } ${v.props.inverted === "on" ? "border-neutral-600" : ""}`}
                >
                  <Checkbox
                    checked={v.props.selected === "on"}
                    disabled={v.props.state === "disabled"}
                    aria-invalid={
                      v.props.state === "error" ? true : undefined
                    }
                  />
                  <span
                    className={`text-sm ${
                      v.props.state === "disabled" ? "opacity-50" : ""
                    }`}
                  >
                    {v.name}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">{v.name}</p>
                  {v.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {v.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* 5. States */}
      {spec.states && spec.states.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">States</h2>
          <div className="flex flex-wrap items-center gap-4">
            {spec.states.map((state) => (
              <div key={state} className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                  <Checkbox
                    checked={state === "default" || state === "focus"}
                    disabled={state === "disabled"}
                    aria-invalid={state === "error" ? true : undefined}
                    className={
                      state === "hover"
                        ? "border-primary/60"
                        : state === "focus"
                          ? "border-ring ring-3 ring-ring/50"
                          : undefined
                    }
                  />
                  <span
                    className={`text-sm ${state === "disabled" ? "opacity-50" : ""}`}
                  >
                    {state.charAt(0).toUpperCase() + state.slice(1)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{state}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* 6. Sizes */}
      {spec.sizes && spec.sizes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <div className="flex flex-wrap items-end gap-4">
            {spec.sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border px-3 py-2">
                  <Checkbox
                    checked
                    className={
                      size === "small" ? "size-3.5 [&>svg]:size-3" : ""
                    }
                  />
                  <span className={size === "small" ? "text-sm" : ""}>
                    Size {size}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{size}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <Separator />

      {/* 7. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      <Separator />

      {/* 8. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      <Separator />

      {/* 9. Dos and Don'ts */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      <Separator />

      {/* 10. Accessibility */}
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

            {spec.accessibility.keyboard && spec.accessibility.keyboard.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold">Keyboard Interactions</h3>
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

            {spec.accessibility.ariaAttributes && spec.accessibility.ariaAttributes.length > 0 && (
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

      {/* 11. Design Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Design Tokens Used</h2>
        <TokenTable tokens={checkboxTokens} />
      </section>

      <Separator />

      {/* 12. Related Components */}
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
