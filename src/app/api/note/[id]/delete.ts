import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') return res.status(405).end();

  try {
    const { id } = req.body;

    const deleted = await prisma.blogPost.delete({
      where: { id },
    });

    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ error });
  }
}
