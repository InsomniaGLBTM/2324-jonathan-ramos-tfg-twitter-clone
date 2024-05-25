'use server';

import { ROUTES } from '@/core/constants/routes.constants';
import { db } from '@/lib/db';
import { FollowUnfollowUserSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const followUnfollowUser = async (
  data: z.infer<typeof FollowUnfollowUserSchema>
) => {
  const validateFields = FollowUnfollowUserSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'data' };
  }

  const { sessionUserId, userId, isFollow } = validateFields.data;

  try {
    isFollow
      ? await db.user.update({
          where: {
            id: sessionUserId,
          },
          data: {
            following: {
              disconnect: {
                id: userId,
              },
            },
          },
        })
      : await db.user.update({
          where: {
            id: sessionUserId,
          },
          data: {
            following: {
              connect: {
                id: userId,
              },
            },
          },
        });
    revalidatePath(ROUTES.mainApp.profile);
  } catch {
    return { error: 'error' };
  }

  return { success: 'success' };
};
