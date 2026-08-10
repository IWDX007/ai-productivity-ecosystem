import type { SectionProps } from "./Section.types";
import styles from "./Section.module.css";

export default function Section({
  children,
  padding = "lg",
  background = "default",
  borderTop = false,
  borderBottom = false,
  className = "",
  id,
}: SectionProps) {
  const paddingClass = styles["padding" + padding.charAt(0).toUpperCase() + padding.slice(1)];
  const bgClass = styles["bg" + background.charAt(0).toUpperCase() + background.slice(1)];

  const classes = [
    styles.section,
    paddingClass,
    bgClass,
    borderTop ? styles.borderTop : "",
    borderBottom ? styles.borderBottom : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}