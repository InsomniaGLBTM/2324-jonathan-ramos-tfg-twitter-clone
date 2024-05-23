import Post from '@/core/components/mainApp/posts/Post';
import Posts from '@/core/components/mainApp/posts/Posts';
import ReplyHeader from '@/core/components/mainApp/status/ReplyHeader';
import { Namespaces } from '@/core/constants/namespaces.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { auth } from '@/core/services/nextAuth/auth.service';
import { getPostById } from '@/core/utils/db/post.utils';

type Props = {
  params: { postId: string; locale: string };
};

const i18nNamespaces = [Namespaces.STATUS];

export default async function PostPage({ params: { postId, locale } }: Props) {
  const session = await auth();
  const post = await getPostById(postId);
  const { t } = await initTranslations(locale, i18nNamespaces);

  if (!post) {
    return (
      <div className="w-full flex mt-20 justify-center">
        <p className="font-bold text-2xl">{t('notFound')}</p>
      </div>
    );
  }
  const replyPostIds = post.replyTo.map((replyTo) => replyTo.id);
  replyPostIds.push(post.id);

  return (
    <div>
      {post.replyTo.length !== 0 && (
        <Posts session={session!} posts={post.replyTo} />
      )}
      <Post post={post} session={session!} />
      <ReplyHeader session={session!} replyPostIds={replyPostIds} />
      <Posts session={session!} posts={post.replies} />
    </div>
  );
}
