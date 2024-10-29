import { describe, expect, it } from 'vitest';
import { to18CaseSafeFrom15CaseSafe } from '../to18CaseSafeFrom15CaseSafe';

describe('to18CaseSafeFrom15CaseSafe', () => {
  it.each([['00D7z00000EEQH7', '00D7z00000EEQH7EAP']])(
    'should convert %s to case-safe %s',
    (input, expected) => {
      expect(to18CaseSafeFrom15CaseSafe(input)).toBe(expected);
    }
  );
});
