import {
  serialisePresets,
  parsePresets,
  presetToSlug,
  builtinIntervalPresets,
} from '@/engine/presets';

describe('presets', () => {
  it('round-trips a preset list', () => {
    const list = [
      {
        id: 'abc',
        name: 'Beep every 10',
        config: {
          mode: 'interval' as const,
          prep: 0,
          work: 600,
          rest: 0,
          rounds: 3,
          sets: 1,
          setRest: 0,
        },
      },
    ];
    expect(parsePresets(serialisePresets(list))).toEqual(list);
  });

  it('rejects garbage and out-of-range values', () => {
    expect(parsePresets('not json')).toEqual([]);
    expect(parsePresets('{"a":1}')).toEqual([]);
    expect(
      parsePresets(
        JSON.stringify([
          { id: 'x', name: 'bad', config: { mode: 'interval', work: -5, rounds: 1e9 } },
        ]),
      ),
    ).toEqual([]);
    expect(
      parsePresets(
        JSON.stringify([
          {
            id: 'x',
            name: 'y',
            config: {
              mode: 'interval',
              prep: 0,
              work: 10,
              rest: 0,
              rounds: 1,
              sets: 1,
              setRest: 0,
            },
          },
          'junk',
        ]),
      ),
    ).toHaveLength(1);
  });

  it('makes stable slugs', () => {
    expect(presetToSlug({ mode: 'tabata', prep: 10, work: 20, rest: 10, rounds: 8 })).toBe(
      '20-10-8',
    );
  });

  it('ships the long beep presets first', () => {
    expect(builtinIntervalPresets[0]!.name).toMatch(/every 10 min/i);
    expect(builtinIntervalPresets[0]!.config).toMatchObject({ work: 600, rest: 0, rounds: 3 });
  });
});
