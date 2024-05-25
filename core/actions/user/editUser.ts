'use server';

import { ROUTES } from '@/core/constants/routes.constants';
import { db } from '@/lib/db';
import { EditUserSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const editUser = async (data: z.infer<typeof EditUserSchema>) => {
  const validateFields = EditUserSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'data' };
  }

  const { id, name } = validateFields.data;

  try {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });
    revalidatePath(ROUTES.mainApp.profile);
  } catch {
    return { error: 'error' };
  }

  return { success: 'success' };
};
