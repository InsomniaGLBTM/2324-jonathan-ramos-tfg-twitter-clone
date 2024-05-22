import { cookies } from 'next/headers';
import { Cookies } from '../constants/cookies.constants';
import { locale } from '../constants/locales.constants';

export const getLocaleFromCookies = () => {
  return cookies().get(Cookies.LOCALE)?.value || locale.EN;
};
