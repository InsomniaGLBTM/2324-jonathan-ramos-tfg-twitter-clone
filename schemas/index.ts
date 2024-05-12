import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'emailError' }),
  password: z.string().min(1, { message: 'emptyError' }),
});

export const SignupSchema = z.object({
  email: z.string().email({ message: 'emailError' }),
  password: z.string().min(6, { message: 'passwordError' }),
  name: z.string().min(1, { message: 'emptyError' }),
  username: z.string().min(1, { message: 'emptyError' }),
});
