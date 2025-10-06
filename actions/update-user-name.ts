'use server';

import { PrismaClient } from '@prisma/client';
import { userNameSchema } from '@/lib/validations/user';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const prisma = new PrismaClient();
export interface FormData {
  name: string;
}

export async function UpdateUserName(userId: string, data: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.id !== userId) {
    return { status: 'error', message: 'Unauthorized' };
  }

  try {
    const { name } = userNameSchema.parse(data);

    await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    revalidatePath('/dashboard/settings');

    return { status: 'success' };
  } catch (error) {
    console.error('Failed to update username:', error);

    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Something went wrong',
    };
  }
}
