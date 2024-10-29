import { describe, expect, it } from 'vitest';
import { to15CaseSafeFrom18 } from '../to15CaseSafeFrom18';

describe('to15CaseSafeFrom18', () => {
  it.each([['00d7z00000eeqh7eap', '00D7z00000EEQH7']])(
    'should convert %s to case-safe 15-character id%s',
    (input, expected) => {
      expect(to15CaseSafeFrom18(input)).toBe(expected);
    }
  );
});
