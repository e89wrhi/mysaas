import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method !== 'PUT') return res.status(405).end();

  try {
    const updated = await prisma.blogPost.update({
      where: { id: id as string },
      data: {
        ...req.body,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
