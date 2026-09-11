let original: string | null = null;

export function setTitle(text: string | null): void {
  if (typeof document === 'undefined') return;
  if (original === null) original = document.title;
  document.title = text ? `${text} · ${original}` : original;
}
