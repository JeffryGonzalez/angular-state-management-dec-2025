import { describe, expect, it, beforeEach } from 'vitest';
import { isNone, isSome, mapOption, none, optionalCatch, some, unwrapOption, unwrapOptionOr, type Option } from './option';

describe('Options', () => {
  let result1: Option<number>;
  beforeEach(() => {
    result1 = isEven(4);
  });

  describe('functions', () => {
    it('isSome', () => {
      expect(isSome(some(10))).toBe(true);
      expect(isSome(none)).toBe(false);
      expect(isSome(result1)).toBe(true);
    });
    it('isNone', () => {
      expect(isNone(none)).toBe(true);
      expect(isNone(some(10))).toBe(false);
      expect(isNone(result1)).toBe(false);
    });
    it('mapOption', () => {
      const mapped = mapOption(result1, (x) => x * 3);
      expect(isSome(mapped)).toBe(true);
      if (isSome(mapped)) {
        expect(mapped.value).toBe(12);
      }

      const noneResult = isEven(3);
      const mappedNone = mapOption(noneResult, (x) => x * 3);
      expect(isNone(mappedNone)).toBe(true);
    });
    it('unwrap', () => {
      expect(unwrapOption(result1)).toBe(4);
      const noneResult = isEven(3);
      expect(() => unwrapOption(noneResult)).toThrow();
    });
    it('unwrapOr', () => {
      expect(unwrapOptionOr(result1, 100)).toBe(4);
      const noneResult = isEven(3);
      expect(unwrapOptionOr(noneResult, 100)).toBe(100);
    });
    it('optionalCatch', () => {
      const someResult = () => {
        return 10;
      };
      const noneResult = () => {
        throw new Error('Test error');
      };

      const optSome = optionalCatch(someResult);
      expect(isSome(optSome)).toBe(true);
      if (isSome(optSome)) {
        expect(optSome.value).toBe(10);
      }

      const optNone = optionalCatch(noneResult);
      expect(isNone(optNone)).toBe(true);
    });
  })
});

function isEven(num: number): Option<number> {
  if (num % 2 === 0) {
    return some(num);
  }
  else {
    return none;
  }
}
