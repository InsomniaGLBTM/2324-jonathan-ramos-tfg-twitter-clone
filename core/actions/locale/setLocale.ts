'use server';

import { Cookies } from '@/core/constants/cookies.constants';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const setLocale = async (locale: string) => {
  cookies().set(Cookies.LOCALE, locale);
  revalidatePath('/');
};
