import type { ReactNode } from "react";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "xxl" | "full";

export interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  className?: string;
}