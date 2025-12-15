import { describe, expect, it } from 'vitest';
import { succeeded, failed, isSuccess, isFailure } from './result';

describe('Result', () => {
  it('should create a success result', () => {
    const result = succeeded(42);
    expect(isSuccess(result)).toBe(true);
    if (isSuccess(result)) {
      expect(result.value).toBe(42);
    } else {
      expect.fail('Result should be success');
    }
  });

  it('should create a failure result', () => {
    const result = failed('Error');
    expect(isFailure(result)).toBe(true);
    if (isFailure(result)) {
      expect(result.error).toBe('Error');
    } else {
      expect.fail('Result should be failure');
    }
  });
});
