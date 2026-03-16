import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";
import { checkboxSpec } from "./checkbox";
import { radioSpec } from "./radio";
import { radioV2Spec } from "./radio-v2";
import { radioV3Spec } from "./radio-v3";

export const componentRegistry: ComponentSpec[] = [buttonSpec, checkboxSpec, radioSpec, radioV2Spec, radioV3Spec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
