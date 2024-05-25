'use server';

import { ROUTES } from '@/core/constants/routes.constants';
import { db } from '@/lib/db';
import { LikePostSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
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
    revalidatePath(ROUTES.mainApp.home);
  } catch {
    return { error: 'error' };
  }

  return { success: 'success' };
};
