export const colorPalettes = {
  blue: {
    50: "#e6f0fb", 100: "#b0d1f3", 200: "#8abbed", 300: "#549ce5",
    400: "#3389e0", 500: "#006bd8", 600: "#005fc0", 700: "#004c99",
    800: "#003b77", 900: "#002d5b",
  },
  yellow: {
    50: "#fff8e7", 100: "#ffe9b6", 200: "#ffdf92", 300: "#fed061",
    400: "#fec742", 500: "#feb913", 600: "#e7a811", 700: "#b4830d",
    800: "#8c660a", 900: "#6b4e08",
  },
  green: {
    50: "#e6f2ef", 100: "#b0d8ce", 200: "#8ac5b6", 300: "#54aa94",
    400: "#339980", 500: "#008060", 600: "#007457", 700: "#005b44",
    800: "#004635", 900: "#003628",
  },
  orange: {
    50: "#fff0e8", 100: "#fed1b9", 200: "#febb97", 300: "#fe9c67",
    400: "#fd8949", 500: "#fd6b1c", 600: "#e66119", 700: "#b44c14",
    800: "#8b3b0f", 900: "#6a2d0c",
  },
  red: {
    50: "#fde9e6", 100: "#f7bab0", 200: "#f4998a", 300: "#ee6b54",
    400: "#eb4e33", 500: "#e62200", 600: "#d11f00", 700: "#a31800",
    800: "#7f1300", 900: "#610e00",
  },
  neutrals: {
    50: "#f7f8f9", 100: "#e3e8ed", 200: "#cbd1db", 300: "#a6b0be",
    400: "#8390a2", 500: "#64748b", 600: "#5b6a7e", 700: "#475263",
    800: "#2a313a", 900: "#1d232c",
  },
  grays: { 50: "#ffffff", 900: "#000000" },
} as const;

export type PaletteName = keyof typeof colorPalettes;

export const colorTokenList = Object.entries(colorPalettes).flatMap(
  ([palette, shades]) =>
    Object.entries(shades).map(([shade, hex]) => ({
      name: `--flowx-${palette}-${shade}`,
      value: hex,
      group: palette,
    }))
);
