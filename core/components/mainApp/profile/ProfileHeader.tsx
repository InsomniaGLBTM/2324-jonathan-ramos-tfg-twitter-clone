import { Namespaces } from '@/core/constants/namespaces.constants';
import { ImageRoute } from '@/core/constants/resources.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { ComplexUser } from '@/core/types/user.types';
import { getLocaleFromCookies } from '@/core/utils/cookies.utils';
import Image from 'next/image';
import EditUserButton from './EditUserButton';

type Props = {
  user: ComplexUser;
  isCurrentUserProfile: boolean;
};

const i18nNamespaces = [Namespaces.PROFILE];

export default async function ProfileHeader({
  user,
  isCurrentUserProfile,
}: Props) {
  const locale = getLocaleFromCookies();
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="border-b-2 border-gray-600">
      <div className="w-full h-40">
        <Image
          src={user.profileCoverImage || ImageRoute.PROFILE_COVER_PICTURE}
          alt="picture"
          width={100}
          height={50}
          className="w-full h-full"
        />
        <Image
          src={user.image || ImageRoute.PROFILE_PICTURE}
          alt="picture"
          width={130}
          height={130}
          className="rounded-full relative bottom-16 left-3 border-[5px] border-background"
        />
      </div>
      <div className="w-full p-3">
        <div className="w-full flex justify-end mb-10">
          {isCurrentUserProfile ? (
            <EditUserButton user={user} />
          ) : (
            <div className="h-6"></div>
          )}
        </div>
        <div>
          <p className="font-bold text-xl">{user.name}</p>
          <p className="text-gray-400">@{user.username}</p>
        </div>
        <div className="flex mt-2">
          <div className="flex">
            <p className="text-md">{user.following?.length}</p>
            <p className="ml-1 text-gray-400">{t('following')}</p>
          </div>
          <div className="ml-5 flex">
            <p className="text-md">{user.followedBy?.length}</p>
            <p className="ml-1 text-gray-400">{t('followers')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
