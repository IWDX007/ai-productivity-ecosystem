"use client";

import type { CardProps } from "./Card.types";
import styles from "./Card.module.css";

export default function Card({
  children,
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  onClick,
}: CardProps) {
  const paddingClass = styles["padding" + padding.charAt(0).toUpperCase() + padding.slice(1)];

  const classes = [
    styles.card,
    styles[variant],
    paddingClass,
    hoverable ? styles.hoverable : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}