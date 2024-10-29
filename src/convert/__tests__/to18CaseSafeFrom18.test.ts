import { describe, expect, it } from 'vitest';
import { to18CaseSafeFrom18 } from '../to18CaseSafeFrom18';

describe('to18CaseSafeFrom18', () => {
  it.each([
    ['00d7z00000eeqh7eap', '00D7z00000EEQH7EAP'],
    ['00D7z00000EEQH7EAP', '00D7z00000EEQH7EAP'],
  ])('should convert %s to case-safe %s', (input, expected) => {
    expect(to18CaseSafeFrom18(input)).toBe(expected);
  });
});
