import { auth } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { headers } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { z } from 'zod';

// Helper for error handling
const handleError = (res: NextApiResponse, error: Error) => {
  console.error(error);
  res.status(400).json({ error: error.message || 'Something went wrong' });
};

const prisma = new PrismaClient();
export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const bodySchema = z.object({
      userId: z.string(),
    });
    const { userId } = bodySchema.parse(req.body);

    // Get session (adapt this to your auth setup)
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      return res.status(401).json({ error: 'You are not signed in' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    handleError(res, err);
  }
};
