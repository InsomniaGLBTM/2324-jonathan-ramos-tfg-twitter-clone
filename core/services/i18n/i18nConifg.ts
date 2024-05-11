import { locale, locales } from '@/core/constants/locales.constants';
import { Config } from 'next-i18n-router/dist/types';

export const i18nConfig: Config = {
  locales: locales,
  defaultLocale: locale.EN,
  noPrefix: true,
};
