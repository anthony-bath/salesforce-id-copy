import { CHARSET } from './constants';

export function to18CaseSafeFrom18(id: string): string {
  const encoding = id.substring(15).toUpperCase();
  const baseId = id.substring(0, 15);
  let converted = '';

  for (let i = 0; i < encoding.length; i++) {
    const char = encoding.charAt(i);
    const index = CHARSET.indexOf(char);

    for (let j = 0; j < 5; j++) {
      const char = baseId.charAt(i * 5 + j);

      if (index & (1 << j)) {
        converted += char.toUpperCase();
      } else {
        converted += char;
      }
    }
  }

  return `${converted}${encoding}`;
}
