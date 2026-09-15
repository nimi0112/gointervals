import { ICON_PATHS, type IconName } from '@/lib/icons';

interface Props {
  name: IconName;
  size?: number;
}

/** Inline lucide glyph, decorative: the text next to it carries the meaning. */
export function Icon({ name, size = 24 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
    />
  );
}
