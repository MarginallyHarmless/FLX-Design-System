export const shadowColor = "#163462";

export const shadowPrimitives = {
  offsets: { 2: 2, 4: 4, 8: 8, 16: 16, 24: 24, 32: 32 },
  blurs: { xs: 8, s: 12, m: 16, l: 24, xl: 32 },
} as const;

export const shadowLevels = [
  { name: "xs", offset: 2, blur: 8, css: `0 2px 8px ${shadowColor}1a` },
  { name: "s",  offset: 4, blur: 12, css: `0 4px 12px ${shadowColor}1a` },
  { name: "m",  offset: 8, blur: 16, css: `0 8px 16px ${shadowColor}1a` },
  { name: "l",  offset: 16, blur: 24, css: `0 16px 24px ${shadowColor}1a` },
  { name: "xl", offset: 24, blur: 32, css: `0 24px 32px ${shadowColor}1a` },
];
