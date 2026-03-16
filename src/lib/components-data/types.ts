export interface ComponentSpec {
  slug: string;
  name: string;
  description: string;
  status: "stable" | "beta" | "deprecated" | "planned";
  figmaLink?: string;
  lastUpdated?: string;

  variants: {
    name: string;
    description?: string;
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
}
