"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingSection({ rating = 4.8, votes = 12459 }: { rating?: number; votes?: number }) {
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="container mx-auto px-4 py-8 border-t border-theme">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
        <span className="text-theme-secondary">Rate this tool</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setUserRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="p-1"
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  (hover || userRating || rating) >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-theme-muted"
                }`}
              />
            </button>
          ))}
        </div>
        <span className="text-theme-primary font-semibold">{rating.toFixed(1)} / 5</span>
        <span className="text-theme-secondary">- {votes.toLocaleString()} votes</span>
      </div>
    </section>
  );
}