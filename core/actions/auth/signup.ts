'use server';

import { SignupSchema } from '@/schemas';
import { z } from 'zod';

export const sigup = async (data: z.infer<typeof SignupSchema>) => {
  const validateFields = SignupSchema.safeParse(data);
  console.log(data);
  if (!validateFields.success) {
    return { error: 'error' };
  }
  return { success: 'success' };
};
