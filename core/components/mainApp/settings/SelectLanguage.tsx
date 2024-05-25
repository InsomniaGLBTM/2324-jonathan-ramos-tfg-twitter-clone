'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setLocale } from '@/core/actions/locale/setLocale';
import { locales } from '@/core/constants/locales.constants';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  locale: string;
};

export default function SelectLanguage({ locale }: Props) {
  const [isPending, startTransition] = useTransition();

  const { t } = useTranslation();
  const onSelectChange = (newLocale: string) => {
    startTransition(() => {
      setLocale(newLocale);
    });
  };
  return (
    <div className="p-6">
      <p className="font-semibold text-2xl">{t('changeLanguage')}</p>
      <div className="mt-6">
        <Select
          onValueChange={onSelectChange}
          disabled={isPending}
          defaultValue={locale}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {locales.map((locale) => {
                return (
                  <SelectItem key={locale} value={locale}>
                    {locale}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
