import { Namespaces } from '@/core/constants/namespaces.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { getLocaleFromCookies } from '@/core/utils/cookies.utils';
import { getRoute } from '@/core/utils/route.utils';
import { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import PostForm from './PostForm';

type Props = { session: Session };

const i18nNamespaces = [Namespaces.HOME];

export default async function Header({ session }: Props) {
  const profileRoute = getRoute(
    ROUTES.mainApp.profile,
    session?.user?.username
  );
  const locale = getLocaleFromCookies();
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="flex p-4 w-full border-b-[2px] border-gray-600">
      <Link href={profileRoute} className="self-start">
        <Image
          src={session?.user?.image || '/profile-picture.png'}
          alt={t('profilePicture')}
          width={40}
          height={40}
          className="rounded-full"
        />
      </Link>
      <PostForm
        placeholder={t('postPlaceholder')}
        buttonText={t('tweet')}
        userId={session?.user.id}
      />
    </div>
  );
}
