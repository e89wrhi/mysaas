import { UserRole } from '@prisma/client';

export interface ExtendedUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

declare module 'better-auth' {
  interface User {
    role: UserRole;
  }
}
