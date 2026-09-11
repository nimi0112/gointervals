export function wordCount(text: string): number {
  return text
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[`#*_>|\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingTime(text: string): { minutes: number; words: number } {
  const words = wordCount(text);
  return { minutes: Math.max(1, Math.round(words / 220)), words };
}
