import { type ComponentSpec } from "./types";
import { inputFieldSpec } from "./input-field";
import { radioV3Spec } from "./radio-v3";

export const componentRegistry: ComponentSpec[] = [inputFieldSpec, radioV3Spec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
