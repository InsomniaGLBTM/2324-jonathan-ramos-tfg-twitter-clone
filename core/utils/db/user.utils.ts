import { ComplexUser } from '@/core/types/user.types';
import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({ where: { email } });
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch {
    return null;
  }
};

export const getUserByusername = async (username: string) => {
  try {
    return (await db.user.findUnique({
      where: { username },
      include: {
        followedBy: { select: { id: true } },
        following: { select: { id: true } },
        post: {
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
                name: true,
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
        },
      },
    })) as ComplexUser;
  } catch {
    return null;
  }
};
