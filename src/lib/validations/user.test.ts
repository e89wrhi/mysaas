import { describe, it, expect } from 'vitest';
import { userNameSchema, userRoleSchema, UserRole } from './user';

describe('user validations', () => {
  describe('userNameSchema', () => {
    it('should validate a valid name', () => {
      const result = userNameSchema.safeParse({ name: 'John Doe' });
      expect(result.success).toBe(true);
    });

    it('should reject a name too short', () => {
      const result = userNameSchema.safeParse({ name: 'Jo' });
      expect(result.success).toBe(false);
    });

    it('should reject a name too long', () => {
      const result = userNameSchema.safeParse({ name: 'a'.repeat(33) });
      expect(result.success).toBe(false);
    });
  });

  describe('userRoleSchema', () => {
    it('should validate a valid role', () => {
      const result = userRoleSchema.safeParse({ role: UserRole.ADMIN });
      expect(result.success).toBe(true);
    });

    it('should reject an invalid role', () => {
      const result = userRoleSchema.safeParse({ role: 'SUPER_ADMIN' });
      expect(result.success).toBe(false);
    });
  });
});
