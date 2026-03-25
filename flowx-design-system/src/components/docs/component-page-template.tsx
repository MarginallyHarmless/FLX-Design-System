import Image from "next/image";
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

function CollapsibleSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details className="group" open={defaultOpen || undefined}>
      <summary className="cursor-pointer list-none text-xl font-semibold [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <span className="text-muted-foreground transition-transform group-open:rotate-90">▸</span>
          {title}
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}

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
      <CollapsibleSection title="Interactive Preview">
        {interactivePreview}
      </CollapsibleSection>

      {separator}

      {/* 4. Use Cases */}
      {spec.variants && spec.variants.length > 0 && (
        <CollapsibleSection title="Use Cases">
          {useCases}
        </CollapsibleSection>
      )}

      {separator}

      {/* 5. States Reference */}
      {spec.states && spec.states.length > 0 && (
        <CollapsibleSection title="States Reference">
          {statesReference}
        </CollapsibleSection>
      )}

      {separator}

      {/* 6. Sizes */}
      {spec.sizes && spec.sizes.length > 0 && (
        <CollapsibleSection title="Sizes">
          {sizes}
        </CollapsibleSection>
      )}

      {separator}

      {/* 7. Usage Guidelines */}
      {spec.guidelines && (
        <CollapsibleSection title="Usage Guidelines">
          <DosAndDonts guidelines={spec.guidelines} />
        </CollapsibleSection>
      )}

      {/* 7b. Considerations */}
      {spec.considerations && spec.considerations.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Considerations">
            <ul className="space-y-2">
              {spec.considerations.map((item, i) => {
                const sep = item.indexOf(" → ");
                return (
                  <li key={i} className="text-sm text-muted-foreground">
                    {sep !== -1 ? (
                      <>
                        <span className="font-medium text-foreground">{item.slice(0, sep)}</span>
                        {" → "}{item.slice(sep + 3)}
                      </>
                    ) : item}
                  </li>
                );
              })}
            </ul>
          </CollapsibleSection>
        </>
      )}

      {separator}

      {/* 8. Props Table — collapsed by default */}
      {spec.props && spec.props.length > 0 && (
        <CollapsibleSection title="Props" defaultOpen={false}>
          <PropsTable props={spec.props} />
        </CollapsibleSection>
      )}

      {separator}

      {/* 9. Anatomy Diagram — collapsed by default */}
      {spec.anatomy && spec.anatomy.length > 0 && (
        <CollapsibleSection title="Anatomy" defaultOpen={false}>
          <AnatomyDiagram anatomy={spec.anatomy} />
        </CollapsibleSection>
      )}

      {/* 10. Real Examples */}
      {spec.realExamples && spec.realExamples.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Real Examples">
            <div className="space-y-6">
              {spec.realExamples.map((example, i) => (
                <div key={i} className="space-y-2">
                  <div className="overflow-hidden rounded-lg border">
                    <Image
                      src={example.src}
                      alt={example.alt}
                      width={800}
                      height={450}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {example.annotation}
                  </p>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}

      {separator}

      {/* 12. Accessibility — collapsed by default */}
      {spec.accessibility && (
        <CollapsibleSection title="Accessibility" defaultOpen={false}>
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
        </CollapsibleSection>
      )}

      {separator}

      {/* 11. Design Tokens — collapsed by default */}
      {tokens && tokens.length > 0 && (
        <CollapsibleSection title="Design Tokens Used" defaultOpen={false}>
          <TokenTable tokens={tokens} />
        </CollapsibleSection>
      )}

      {/* 14. Known Exceptions */}
      {spec.knownExceptions && spec.knownExceptions.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Known Exceptions">
            <div className="space-y-3">
              {spec.knownExceptions.map((item, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{item.location}</span>
                  <span className="text-muted-foreground"> — {item.reason}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}

      {/* 15. Decision Log */}
      {spec.decisionLog && spec.decisionLog.length > 0 && (
        <>
          {separator}
          <CollapsibleSection title="Decision Log">
            <div className="space-y-3">
              {spec.decisionLog.map((entry, i) => (
                <div key={i} className="text-sm">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className="ml-2 font-medium">{entry.decision}</span>
                  <span className="ml-1 text-muted-foreground">
                    — {entry.reasoning}
                  </span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        </>
      )}

      {separator}

      {/* 16. Related Components */}
      {spec.relatedComponents && spec.relatedComponents.length > 0 && (
        <CollapsibleSection title="Related Components">
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
        </CollapsibleSection>
      )}
    </div>
  );
}
