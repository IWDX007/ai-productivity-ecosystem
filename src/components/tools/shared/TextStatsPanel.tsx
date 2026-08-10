"use client";

import type { TextStats } from "@/types/tools";
import { FileText, Type, AlignLeft, List, Clock, Mic, Sparkles, Hash } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}

function StatCard({ icon, label, value, color = "purple" }: StatsCardProps) {
  const colorMap: Record<string, string> = {
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-500 dark:text-purple-400",
    pink: "bg-pink-500/10 border-pink-500/20 text-pink-500 dark:text-pink-400",
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-500 dark:text-blue-400",
    green: "bg-green-500/10 border-green-500/20 text-green-500 dark:text-green-400",
    orange: "bg-orange-500/10 border-orange-500/20 text-orange-500 dark:text-orange-400",
    crimson: "bg-crimson-500/10 border-crimson-500/20 text-crimson-500",
  };

  return (
    <div className={`p-3 rounded-lg border ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-theme-secondary">{label}</span>
        <div className="opacity-70">{icon}</div>
      </div>
      <div className="text-lg font-bold text-theme-primary">{value}</div>
    </div>
  );
}

export default function TextStatsPanel({ stats }: { stats: TextStats }) {
  return (
    <div className="p-4 glass-card border border-theme rounded-xl">
      <h3 className="text-sm font-semibold text-theme-primary mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-crimson-500" />
        Statistics
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          icon={<Type className="w-4 h-4" />}
          label="Words"
          value={stats.words.toLocaleString()}
          color="crimson"
        />
        <StatCard
          icon={<Hash className="w-4 h-4" />}
          label="Characters"
          value={stats.characters.toLocaleString()}
          color="pink"
        />
        <StatCard
          icon={<Hash className="w-4 h-4" />}
          label="No Spaces"
          value={stats.charactersNoSpaces.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={<AlignLeft className="w-4 h-4" />}
          label="Sentences"
          value={stats.sentences.toLocaleString()}
          color="green"
        />
        <StatCard
          icon={<FileText className="w-4 h-4" />}
          label="Paragraphs"
          value={stats.paragraphs.toLocaleString()}
          color="orange"
        />
        <StatCard
          icon={<List className="w-4 h-4" />}
          label="Lines"
          value={stats.lines.toLocaleString()}
          color="purple"
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="Reading"
          value={stats.readingTime}
          color="blue"
        />
        <StatCard
          icon={<Mic className="w-4 h-4" />}
          label="Speaking"
          value={stats.speakingTime}
          color="green"
        />
      </div>
      <div className="mt-3 pt-3 border-t border-theme space-y-2 text-xs">
        <div className="flex justify-between text-theme-secondary">
          <span>Unique Words:</span>
          <span className="font-semibold text-theme-primary">{stats.uniqueWords.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-theme-secondary">
          <span>Avg Word Length:</span>
          <span className="font-semibold text-theme-primary">{stats.averageWordLength} chars</span>
        </div>
      </div>
    </div>
  );
}