import { to18CaseSafeFrom18 } from './to18CaseSafeFrom18';

export function to15CaseSafeFrom18(id: string): string {
  return to18CaseSafeFrom18(id).slice(0, 15);
}
