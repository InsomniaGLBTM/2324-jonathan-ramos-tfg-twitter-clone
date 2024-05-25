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
import { editUser } from '@/core/actions/user/editUser';
import { Namespaces } from '@/core/constants/namespaces.constants';
import { ComplexUser } from '@/core/types/user.types';
import { EditUserSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as z from 'zod';

type Props = { user: ComplexUser };

export const EditUserForm = ({ user }: Props) => {
  const { t } = useTranslation();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
    },
  });

  const onSubmit = (data: z.infer<typeof EditUserSchema>) => {
    startTransition(() => {
      editUser(data).then((response) => {
        response?.error &&
          toast({
            variant: 'destructive',
            title: t('error', { ns: Namespaces.COMMON }),
          });
      });
    });
  };
  return (
    <div className="space-y-8">
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
          <div className=" w-full flex justify-end">
            <Button type="submit" disabled={isPending} variant={'secondary'}>
              {t('edit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
