import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: id as string },
      include: { coverImage: true, author: true },
    });

    if (!post) return res.status(404).json({ error: 'Blog post not found' });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
