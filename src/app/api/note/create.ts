import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImageId,
      authorId,
      tags,
      published,
      createdAt,
      updatedAt,
    } = req.body;

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImageId,
        authorId,
        tags,
        published,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
