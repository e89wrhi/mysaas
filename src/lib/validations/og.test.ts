import { describe, it, expect } from 'vitest';
import { ogImageSchema } from './og';

describe('og validations', () => {
  it('should validate valid og data', () => {
    const result = ogImageSchema.safeParse({
      heading: 'Hello World',
      type: 'Blog Post',
      mode: 'dark',
    });
    expect(result.success).toBe(true);
  });

  it('should use default mode if not provided', () => {
    const result = ogImageSchema.safeParse({
      heading: 'Hello World',
      type: 'Blog Post',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.mode).toBe('dark');
    }
  });

  it('should reject invalid mode', () => {
    const result = ogImageSchema.safeParse({
      heading: 'Hello',
      type: 'Post',
      mode: 'invalid',
    });
    expect(result.success).toBe(false);
  });
});
