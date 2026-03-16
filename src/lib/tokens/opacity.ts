export const opacityScale = {
  0: 0, 5: 5, 10: 10, 15: 15, 20: 20, 25: 25,
  30: 30, 40: 40, 50: 50, 60: 60, 70: 70, 80: 80, 90: 90,
} as const;

export const opacityTokenList = Object.entries(opacityScale).map(([key, pct]) => ({
  name: `--flowx-opacity-${key}`,
  value: pct,
}));
