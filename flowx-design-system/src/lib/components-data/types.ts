export interface ElementLayout {
  direction?: "HORIZONTAL" | "VERTICAL" | "NONE";
  sizingH?: "FIXED" | "HUG" | "FILL";
  sizingV?: "FIXED" | "HUG" | "FILL";
  padding?: { top: number; right: number; bottom: number; left: number };
  itemSpacing?: number;
  counterAxisSpacing?: number;
  primaryAlign?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN";
  counterAlign?: "MIN" | "MAX" | "CENTER" | "BASELINE";
  wrap?: boolean;
}

export interface ElementDimensions {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  cornerRadius?: number | { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
}

export interface ElementTypography {
  fontSize: number;
  lineHeight: number;
  fontWeight: number;
  fontFamily: string;
  letterSpacing?: number;
}

export interface ElementSpec {
  part: string;
  description: string;
  layout?: ElementLayout;
  dimensions?: ElementDimensions;
  typography?: ElementTypography;
  toggleable?: boolean;
  defaultVisible?: boolean;
  toggleProperty?: string;
  swappable?: boolean;
  swapProperty?: string;
}

export interface ElementStyle {
  fill?: string;
  fillToken?: string;
  stroke?: string;
  strokeToken?: string;
  strokeWidth?: number;
  textColor?: string;
  textColorToken?: string;
  opacity?: number;
  cornerRadius?: number;
  width?: number;
  height?: number;
  visible?: boolean;
  svg?: string;
  // Typography overrides — used when typography varies by variant (e.g. size)
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: number;
}

export interface VariantStyle {
  variantProps: Record<string, string>;
  elements: Record<string, ElementStyle>;
}

export interface TokenBinding {
  element: string;
  property: string;
  variableName: string;
  resolvedValue: string;
}

export type UsageGuideline =
  | { type: "use-case"; title: string; description: string; props: Record<string, string> }
  | { type: "do"; title: string; description: string }
  | { type: "dont"; title: string; description: string }
  | { type: "decision"; title: string; description: string; date?: string }
  | { type: "exception"; title: string; description: string }
  | {
      type: "info";
      title: string;
      description: string;
      previews?: Record<string, string>[];
      previewRows?: Array<
        | Record<string, string>[]
        | { background: "dark"; items: Record<string, string>[] }
      >;
    };

export interface ComponentSpec {
  slug: string;
  name: string;
  description: string;
  status: "stable" | "beta" | "deprecated" | "planned";
  figmaLink?: string;
  lastUpdated?: string;

  variants: {
    name: string;
    useCase: string;
    props: Record<string, string>;
  }[];

  props: {
    name: string;
    type: string;
    default?: string;
    options?: string[];
    description: string;
  }[];

  states: string[];
  sizes?: string[];

  anatomy?: {
    part: string;
    description: string;
  }[];

  // New fields for v2 extraction
  elements?: ElementSpec[];
  variantStyles?: VariantStyle[];
  tokenBindings?: TokenBinding[];
  usageGuidelines?: UsageGuideline[];

  guidelines?: {
    do: { description: string; example?: string }[];
    dont: { description: string; example?: string }[];
  };

  accessibility?: {
    role?: string;
    keyboard?: string[];
    ariaAttributes?: string[];
  };

  relatedComponents?: string[];

  considerations?: string[];

  realExamples?: {
    src: string;
    alt: string;
    annotation: string;
  }[];

  knownExceptions?: {
    location: string;
    reason: string;
  }[];

  decisionLog?: {
    date: string;
    decision: string;
    reasoning: string;
  }[];
}
