'use server';

import { ROUTES } from '@/core/constants/routes.constants';
import { db } from '@/lib/db';
import { ReplyPostSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
export const reply = async (data: z.infer<typeof ReplyPostSchema>) => {
  const validateFields = ReplyPostSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }
  const { body, userId, replyPostIds } = validateFields.data;

  const post = await db.post.create({
    data: {
      body: body,
      userId: userId,
      replyTo: {
        connect: replyPostIds.map((id) => ({ id })),
      },
    },
  });
  console.log(post);
  revalidatePath(ROUTES.mainApp.home);

  return { success: 'success' };
};
