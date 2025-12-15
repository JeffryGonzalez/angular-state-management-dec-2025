import { Prettify } from './prettify';

export function pluck<T, K extends keyof T>(obj: T, ...keys: K[]) {
  return keys.reduce(
    (prev, current) => {
      return {
        ...prev,
        [current]: obj[current],
      };
    },
    {} as Prettify<Pick<T, K>>,
  );
}
