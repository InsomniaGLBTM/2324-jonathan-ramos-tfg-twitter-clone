import { ComplexPostType, PostType } from '@/core/types/post.types';
import { db } from '@/lib/db';

export const getAllPosts = async () => {
  try {
    const post = await db.post.findMany({
      where: {
        replyTo: {
          none: {},
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
        likedBy: {
          select: {
            id: true,
          },
        },
        replies: { select: { id: true } },
      },
    });

    return post as PostType[];
  } catch {
    return [];
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
        likedBy: {
          select: {
            id: true,
          },
        },
        replyTo: {
          include: {
            user: {
              select: {
                username: true,
                image: true,
              },
            },
            likedBy: {
              select: {
                id: true,
              },
            },
            replies: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                username: true,
                image: true,
              },
            },
            likedBy: {
              select: {
                id: true,
              },
            },
            replies: true,
            replyTo: true,
          },
        },
      },
    });

    if (post && post.replies) {
      const filteredReplies = post.replies.filter(
        (reply) =>
          reply.replyTo.length > 0 &&
          reply.replyTo[reply.replyTo.length - 1].id === id
      );

      (post as any).repliesCount = post?.replies.length;
      post.replies = filteredReplies;
    }
    return post as unknown as ComplexPostType;
  } catch {
    return {} as ComplexPostType;
  }
};
