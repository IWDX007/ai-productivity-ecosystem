"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import styles from "./FavoritesIcon.module.css";

interface FavoritesIconProps {
  count?: number;
}

export default function FavoritesIcon({ count = 0 }: FavoritesIconProps) {
  return (
    <Link
      href="/dashboard/favorites"
      className={styles.link}
      aria-label="Favorites"
    >
      <Heart className={styles.icon} />
      {count > 0 && (
        <span className={styles.badge}>{count > 99 ? "99+" : count}</span>
      )}
    </Link>
  );
}