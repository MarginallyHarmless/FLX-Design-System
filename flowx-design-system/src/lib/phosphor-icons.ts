import React from "react";
import {
  MagnifyingGlass,
  PencilSimple,
  TrashSimple,
  Check,
  X,
  ArrowRight,
  Plus,
  Gear,
  User,
  Bell,
  CaretDown,
  Funnel,
  Eye,
  Download,
  Copy,
  DotsThreeVertical,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";

export const ICON_OPTIONS = [
  "MagnifyingGlass",
  "PencilSimple",
  "TrashSimple",
  "Check",
  "X",
  "ArrowRight",
  "Plus",
  "Gear",
  "User",
  "Bell",
  "CaretDown",
  "Funnel",
  "Eye",
  "Download",
  "Copy",
  "DotsThreeVertical",
] as const;

export type IconName = (typeof ICON_OPTIONS)[number];

const ICON_MAP: Record<IconName, React.ComponentType<IconProps>> = {
  MagnifyingGlass,
  PencilSimple,
  TrashSimple,
  Check,
  X,
  ArrowRight,
  Plus,
  Gear,
  User,
  Bell,
  CaretDown,
  Funnel,
  Eye,
  Download,
  Copy,
  DotsThreeVertical,
};

export function PhosphorIcon({
  name,
  size,
  color,
  weight = "regular",
  className,
}: {
  name: IconName;
  size?: number;
  color?: string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return React.createElement(Icon, { size, color, weight, className });
}
