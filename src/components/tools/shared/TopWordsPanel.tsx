"use client";

import { TrendingUp } from "lucide-react";

interface TopWordsProps {
  words: Array<{ word: string; count: number }>;
}

export default function TopWordsPanel({ words }: TopWordsProps) {
  if (words.length === 0) return null;

  const maxCount = words[0]?.count || 1;

  return (
    <div className="p-4 glass-card border border-theme rounded-xl">
      <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-crimson-500" />
        Top Words
      </h3>
      <div className="space-y-2">
        {words.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-theme-primary font-mono truncate max-w-[150px]">
                {item.word}
              </span>
              <span className="text-theme-secondary font-semibold">{item.count}</span>
            </div>
            <div className="h-1.5 bg-theme-secondary rounded-full overflow-hidden">
              <div
                className="h-full gradient-crimson rounded-full transition-all"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}