import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";

export const componentRegistry: ComponentSpec[] = [buttonSpec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
