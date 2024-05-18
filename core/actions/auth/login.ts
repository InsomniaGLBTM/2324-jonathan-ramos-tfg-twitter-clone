'use server';

import { LOGIN_REDIRECT } from '@/core/constants/authRoutes.constants';
import { signIn } from '@/core/services/nextAuth/auth.service';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return { error: 'error' };
  }
  const { email, password } = validateFields.data;

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'credentialsError}' };
        default:
          return { error: 'error}' };
      }
    }
    throw error;
  }
};
