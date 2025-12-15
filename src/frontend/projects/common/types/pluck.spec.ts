import { describe, expect, it } from 'vitest';
import { pluck } from './pluck';

describe('Pluck', () => {
  it('should copy just properties specified', () => {
    const example = {
      name: 'Test',
      age: 30,
      location: 'Earth',
      colors: ['red', 'green', 'blue'],
    };
    const mapped = pluck(example, 'name', 'colors');

    expect(mapped).toEqual({
      name: 'Test',
      colors: ['red', 'green', 'blue'],
    });

    expect(mapped).not.toHaveProperty('age');
    expect(mapped).not.toHaveProperty('location');
  });
});
