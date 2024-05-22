import Header from '@/core/components/mainApp/home/header/Header';
import Posts from '@/core/components/mainApp/home/posts/Posts';
import { Namespaces } from '@/core/constants/namespaces.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { auth } from '@/core/services/nextAuth/auth.service';
import { getLocaleFromCookies } from '@/core/utils/cookies.utils';
import { getAllPosts } from '@/core/utils/db/post.utils';

const i18nNamespaces = [Namespaces.HOME];

export default async function Home() {
  const session = await auth();
  const posts = await getAllPosts();
  const locale = getLocaleFromCookies();

  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <div>
      <Header session={session!} />
      <Posts session={session!} posts={posts} notFound={t('notFound')} />
    </div>
  );
}
