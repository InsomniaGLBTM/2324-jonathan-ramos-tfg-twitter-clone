'use server';

import { db } from '@/lib/db';
import { LikePostSchema } from '@/schemas';
import { z } from 'zod';
export const likePost = async (data: z.infer<typeof LikePostSchema>) => {
  const validateFields = LikePostSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }
  const { postId, userId, isLiked } = validateFields.data;
  try {
    isLiked
      ? await db.post.update({
          where: { id: postId },
          data: {
            likedBy: {
              disconnect: {
                id: userId,
              },
            },
          },
        })
      : await db.post.update({
          where: { id: postId },
          data: {
            likedBy: {
              connect: {
                id: userId,
              },
            },
          },
        });
  } catch {
    return { error: 'error' };
  }

  return { success: 'success' };
};
