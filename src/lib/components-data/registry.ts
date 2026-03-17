import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";
import { checkboxSpec } from "./checkbox";
import { inputFieldSpec } from "./input-field";
import { radioV3Spec } from "./radio-v3";
import { selectFieldSpec } from "./select-field";

export const componentRegistry: ComponentSpec[] = [buttonSpec, checkboxSpec, inputFieldSpec, radioV3Spec, selectFieldSpec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
