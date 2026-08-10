import type { TextStats } from "@/types/tools";

export function analyzeText(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: "0 sec",
      speakingTime: "0 sec",
      uniqueWords: 0,
      averageWordLength: 0,
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;

  const wordsArray = text.trim().split(/\s+/).filter(w => w.length > 0);
  const words = wordsArray.length;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  const lines = text.split(/\n/).length;

  const wordsPerMinute = 200;
  const readingMinutes = words / wordsPerMinute;
  const readingTime = formatTime(readingMinutes);

  const speakingWordsPerMinute = 130;
  const speakingMinutes = words / speakingWordsPerMinute;
  const speakingTime = formatTime(speakingMinutes);

  const uniqueWordsSet = new Set(
    wordsArray.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, ""))
  );
  const uniqueWords = uniqueWordsSet.size;

  const totalWordLength = wordsArray.reduce((sum, word) => sum + word.length, 0);
  const averageWordLength = words > 0 ? Number((totalWordLength / words).toFixed(1)) : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    readingTime,
    speakingTime,
    uniqueWords,
    averageWordLength,
  };
}

function formatTime(minutes: number): string {
  if (minutes < 1 / 60) return "0 sec";
  if (minutes < 1) {
    const seconds = Math.ceil(minutes * 60);
    return `${seconds} sec`;
  }
  const mins = Math.floor(minutes);
  const secs = Math.ceil((minutes - mins) * 60);
  if (secs === 0) return `${mins} min`;
  return `${mins} min ${secs} sec`;
}

export function getWordFrequency(text: string): Map<string, number> {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const frequency = new Map<string, number>();
  words.forEach(word => {
    const clean = word.replace(/[^a-z0-9]/g, "");
    if (clean.length > 0) {
      frequency.set(clean, (frequency.get(clean) || 0) + 1);
    }
  });
  return new Map([...frequency.entries()].sort((a, b) => b[1] - a[1]));
}

export function getTopWords(text: string, limit: number = 10): Array<{ word: string; count: number }> {
  const frequency = getWordFrequency(text);
  return Array.from(frequency.entries())
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
}