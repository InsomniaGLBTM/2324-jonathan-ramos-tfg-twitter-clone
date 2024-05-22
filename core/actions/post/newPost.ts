'use server';

import { ROUTES } from '@/core/constants/routes.constants';
import { db } from '@/lib/db';
import { CreatePostSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
export const newPost = async (data: z.infer<typeof CreatePostSchema>) => {
  const validateFields = CreatePostSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }
  const { body, userId } = validateFields.data;
  await db.post.create({
    data: {
      body,
      userId,
    },
  });
  revalidatePath(ROUTES.mainApp.home);

  return { success: 'success' };
};
