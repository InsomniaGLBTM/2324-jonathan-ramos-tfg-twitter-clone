'use server';

import { getUserByEmail } from '@/core/utils/db/user.utils';
import { db } from '@/lib/db';
import { SignupSchema } from '@/schemas';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

export const sigup = async (data: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }

  const { email, name, password, username } = validateFields.data;

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) {
    return { error: 'user' };
  }

  await db.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  return { success: 'success' };
};
