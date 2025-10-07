import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export async function GET(req: Request) {
  const { search } = Object.fromEntries(new URL(req.url).searchParams);
  const posts = await fetchPosts(search as string);
  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function fetchPosts(
  query?: string,
  take = 10,
  skip = 0
): Promise<User[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereFilter: any = { published: true };
  if (query && query.trim() !== '') {
    whereFilter.OR = [
      { title: { contains: query.trim(), mode: 'insensitive' } },
      { excerpt: { contains: query.trim(), mode: 'insensitive' } },
      { content: { contains: query.trim(), mode: 'insensitive' } },
    ];
  }

  const postsFromDb = await prisma.user.findMany({
    where: whereFilter,
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  });

  return postsFromDb;
}
