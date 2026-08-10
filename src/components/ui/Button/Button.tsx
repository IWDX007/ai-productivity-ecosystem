"use client";

import Link from "next/link";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}