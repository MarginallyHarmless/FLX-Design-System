"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  FlowXLabel,
  FlowXDescription,
  FlowXErrorIcon,
  FlowXTooltip,
} from "@/components/docs/shared-elements";

export default function UtilitiesPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-10 px-6 py-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Utilities</h1>
        <p className="mt-2 text-muted-foreground">
          Shared sub-components used across multiple design system components.
          Changes here propagate to all component previews.
        </p>
      </div>

      {/* ============================================================ */}
      {/*  Label                                                        */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Label</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A shared label element rendered above input fields, checkboxes, and
          other form components.
        </p>

        <div className="mt-4">
          <ComponentPreview
            title="Label"
            description="Explore size, inverted, disabled, and info icon options."
            controls={[
              { name: "size", options: ["small", "medium"] },
              { name: "inverted", type: "boolean" },
              { name: "disabled", type: "boolean" },
              { name: "showInfo", type: "boolean" },
            ]}
            render={(values) => (
              <div style={{ fontFamily: "var(--font-flowx)" }}>
                <FlowXLabel
                  size={(values.size as "small" | "medium") || "medium"}
                  inverted={values.inverted === true}
                  disabled={values.disabled === true}
                  showInfo={values.showInfo === true}
                />
              </div>
            )}
          />
        </div>


      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* ============================================================ */}
      {/*  Description                                                  */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Helper or error text displayed beneath form components.
        </p>

        <div className="mt-4">
          <ComponentPreview
            title="Description"
            description="Toggle state, inverted mode, and visibility."
            controls={[
              { name: "state", options: ["default", "error", "disabled"] },
              { name: "inverted", type: "boolean" },
              { name: "visible", type: "boolean", default: true },
            ]}
            render={(values) => (
              <div style={{ fontFamily: "var(--font-flowx)" }}>
                <FlowXDescription
                  state={
                    (values.state as
                      | "default"
                      | "error"
                      | "disabled") || "default"
                  }
                  inverted={values.inverted === true}
                  visible={values.visible !== false}
                />
              </div>
            )}
          />
        </div>


      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* ============================================================ */}
      {/*  Tooltip                                                      */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Tooltip</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A compact pill overlay used for contextual hints and inline error
          messages. Background color shifts by use case and inverted mode.
        </p>

        <div className="mt-4">
          <ComponentPreview
            title="Tooltip"
            description="Toggle use case and inverted mode."
            controls={[
              { name: "useCase", options: ["default", "error"] },
              { name: "inverted", type: "boolean" },
            ]}
            render={(values) => (
              <div style={{ fontFamily: "var(--font-flowx)" }}>
                <FlowXTooltip
                  useCase={
                    (values.useCase as "default" | "error") || "default"
                  }
                  inverted={values.inverted === true}
                />
              </div>
            )}
          />
        </div>

        {/* Usage Guidelines */}
        <div>
          <h3 className="text-base font-semibold">Usage Guidelines</h3>

          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-stretch">
            {/* Preview */}
            <div className="flex shrink-0 sm:w-2/5">
              <div
                className="flex w-full items-center justify-center rounded-lg p-6"
                style={{ backgroundColor: "#f7f8f9" }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/tooltip-positioning.png`}
                  alt="Tooltip positioning priority"
                  style={{ maxWidth: 260 }}
                />
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-medium">Positioning</p>
              <p className="text-sm text-muted-foreground">
                Place the tooltip where there is available space, following this
                priority: above the hovered element, then below, then left or
                right.
              </p>
            </div>
          </div>

          {/* Timing — info points */}
          <div
            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-stretch border-t"
            style={{ borderColor: "#f7f8f9" }}
          >
            <div className="flex shrink-0 sm:w-2/5">
              <div
                className="flex w-full items-center justify-center rounded-lg p-6"
                style={{ backgroundColor: "#f7f8f9" }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/tooltip-delay-info.png`}
                  alt="Tooltip on info point"
                  style={{ maxWidth: 260 }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-medium">Timing for info points</p>
              <p className="text-sm text-muted-foreground">
                Show delay: 300 ms. Hide delay: 300 ms. Keep the tooltip visible
                while the cursor is hovering over it.
              </p>
            </div>
          </div>

          {/* Timing — other elements */}
          <div
            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-stretch border-t"
            style={{ borderColor: "#f7f8f9" }}
          >
            <div className="flex shrink-0 sm:w-2/5">
              <div
                className="flex w-full items-center justify-center rounded-lg p-6"
                style={{ backgroundColor: "#f7f8f9" }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/tooltip-delay-other.png`}
                  alt="Tooltip on other elements"
                  style={{ maxWidth: 140 }}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-medium">Timing for other elements</p>
              <p className="text-sm text-muted-foreground">
                Show delay: 1500 ms. Hide delay: 300 ms. Keep the tooltip
                visible while the cursor is hovering over it.
              </p>
            </div>
          </div>

          {/* Size constraints */}
          <div
            className="flex flex-col gap-4 py-6 sm:flex-row sm:items-stretch border-t"
            style={{ borderColor: "#f7f8f9" }}
          >
            <div className="flex shrink-0 sm:w-2/5">
              <div
                className="flex w-full items-center justify-center rounded-lg p-6"
                style={{ backgroundColor: "#f7f8f9", fontFamily: "var(--font-flowx)" }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: 8,
                    borderRadius: 8,
                    backgroundColor: "#475263",
                    maxWidth: 240,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      lineHeight: "16px",
                      fontWeight: 400,
                      color: "#ffffff",
                      whiteSpace: "normal",
                    }}
                  >
                    Assign this task to a team member before moving it to the review stage
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-sm font-medium">Size constraints</p>
              <p className="text-sm text-muted-foreground">
                Keep tooltips under 500 px wide and no taller than 5 lines of
                text. If you need more space, consider using a popover instead.
              </p>
            </div>
          </div>
        </div>

      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* ============================================================ */}
      {/*  Error Icon                                                   */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Error Icon</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A 16px circle-exclamation SVG rendered in error states. Always uses{" "}
          <code
            style={{
              fontSize: 12,
              fontFamily: "monospace",
              backgroundColor: "#f0f2f5",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            #e62200
          </code>
          .
        </p>

        <div
          className="mt-4 flex min-h-[120px] items-center justify-center rounded-lg border"
          style={{
            backgroundColor: "#f7f8f9",
            fontFamily: "var(--font-flowx)",
          }}
        >
          <div className="flex items-center gap-4">
            <FlowXErrorIcon />
            <span
              style={{
                fontSize: 13,
                color: "#6b7789",
              }}
            >
              FlowXErrorIcon (16 x 16)
            </span>
          </div>
        </div>


      </section>
    </div>
  );
}
