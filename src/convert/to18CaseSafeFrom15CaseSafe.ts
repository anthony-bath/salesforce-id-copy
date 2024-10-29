import { CHARSET } from './constants';

export function to18CaseSafeFrom15CaseSafe(id: string): string {
  let encoding = '';

  for (let block = 0; block < 3; block++) {
    let blockValue = 0;

    for (let position = 0; position < 5; position++) {
      const current = id.charAt(block * 5 + position);

      if (current >= 'A' && current <= 'Z') {
        blockValue += 1 << position;
      }
    }

    encoding += CHARSET.charAt(blockValue);
  }

  return `${id}${encoding}`;
}
