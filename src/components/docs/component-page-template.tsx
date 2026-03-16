import Link from "next/link";
import type { ReactNode } from "react";
import type { ComponentSpec } from "@/lib/components-data/types";
import { getComponent } from "@/lib/components-data/registry";
import { StatusBanner } from "@/components/docs/status-banner";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { DosAndDonts } from "@/components/docs/dos-and-donts";
import { TokenTable } from "@/components/docs/token-table";

const separator = <hr style={{ borderColor: "#f7f8f9" }} />;

interface ComponentPageTemplateProps {
  spec: ComponentSpec;
  tokens: { name: string; value: string; preview: ReactNode }[];
  interactivePreview: ReactNode;
  useCases: ReactNode;
  statesReference: ReactNode;
  sizes: ReactNode;
}

export function ComponentPageTemplate({
  spec,
  tokens,
  interactivePreview,
  useCases,
  statesReference,
  sizes,
}: ComponentPageTemplateProps) {
  return (
    <div className="space-y-10">
      {/* 1. Title + Status + Description */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
        <div className="mt-2">
          <StatusBanner
            name={spec.name}
            status={spec.status}
            figmaLink={spec.figmaLink}
            lastUpdated={spec.lastUpdated}
          />
        </div>
        <p className="mt-2 text-lg text-muted-foreground">
          {spec.description}
        </p>
      </div>

      {separator}

      {/* 3. Interactive Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Interactive Preview</h2>
        {interactivePreview}
      </section>

      {separator}

      {/* 4. Use Cases */}
      {spec.variants && spec.variants.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Use Cases</h2>
          {useCases}
        </section>
      )}

      {separator}

      {/* 5. States Reference */}
      {spec.states && spec.states.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">States Reference</h2>
          {statesReference}
        </section>
      )}

      {separator}

      {/* 6. Sizes */}
      {spec.sizes && spec.sizes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          {sizes}
        </section>
      )}

      {separator}

      {/* 7. Props Table */}
      {spec.props && spec.props.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable props={spec.props} />
        </section>
      )}

      {separator}

      {/* 8. Anatomy Diagram */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Anatomy</h2>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </section>
      )}

      {separator}

      {/* 9. Usage Guidelines */}
      {spec.guidelines && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Usage Guidelines</h2>
          <DosAndDonts guidelines={spec.guidelines} />
        </section>
      )}

      {separator}

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

      {separator}

      {/* 11. Design Tokens */}
      {tokens && tokens.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Design Tokens Used</h2>
          <TokenTable tokens={tokens} />
        </section>
      )}

      {separator}

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
