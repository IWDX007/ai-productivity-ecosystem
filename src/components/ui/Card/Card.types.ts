import type { ReactNode } from "react";

export type CardVariant = "default" | "glass" | "gradient";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}