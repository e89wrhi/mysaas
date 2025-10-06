import prisma from '@/lib/prisma';
import { getBlurDataURL } from '@/lib/utils';
import { BlogPost } from '@prisma/client';

type NotePost = Omit<BlogPost, 'coverImageId' | 'authorId'> & {
  blurDataURL: string | null;
  coverImageUrl: string | null;
  author?: {
    id: string;
    name: string;
    bio: string | null;
    avatarUrl: string | null;
  } | null;
};

export async function GET(req: Request) {
  const { search } = Object.fromEntries(new URL(req.url).searchParams);
  const posts = await fetchPosts(search as string);
  return new Response(JSON.stringify(posts), { status: 200 });
}

export async function fetchPosts(
  query?: string,
  take = 10,
  skip = 0
): Promise<NotePost[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whereFilter: any = { published: true };
  if (query && query.trim() !== '') {
    whereFilter.OR = [
      { title: { contains: query.trim(), mode: 'insensitive' } },
      { excerpt: { contains: query.trim(), mode: 'insensitive' } },
      { content: { contains: query.trim(), mode: 'insensitive' } },
    ];
  }

  const postsFromDb = await prisma.blogPost.findMany({
    where: whereFilter,
    include: {
      coverImage: true,
      author: { include: { avatar: true } },
    },
    skip,
    take,
    orderBy: { createdAt: 'desc' },
  });

  return Promise.all(
    postsFromDb.map(async (post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author
        ? {
            id: post.author.id,
            name: post.author.name,
            bio: post.author.bio,
            avatarUrl: post.author.avatar?.url ?? null,
          }
        : null,
      coverImageUrl: post.coverImage?.url ?? null,
      blurDataURL: post.coverImage
        ? await getBlurDataURL(post.coverImage.url)
        : null,
    }))
  );
}
