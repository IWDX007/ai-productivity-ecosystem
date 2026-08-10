import type { ContainerProps } from "./Container.types";
import styles from "./Container.module.css";

export default function Container({
  children,
  size = "xl",
  className = "",
}: ContainerProps) {
  const sizeClass = size === "xxl" ? styles.xxl : styles[size];
  const classes = [styles.container, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}