"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  FlowXLabel,
  FlowXDescription,
  FlowXErrorIcon,
  FlowXTooltip,
} from "@/components/docs/shared-elements";
/* ------------------------------------------------------------------ */
/*  Consideration item                                                 */
/* ------------------------------------------------------------------ */

function Consideration({ text }: { text: string }) {
  const sep = text.indexOf(" → ");
  return (
    <li className="text-sm text-muted-foreground">
      {sep !== -1 ? (
        <>
          <span className="font-medium text-foreground">{text.slice(0, sep)}</span>
          {" → "}{text.slice(sep + 3)}
        </>
      ) : text}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

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

        <div>
          <h3 className="text-base font-semibold">Considerations</h3>
          <ul className="mt-3 space-y-2">
            <Consideration text="[placeholder] When a form field is required → show the label; never rely on placeholder alone to communicate what the field is for." />
            <Consideration text="[placeholder] When using the info icon → pair it with a tooltip; the icon alone doesn't communicate what additional context is available." />
            <Consideration text="[placeholder] When multiple labels stack vertically in a form → keep all labels the same size to maintain visual alignment." />
          </ul>
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

        <div>
          <h3 className="text-base font-semibold">Considerations</h3>
          <ul className="mt-3 space-y-2">
            <Consideration text="[placeholder] When a field enters error state → always show the description with error text; hiding it forces the user to guess what went wrong." />
            <Consideration text="[placeholder] When helper text is generic (e.g. 'Enter a value') → omit the description entirely; it adds noise without helping the user." />
            <Consideration text="[placeholder] When the field is disabled → keep the description visible if it explains why the field is locked." />
          </ul>
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

        <div>
          <h3 className="text-base font-semibold">Considerations</h3>
          <ul className="mt-3 space-y-2">
            <Consideration text="[placeholder] When using the error variant on a dark surface → enable inverted mode; the default red is too dark to read against dark backgrounds." />
            <Consideration text="[placeholder] When tooltip text exceeds ~40 characters → consider using a popover or inline message instead; long tooltips are hard to read in the pill format." />
          </ul>
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

        <div>
          <h3 className="text-base font-semibold">Considerations</h3>
          <ul className="mt-3 space-y-2">
            <Consideration text="[placeholder] When placing the error icon next to a field → position it outside the input container, not inside; it should not compete with the field content." />
            <Consideration text="[placeholder] When the error icon appears alongside error text → the icon is redundant as a standalone indicator; the text already communicates the error." />
          </ul>
        </div>

      </section>
    </div>
  );
}
