import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";
import { checkboxSpec } from "./checkbox";

export const componentRegistry: ComponentSpec[] = [buttonSpec, checkboxSpec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
