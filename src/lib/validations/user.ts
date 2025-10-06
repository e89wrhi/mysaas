import * as z from 'zod';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const userRoleSchema = z.object({
  role: z.nativeEnum(UserRole),
});
