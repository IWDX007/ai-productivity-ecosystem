import type { ReactNode } from "react";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "solid";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}