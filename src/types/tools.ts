// Text Tool Types
export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
  uniqueWords: number;
  averageWordLength: number;
}

export interface ToolPageProps {
  title: string;
  description: string;
  category: string;
  categoryColor?: string;
  keywords?: string[];
}