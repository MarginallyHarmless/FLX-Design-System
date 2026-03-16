export interface RadioVariant {
  selected: "off" | "on";
  state: "default" | "error" | "disabled";
  border: "on" | "off";
  inverted: "off" | "on";
  size: "medium" | "small";
  nodeId: string;
  file: string;
}

export function getVariantFile(
  selected: RadioVariant["selected"],
  state: RadioVariant["state"],
  border: RadioVariant["border"],
  inverted: RadioVariant["inverted"],
  size: RadioVariant["size"],
): string {
  return `${selected}-${state}-${border}-${inverted}-${size}.png`;
}

export const radioV2Variants: RadioVariant[] = [
  // Off – Default
  { selected: "off", state: "default", border: "on",  inverted: "off", size: "medium", nodeId: "360:642",    file: "off-default-on-off-medium.png" },
  { selected: "off", state: "default", border: "on",  inverted: "off", size: "small",  nodeId: "526:14111",  file: "off-default-on-off-small.png" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:660",    file: "off-default-off-off-medium.png" },
  { selected: "off", state: "default", border: "off", inverted: "off", size: "small",  nodeId: "526:14120",  file: "off-default-off-off-small.png" },
  { selected: "off", state: "default", border: "on",  inverted: "on",  size: "medium", nodeId: "360:651",    file: "off-default-on-on-medium.png" },
  { selected: "off", state: "default", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14677",  file: "off-default-on-on-small.png" },
  { selected: "off", state: "default", border: "off", inverted: "on",  size: "medium", nodeId: "360:669",    file: "off-default-off-on-medium.png" },
  { selected: "off", state: "default", border: "off", inverted: "on",  size: "small",  nodeId: "526:14686",  file: "off-default-off-on-small.png" },

  // Off – Error
  { selected: "off", state: "error", border: "on",  inverted: "off", size: "medium", nodeId: "360:678",    file: "off-error-on-off-medium.png" },
  { selected: "off", state: "error", border: "on",  inverted: "off", size: "small",  nodeId: "526:14129",  file: "off-error-on-off-small.png" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:698",    file: "off-error-off-off-medium.png" },
  { selected: "off", state: "error", border: "off", inverted: "off", size: "small",  nodeId: "526:14139",  file: "off-error-off-off-small.png" },
  { selected: "off", state: "error", border: "on",  inverted: "on",  size: "medium", nodeId: "360:688",    file: "off-error-on-on-medium.png" },
  { selected: "off", state: "error", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14695",  file: "off-error-on-on-small.png" },
  { selected: "off", state: "error", border: "off", inverted: "on",  size: "medium", nodeId: "360:708",    file: "off-error-off-on-medium.png" },
  { selected: "off", state: "error", border: "off", inverted: "on",  size: "small",  nodeId: "526:14705",  file: "off-error-off-on-small.png" },

  // Off – Disabled
  { selected: "off", state: "disabled", border: "on",  inverted: "off", size: "medium", nodeId: "360:718",    file: "off-disabled-on-off-medium.png" },
  { selected: "off", state: "disabled", border: "on",  inverted: "off", size: "small",  nodeId: "526:14149",  file: "off-disabled-on-off-small.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:736",    file: "off-disabled-off-off-medium.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "off", size: "small",  nodeId: "526:14158",  file: "off-disabled-off-off-small.png" },
  { selected: "off", state: "disabled", border: "on",  inverted: "on",  size: "medium", nodeId: "360:727",    file: "off-disabled-on-on-medium.png" },
  { selected: "off", state: "disabled", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14715",  file: "off-disabled-on-on-small.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "on",  size: "medium", nodeId: "360:745",    file: "off-disabled-off-on-medium.png" },
  { selected: "off", state: "disabled", border: "off", inverted: "on",  size: "small",  nodeId: "526:14724",  file: "off-disabled-off-on-small.png" },

  // On – Default
  { selected: "on", state: "default", border: "on",  inverted: "off", size: "medium", nodeId: "360:790",    file: "on-default-on-off-medium.png" },
  { selected: "on", state: "default", border: "on",  inverted: "off", size: "small",  nodeId: "526:14167",  file: "on-default-on-off-small.png" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "medium", nodeId: "360:808",    file: "on-default-off-off-medium.png" },
  { selected: "on", state: "default", border: "off", inverted: "off", size: "small",  nodeId: "526:14176",  file: "on-default-off-off-small.png" },
  { selected: "on", state: "default", border: "on",  inverted: "on",  size: "medium", nodeId: "360:799",    file: "on-default-on-on-medium.png" },
  { selected: "on", state: "default", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14733",  file: "on-default-on-on-small.png" },
  { selected: "on", state: "default", border: "off", inverted: "on",  size: "medium", nodeId: "360:817",    file: "on-default-off-on-medium.png" },
  { selected: "on", state: "default", border: "off", inverted: "on",  size: "small",  nodeId: "526:14742",  file: "on-default-off-on-small.png" },

  // On – Error
  { selected: "on", state: "error", border: "on",  inverted: "off", size: "medium", nodeId: "360:826",    file: "on-error-on-off-medium.png" },
  { selected: "on", state: "error", border: "on",  inverted: "off", size: "small",  nodeId: "526:14185",  file: "on-error-on-off-small.png" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "medium", nodeId: "360:846",    file: "on-error-off-off-medium.png" },
  { selected: "on", state: "error", border: "off", inverted: "off", size: "small",  nodeId: "526:14195",  file: "on-error-off-off-small.png" },
  { selected: "on", state: "error", border: "on",  inverted: "on",  size: "medium", nodeId: "360:836",    file: "on-error-on-on-medium.png" },
  { selected: "on", state: "error", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14751",  file: "on-error-on-on-small.png" },
  { selected: "on", state: "error", border: "off", inverted: "on",  size: "medium", nodeId: "360:856",    file: "on-error-off-on-medium.png" },
  { selected: "on", state: "error", border: "off", inverted: "on",  size: "small",  nodeId: "526:14761",  file: "on-error-off-on-small.png" },

  // On – Disabled
  { selected: "on", state: "disabled", border: "on",  inverted: "off", size: "medium", nodeId: "360:866",    file: "on-disabled-on-off-medium.png" },
  { selected: "on", state: "disabled", border: "on",  inverted: "off", size: "small",  nodeId: "526:14205",  file: "on-disabled-on-off-small.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "medium", nodeId: "360:884",    file: "on-disabled-off-off-medium.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "off", size: "small",  nodeId: "526:14214",  file: "on-disabled-off-off-small.png" },
  { selected: "on", state: "disabled", border: "on",  inverted: "on",  size: "medium", nodeId: "360:875",    file: "on-disabled-on-on-medium.png" },
  { selected: "on", state: "disabled", border: "on",  inverted: "on",  size: "small",  nodeId: "526:14771",  file: "on-disabled-on-on-small.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "on",  size: "medium", nodeId: "360:893",    file: "on-disabled-off-on-medium.png" },
  { selected: "on", state: "disabled", border: "off", inverted: "on",  size: "small",  nodeId: "526:14780",  file: "on-disabled-off-on-small.png" },
];
