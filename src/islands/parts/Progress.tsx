interface Props {
  /** 0..1 of the whole session */
  ratio: number;
  left: string | null;
  right: string | null;
}

/** 6px track and a forest fill. Not a tab stop; the details row is the readable part. */
export function Progress({ ratio, left, right }: Props) {
  const r = Math.min(1, Math.max(0, ratio));
  return (
    <div class="progress">
      <div class="progress__track" aria-hidden="true">
        <div class="progress__fill" style={{ transform: `scaleX(${r})` }} />
      </div>
      <p class="progress__details">
        <span>{left ?? ''}</span>
        <span>{right ?? ''}</span>
      </p>
    </div>
  );
}
