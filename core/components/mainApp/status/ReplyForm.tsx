'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { reply } from '@/core/actions/post/reply';
import { ReplyPostSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type Props = {
  placeholder?: string;
  buttonText?: string;
  userId?: string;
  replyPostIds?: string[];
};
export default function ReplyForm({
  placeholder = '',
  buttonText = '',
  userId = '',
  replyPostIds = [],
}: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReplyPostSchema>>({
    resolver: zodResolver(ReplyPostSchema),
    defaultValues: {
      body: '',
      userId: userId,
      replyPostIds: replyPostIds,
    },
  });

  const onSubmit = (data: z.infer<typeof ReplyPostSchema>) => {
    startTransition(() => {
      reply(data).then((response) => {
        form.reset();
        // response?.error &&
        //   toast({
        //     variant: 'destructive',
        //     title: t('error', { ns: Namespaces.COMMON }),
        //   });
      });
    });
  };

  return (
    <div className="ml-5 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    minLength={1}
                    maxLength={250}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isPending}>
              {buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
