import { describe, it, expect } from 'vitest';
import { userAuthSchema } from './auth';

describe('auth validations', () => {
  it('should validate a valid email', () => {
    const result = userAuthSchema.safeParse({ email: 'test@example.com' });
    expect(result.success).toBe(true);
  });

  it('should reject an invalid email', () => {
    const result = userAuthSchema.safeParse({ email: 'invalid-email' });
    expect(result.success).toBe(false);
  });
});
