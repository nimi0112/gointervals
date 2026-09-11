import type { Lap } from '@/engine/stopwatch';
import { formatTenths } from '@/engine/format';

interface Props {
  laps: Lap[];
  fastest: Lap | null;
  slowest: Lap | null;
}

export function LapList({ laps, fastest, slowest }: Props) {
  if (laps.length === 0) return null;
  return (
    <table class="laps" aria-label="Laps">
      <thead>
        <tr>
          <th scope="col">Lap</th>
          <th scope="col">Split</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {[...laps].reverse().map((l) => (
          <tr
            key={l.n}
            class={l.n === fastest?.n ? 'is-fastest' : l.n === slowest?.n ? 'is-slowest' : ''}
          >
            <td class="mono">{l.n}</td>
            <td class="mono">
              {formatTenths(l.splitMs)}
              {l.n === fastest?.n && <span class="laps__tag"> fastest</span>}
              {l.n === slowest?.n && <span class="laps__tag"> slowest</span>}
            </td>
            <td class="mono">{formatTenths(l.totalMs)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
