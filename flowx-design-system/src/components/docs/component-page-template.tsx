import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ComponentSpec } from "@/lib/components-data/types";
import { getComponent } from "@/lib/components-data/registry";
import { StatusBanner } from "@/components/docs/status-banner";
import { PropsTable } from "@/components/docs/props-table";
import { AnatomyDiagram } from "@/components/docs/anatomy-diagram";
import { TokenTable } from "@/components/docs/token-table";
import { UsageGuidelinesSection } from "@/components/docs/usage-guidelines-section";

function CollapsibleSection({
  title,
  defaultOpen = true,
  tier = 2,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  tier?: 1 | 2 | 3;
  children: ReactNode;
}) {
  const headingClass = tier === 3
    ? "text-xl font-semibold text-muted-foreground"
    : "text-xl font-semibold";

  if (tier === 3) {
    return (
      <details
        className="group col-span-1 overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:border-[color:var(--flowx-blue-500)]/40 open:col-span-2 open:border-neutral-100 dark:border-neutral-800 dark:bg-neutral-900/30"
      >
        <summary
          className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-neutral-700 transition-colors group-hover:text-[color:var(--flowx-blue-500)] [&::-webkit-details-marker]:hidden dark:text-neutral-300"
        >
          <span className="flex items-center gap-2">{title}</span>
          <span className="text-neutral-300 transition-transform group-open:rotate-90 group-hover:text-[color:var(--flowx-blue-500)]">▸</span>
        </summary>
        <div className="border-t border-neutral-100 px-5 py-5 dark:border-neutral-800">{children}</div>
      </details>
    );
  }

  if (tier === 2) {
    return (
      <div
        className="overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-0.5 dark:bg-neutral-900/50"
        style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0.5px 2px rgba(0,0,0,0.02)" }}
      >
        <details className="group" open={defaultOpen || undefined}>
          <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-lg font-bold tracking-tight">{title}</span>
            <span className="text-xs text-muted-foreground transition-transform group-open:rotate-90">▸</span>
          </summary>
          <div className="border-t border-neutral-100 px-7 py-6 dark:border-neutral-800">{children}</div>
        </details>
      </div>
    );
  }

  return (
    <details className="group" open={defaultOpen || undefined}>
      <summary className={`cursor-pointer list-none ${headingClass} [&::-webkit-details-marker]:hidden`}>
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
  renderGuidelinePreview?: (props: Record<string, string>) => ReactNode;
  guidelinePreviewWidth?: string;
  useCases?: ReactNode;
  statesReference: ReactNode;
  sizes: ReactNode;
}

export function ComponentPageTemplate({
  spec,
  tokens,
  interactivePreview,
  renderGuidelinePreview,
  guidelinePreviewWidth,
  useCases,
  statesReference,
  sizes,
}: ComponentPageTemplateProps) {
  return (
    <div>
      {/* ===== TIER 1: Hero ===== */}
      <div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{spec.name}</h1>
          <div className="mt-3">
            <StatusBanner
              name={spec.name}
              status={spec.status}
              figmaLink={spec.figmaLink}
              lastUpdated={spec.lastUpdated}
            />
          </div>
          <p className="mt-3 text-lg text-muted-foreground">
            {spec.description}
          </p>
        </div>

        <div className="mt-8">{interactivePreview}</div>
      </div>

      {/* ===== TIER 2: Core Content ===== */}
      <div className="mt-16 flex flex-col gap-12">
        {spec.usageGuidelines && spec.usageGuidelines.length > 0 && renderGuidelinePreview ? (
          <CollapsibleSection title="Usage Guidelines" tier={2}>
            <UsageGuidelinesSection
              guidelines={spec.usageGuidelines}
              renderPreview={renderGuidelinePreview}
              previewWidth={guidelinePreviewWidth}
            />
          </CollapsibleSection>
        ) : spec.variants && spec.variants.length > 0 && useCases ? (
          <CollapsibleSection title="Use Cases" tier={2}>
            {useCases}
          </CollapsibleSection>
        ) : null}

        {spec.states && spec.states.length > 0 && (
          <CollapsibleSection title="States Reference" tier={2}>
            {statesReference}
          </CollapsibleSection>
        )}

        {spec.sizes && spec.sizes.length > 0 && (
          <CollapsibleSection title="Sizes" tier={2}>
            {sizes}
          </CollapsibleSection>
        )}
      </div>

      {/* ===== TIER 3: Reference ===== */}
      <div className="mt-16">
        <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Reference</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

        {spec.props && spec.props.length > 0 && (
          <CollapsibleSection title="Props" tier={3} defaultOpen={false}>
            <PropsTable props={spec.props} />
          </CollapsibleSection>
        )}

        {spec.anatomy && spec.anatomy.length > 0 && (
          <CollapsibleSection title="Anatomy" tier={3} defaultOpen={false}>
            <AnatomyDiagram anatomy={spec.anatomy} />
          </CollapsibleSection>
        )}

        {spec.realExamples && spec.realExamples.length > 0 && (
          <CollapsibleSection title="Real Examples" tier={3} defaultOpen={false}>
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
        )}

        {spec.accessibility && (
          <CollapsibleSection title="Accessibility" tier={3} defaultOpen={false}>
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
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
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

        {tokens && tokens.length > 0 && (
          <CollapsibleSection title="Design Tokens Used" tier={3} defaultOpen={false}>
            <TokenTable tokens={tokens} />
          </CollapsibleSection>
        )}

        {spec.knownExceptions && spec.knownExceptions.length > 0 && (
          <CollapsibleSection title="Known Exceptions" tier={3} defaultOpen={false}>
            <div className="space-y-3">
              {spec.knownExceptions.map((item, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{item.location}</span>
                  <span className="text-muted-foreground"> — {item.reason}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {spec.decisionLog && spec.decisionLog.length > 0 && (
          <CollapsibleSection title="Decision Log" tier={3} defaultOpen={false}>
            <div className="space-y-3">
              {spec.decisionLog.map((entry, i) => (
                <div key={i} className="text-sm">
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {entry.date}
                  </span>
                  <span className="ml-2 font-medium">{entry.decision}</span>
                  <span className="ml-1 text-muted-foreground">— {entry.reasoning}</span>
                </div>
              ))}
            </div>
          </CollapsibleSection>
        )}

        {spec.relatedComponents && spec.relatedComponents.length > 0 && (
          <CollapsibleSection title="Related Components" tier={3}>
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
                    <span className="ml-1.5 text-[10px] uppercase opacity-60">planned</span>
                  </span>
                );
              })}
            </div>
          </CollapsibleSection>
        )}
        </div>
      </div>
    </div>
  );
}
