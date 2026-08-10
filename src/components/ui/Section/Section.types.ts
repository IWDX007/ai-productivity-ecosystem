import type { ReactNode } from "react";

export type SectionPadding = "sm" | "md" | "lg" | "xl";
export type SectionBackground = "default" | "secondary" | "card";

export interface SectionProps {
  children: ReactNode;
  padding?: SectionPadding;
  background?: SectionBackground;
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  id?: string;
}