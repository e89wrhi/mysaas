'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { PrismaClient, UserRole } from '@prisma/client';

import { userRoleSchema } from '@/lib/validations/user';
import { headers } from 'next/headers';

const prisma = new PrismaClient();
export interface FormData {
  role: UserRole;
}

export async function updateUserRole(userId: string, data: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session?.user.id !== userId) {
      throw new Error('Unauthorized');
    }

    const { role } = userRoleSchema.parse(data);

    // Update the user role.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    revalidatePath('/dashboard/settings');
    return { status: 'success' };
  } catch {
    // console.log(error)
    return { status: 'error' };
  }
}
