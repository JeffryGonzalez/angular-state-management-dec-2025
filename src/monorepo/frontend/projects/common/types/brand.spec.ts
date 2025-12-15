/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect } from 'vitest';
import type { Brand } from './brand';
import { none, some, unwrapOption, type Option } from './option';
describe('Brands', () => {
  it('allows branded types', () => {
    type UserId = Brand<string, 'UserId'>;
    // @ts-expect-error incompatible types
    const myId: UserId = 'user-123';

    const yourId: UserId = 'user-456' as UserId;
    expect(yourId).toBe('user-456');
  });
  it('example of use - returning null', () => {
    type UserId = Brand<string, 'UserId'>;

    function isUserId(id: string): id is UserId {
      return id.startsWith('A') || id.startsWith('X');
    }

    function getUserFromId(id: string): UserId | null {
      if (isUserId(id)) {
        return id as UserId; // Type assertion to UserId
      }
      else {
        return null;
      }
    }

    const badUserId = getUserFromId('B12345');
    expect(badUserId).toBeNull();
    const userId = getUserFromId('A12345');
    expect(userId).toBe('A12345' as UserId);
  });
  it('example of use - returning Option', () => {
    type UserId = Brand<string, 'UserId'>;

    function isUserId(id: string): id is UserId {
      return id.startsWith('A') || id.startsWith('X');
    }

    function getUserFromId(id: string): Option<UserId> {
      if (isUserId(id)) {
        return some(id as UserId); // Type assertion to UserId
      }
      else {
        return none;
      }
    }

    const badUserId = getUserFromId('B12345');
    expect(() => unwrapOption(badUserId)).toThrow();

    const goodUserId = getUserFromId('A12345');
    expect(unwrapOption(goodUserId)).toBe('A12345' as UserId);
  });
});
