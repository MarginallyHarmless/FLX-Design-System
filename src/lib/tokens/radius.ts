export const radiusScale = {
  2: 2, 4: 4, 6: 6, 8: 8, 12: 12,
  16: 16, 24: 24, 32: 32, 40: 40, 48: 48, 120: 120,
} as const;

export const radiusTokenList = Object.entries(radiusScale).map(([key, px]) => ({
  name: `--flowx-radius-${key}`,
  valuePx: `${px}px`,
}));
