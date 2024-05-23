import Posts from '@/core/components/mainApp/posts/Posts';
import ProfileHeader from '@/core/components/mainApp/profile/ProfileHeader';
import { Namespaces } from '@/core/constants/namespaces.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { auth } from '@/core/services/nextAuth/auth.service';
import { getUserByusername } from '@/core/utils/db/user.utils';

type Props = {
  params: { username: string; locale: string };
};

const i18nNamespaces = [Namespaces.PROFILE];

export default async function Profile({ params: { username, locale } }: Props) {
  const session = await auth();
  const user = await getUserByusername(username);
  const { t } = await initTranslations(locale, i18nNamespaces);

  if (!user) {
    return (
      <div className="w-full flex mt-20 justify-center">
        <p className="font-bold text-2xl">{t('notFound')}</p>
      </div>
    );
  }

  let isCurrentUserProfile = false;

  if (session?.user.id === user?.id) {
    isCurrentUserProfile = true;
  }
  return (
    <div>
      <ProfileHeader user={user} isCurrentUserProfile={isCurrentUserProfile} />
      <Posts posts={user?.post} session={session!} />
    </div>
  );
}
