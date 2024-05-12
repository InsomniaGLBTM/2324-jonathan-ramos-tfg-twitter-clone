'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { login } from '@/core/actions/auth/login';
import { namespaces } from '@/core/constants/namespaces.constants';
import { Routes } from '@/core/constants/routes.constants';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const LoginForm = () => {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(data).then((response) => {
        response?.error &&
          toast({
            variant: 'destructive',
            title: t('error', { ns: namespaces.COMMON }),
          });
      });
    });
  };
  return (
    <div className="space-y-8">
      <h3 className="font-semibold text-2xl">{t('header')}</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('email')}
                    type="email"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage errorMessage={t('emailError')} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('password')}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage errorMessage={t('passwordError')} />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant={'secondary'}
          >
            {t('login')}
          </Button>
        </form>
      </Form>
      <Link href={Routes.FORGOT_PASSWORD}>
        <Button
          type="button"
          className="w-full mt-4"
          disabled={isPending}
          variant={'outline'}
        >
          {t('forgotPassword')}
        </Button>
      </Link>
      <p>
        {t('dont')}{' '}
        <Link href={Routes.SIGNUP} className="text-sky-500 hover:underline">
          {t('signUp')}
        </Link>
      </p>
    </div>
  );
};
