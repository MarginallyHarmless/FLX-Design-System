import { type ComponentSpec } from "./types";
import { buttonSpec } from "./button";
import { checkboxSpec } from "./checkbox";
import { inputFieldSpec } from "./input-field";
import { radioV3Spec } from "./radio-v3";
import { selectFieldSpec } from "./select-field";
import { segmentedButtonSpec } from "./segmented-button";
import { switchSpec } from "./switch";
import { tabsSpec } from "./tabs";
import { valuesTableSpec } from "./values-table";

export const componentRegistry: ComponentSpec[] = [buttonSpec, checkboxSpec, inputFieldSpec, radioV3Spec, segmentedButtonSpec, selectFieldSpec, switchSpec, tabsSpec, valuesTableSpec];

export function getComponent(slug: string): ComponentSpec | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByStatus(status: ComponentSpec["status"]) {
  return componentRegistry.filter((c) => c.status === status);
}
