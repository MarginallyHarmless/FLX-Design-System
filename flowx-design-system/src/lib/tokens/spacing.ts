export const spacingScale = {
  0: 0, 1: 1, 2: 2, 4: 4, 6: 6, 8: 8, 12: 12, 16: 16,
  24: 24, 32: 32, 40: 40, 48: 48, 56: 56, 64: 64,
  80: 80, 96: 96, 112: 112, 128: 128, 144: 144, 160: 160,
} as const;

export const spacingTokenList = Object.entries(spacingScale).map(([key, px]) => ({
  name: `--flowx-space-${key}`,
  valuePx: px,
  valueRem: `${px / 16}rem`,
}));
