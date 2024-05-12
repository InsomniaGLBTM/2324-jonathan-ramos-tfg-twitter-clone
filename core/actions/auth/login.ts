'use server';

import { LoginSchema } from '@/schemas';
import { z } from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }
  return { error: 'success' };
};
