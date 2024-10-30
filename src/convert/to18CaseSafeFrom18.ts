import { CHARSET } from './constants';

export function to18CaseSafeFrom18(id: string): string {
  const encoding = id.substring(15).toUpperCase();
  const baseId = id.substring(0, 15);
  let converted = '';

  for (let blockNumber = 0; blockNumber < encoding.length; blockNumber++) {
    const blockValue = CHARSET.indexOf(encoding.charAt(blockNumber));

    for (let position = 0; position < 5; position++) {
      const char = baseId.charAt(blockNumber * 5 + position);

      if (blockValue & (1 << position)) {
        converted += char.toUpperCase();
      } else {
        converted += char;
      }
    }
  }

  return `${converted}${encoding}`;
}
