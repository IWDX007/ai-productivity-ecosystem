import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.css";

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const classes = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}