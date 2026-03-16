export const fontFamily = "Open Sans" as const;

export const textStyles = {
  "xs-regular":   { fontSize: 10, lineHeight: 12, fontWeight: 400, label: "XS / Regular" },
  "xs-semibold":  { fontSize: 10, lineHeight: 12, fontWeight: 600, label: "XS / Semibold" },
  "xs-bold":      { fontSize: 10, lineHeight: 12, fontWeight: 700, label: "XS / Bold" },
  "s-regular":    { fontSize: 12, lineHeight: 16, fontWeight: 400, label: "S (Caption) / Regular" },
  "s-semibold":   { fontSize: 12, lineHeight: 16, fontWeight: 600, label: "S (Caption) / Semibold" },
  "s-bold":       { fontSize: 12, lineHeight: 16, fontWeight: 700, label: "S (Caption) / Bold" },
  "m-regular":    { fontSize: 14, lineHeight: 24, fontWeight: 400, label: "M (P1) / Regular" },
  "m-semibold":   { fontSize: 14, lineHeight: 24, fontWeight: 600, label: "M (P1) / Semibold" },
  "m-bold":       { fontSize: 14, lineHeight: 24, fontWeight: 700, label: "M (P1) / Bold" },
  "l-regular":    { fontSize: 18, lineHeight: 28, fontWeight: 400, label: "L (P3) / Regular" },
  "l-bold":       { fontSize: 18, lineHeight: 28, fontWeight: 700, label: "L (P3) / Bold" },
  "xxl-bold":     { fontSize: 24, lineHeight: 38, fontWeight: 700, label: "XXL / Bold" },
  "xxxl-bold":    { fontSize: 72, lineHeight: 108, fontWeight: 700, label: "XXXL (Display 1) / Bold" },
} as const;

export const typographyPrimitives = {
  fontSizes: { xs: 10, s: 12, m: 14, l: 18, xl: 24, xxl: 40, xxxl: 72 },
  lineHeights: { 12: 12, 16: 16, 18: 18, 22: 22, 24: 24, 28: 28, 38: 38, xxl: 60, xxxl: 108 },
  weights: { regular: 400, semibold: 600, bold: 700, extrabold: 900 },
} as const;
