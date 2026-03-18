"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  FlowXLabel,
  FlowXDescription,
  FlowXErrorIcon,
} from "@/components/docs/shared-elements";

/* ------------------------------------------------------------------ */
/*  Props table helper                                                 */
/* ------------------------------------------------------------------ */

function PropsTable({
  rows,
}: {
  rows: { name: string; type: string; default: string; description: string }[];
}) {
  const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "8px 12px",
    fontSize: 13,
    fontWeight: 600,
    color: "#1d232c",
    borderBottom: "2px solid #e3e8ed",
  };
  const tdStyle: React.CSSProperties = {
    padding: "8px 12px",
    fontSize: 13,
    color: "#475263",
    borderBottom: "1px solid #f0f2f5",
    verticalAlign: "top",
  };
  const codeStyle: React.CSSProperties = {
    fontSize: 12,
    fontFamily: "monospace",
    backgroundColor: "#f0f2f5",
    padding: "2px 6px",
    borderRadius: 4,
  };

  return (
    <div style={{ overflowX: "auto", marginTop: 16 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Prop</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Default</th>
            <th style={thStyle}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td style={tdStyle}>
                <code style={codeStyle}>{r.name}</code>
              </td>
              <td style={tdStyle}>
                <code style={codeStyle}>{r.type}</code>
              </td>
              <td style={tdStyle}>
                <code style={codeStyle}>{r.default}</code>
              </td>
              <td style={tdStyle}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      <section>
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

        <PropsTable
          rows={[
            {
              name: "label",
              type: "string",
              default: '"Label"',
              description: "The text content of the label.",
            },
            {
              name: "size",
              type: '"small" | "medium"',
              default: '"medium"',
              description:
                "Controls font size (12/14px) and line-height (16/24px).",
            },
            {
              name: "inverted",
              type: "boolean",
              default: "false",
              description: "White text for use on dark backgrounds.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description:
                "Applies muted color to indicate a disabled field.",
            },
            {
              name: "showInfo",
              type: "boolean",
              default: "false",
              description:
                "Shows a small info circle icon next to the label text.",
            },
          ]}
        />
      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* ============================================================ */}
      {/*  Description                                                  */}
      {/* ============================================================ */}
      <section>
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

        <PropsTable
          rows={[
            {
              name: "text",
              type: "string",
              default: "(auto)",
              description:
                'Custom text. Defaults to "Helper text goes here" or "Error message goes here" when in error state.',
            },
            {
              name: "state",
              type: '"default" | "error" | "disabled" | "focused"',
              default: '"default"',
              description:
                "Controls color: red for error, muted for disabled, neutral otherwise.",
            },
            {
              name: "inverted",
              type: "boolean",
              default: "false",
              description: "Lighter color for use on dark backgrounds.",
            },
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description:
                "When false the component renders nothing.",
            },
          ]}
        />
      </section>

      <hr style={{ borderColor: "#f7f8f9" }} />

      {/* ============================================================ */}
      {/*  Error Icon                                                   */}
      {/* ============================================================ */}
      <section>
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

        <PropsTable
          rows={[
            {
              name: "size",
              type: "number",
              default: "16",
              description:
                "Width and height of the SVG icon in pixels.",
            },
          ]}
        />
      </section>
    </div>
  );
}
