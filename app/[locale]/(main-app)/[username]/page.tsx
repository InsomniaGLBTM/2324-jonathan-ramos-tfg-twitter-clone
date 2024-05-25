import Posts from '@/core/components/mainApp/posts/Posts';
import ProfileHeader from '@/core/components/mainApp/profile/ProfileHeader';
import { Namespaces } from '@/core/constants/namespaces.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { auth } from '@/core/services/nextAuth/auth.service';
import { getUserByusername, getUserFollows } from '@/core/utils/db/user.utils';

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
      <div className="w-full flex pt-20 justify-center border-r-[1px] border-gray-600 min-h-screen">
        <p className="font-bold text-2xl">{t('notFound')}</p>
      </div>
    );
  }

  let isCurrentUserProfile = false;
  let isFollowed = false;

  if (session?.user.id === user?.id) {
    isCurrentUserProfile = true;
  } else {
    const userFollows = await getUserFollows(username, session?.user.id!);
    isFollowed = !!userFollows;
  }
  return (
    <div className="border-r-[1px] border-gray-600 min-h-screen">
      <ProfileHeader
        user={user}
        isCurrentUserProfile={isCurrentUserProfile}
        isFollowed={isFollowed}
        sessionUserId={session?.user.id!}
      />
      <Posts posts={user?.post} session={session!} />
    </div>
  );
}
