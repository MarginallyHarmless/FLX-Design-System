import type { ComponentSpec, ElementSpec, ElementStyle, VariantStyle } from "./types";

/**
 * Find the VariantStyle entry matching the given variant props.
 * Returns undefined if no exact match is found.
 */
export function findVariantStyle(
  spec: ComponentSpec,
  props: Record<string, string>
): VariantStyle | undefined {
  return spec.variantStyles?.find((vs) =>
    Object.entries(props).every(
      ([key, value]) => vs.variantProps[key] === value
    )
  );
}

/**
 * Get the ElementSpec (layout/dimensions/typography) for a named element.
 */
export function getElementSpec(
  spec: ComponentSpec,
  part: string
): ElementSpec | undefined {
  return spec.elements?.find((e) => e.part === part);
}

/**
 * Get the resolved style for a specific element within a specific variant.
 * Returns the ElementStyle with fill/stroke/textColor etc for that variant.
 */
export function getElementStyle(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): ElementStyle | undefined {
  const vs = findVariantStyle(spec, variantProps);
  return vs?.elements[elementPart];
}

/**
 * Build a CSS-ready inline style object for an element, combining
 * base layout/dimensions from ElementSpec with variant-specific
 * colors/visibility from VariantStyle.
 */
export function buildElementStyle(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): React.CSSProperties {
  const element = getElementSpec(spec, elementPart);
  const style = getElementStyle(spec, variantProps, elementPart);

  const css: React.CSSProperties = {};

  // Layout
  if (element?.layout) {
    const l = element.layout;
    if (l.direction === "HORIZONTAL") css.display = "flex";
    else if (l.direction === "VERTICAL") { css.display = "flex"; css.flexDirection = "column"; }
    if (l.padding) {
      css.paddingTop = l.padding.top;
      css.paddingRight = l.padding.right;
      css.paddingBottom = l.padding.bottom;
      css.paddingLeft = l.padding.left;
    }
    if (l.itemSpacing != null) css.gap = l.itemSpacing;
    if (l.primaryAlign) {
      const map: Record<string, string> = {
        MIN: "flex-start", MAX: "flex-end", CENTER: "center", SPACE_BETWEEN: "space-between",
      };
      css.justifyContent = map[l.primaryAlign];
    }
    if (l.counterAlign) {
      const map: Record<string, string> = {
        MIN: "flex-start", MAX: "flex-end", CENTER: "center", BASELINE: "baseline",
      };
      css.alignItems = map[l.counterAlign];
    }
    if (l.wrap) css.flexWrap = "wrap";
  }

  // Dimensions
  if (element?.dimensions) {
    const d = element.dimensions;
    if (d.width != null) css.width = d.width;
    if (d.height != null) css.height = d.height;
    if (d.minWidth != null) css.minWidth = d.minWidth;
    if (d.minHeight != null) css.minHeight = d.minHeight;
    if (d.cornerRadius != null) {
      css.borderRadius = typeof d.cornerRadius === "number"
        ? d.cornerRadius
        : `${d.cornerRadius.topLeft}px ${d.cornerRadius.topRight}px ${d.cornerRadius.bottomRight}px ${d.cornerRadius.bottomLeft}px`;
    }
  }

  // Variant-specific styles
  if (style) {
    if (style.fill) css.backgroundColor = style.fill;
    if (style.stroke) { css.borderColor = style.stroke; css.borderStyle = "solid"; }
    if (style.strokeWidth != null) css.borderWidth = style.strokeWidth;
    if (style.opacity != null) css.opacity = style.opacity;
    if (style.cornerRadius != null) css.borderRadius = style.cornerRadius;
    if (style.width != null) css.width = style.width;
    if (style.height != null) css.height = style.height;
  }

  return css;
}

/**
 * Get the text color for a named element in a specific variant.
 */
export function getTextColor(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): string | undefined {
  return getElementStyle(spec, variantProps, elementPart)?.textColor;
}

/**
 * Check if a toggleable element is visible in a specific variant.
 * Returns true by default if no visibility data exists.
 */
export function isElementVisible(
  spec: ComponentSpec,
  variantProps: Record<string, string>,
  elementPart: string
): boolean {
  const style = getElementStyle(spec, variantProps, elementPart);
  if (style?.visible != null) return style.visible;
  const element = getElementSpec(spec, elementPart);
  if (element?.toggleable) return element.defaultVisible ?? true;
  return true;
}
