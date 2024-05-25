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
import { sigup } from '@/core/actions/auth/signup';
import { Namespaces } from '@/core/constants/namespaces.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import { SignupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

export const SignupForm = () => {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      username: '',
    },
  });

  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    startTransition(() => {
      sigup(data).then((response) => {
        response?.success &&
          toast({
            variant: 'default',
            title: t(`${response.success}`, { ns: Namespaces.COMMON }),
          });
        response?.error
          ? toast({
              variant: 'destructive',
              title: t(`${response.error}`, { ns: Namespaces.COMMON }),
            })
          : router.push(ROUTES.auth.login);
      });
    });
  };
  return (
    <div className="space-y-8">
      <h3 className="font-semibold text-2xl">{t('signupHeader')}</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('name')}
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('username')}
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            variant={'secondary'}
          >
            {t('create')}
          </Button>
        </form>
      </Form>
      <p>
        {t('already')}{' '}
        <Link href={ROUTES.auth.login} className="text-sky-500 hover:underline">
          {t('login')}
        </Link>
      </p>
    </div>
  );
};
