import { Button } from '@/components/ui/button';
import { followUnfollowUser } from '@/core/actions/user/followUnfollowUser';
import { Namespaces } from '@/core/constants/namespaces.constants';
import initTranslations from '@/core/services/i18n/i18n.service';
import { getLocaleFromCookies } from '@/core/utils/cookies.utils';

const i18nNamespaces = [Namespaces.PROFILE];

type Props = {
  sessionUserId: string;
  userId: string;
  isFollowed: boolean;
};

export default async function FollowUserButton({
  sessionUserId,
  userId,
  isFollowed,
}: Props) {
  const locale = getLocaleFromCookies();
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <form
      action={async () => {
        'use server';
        await followUnfollowUser({
          sessionUserId,
          userId,
          isFollow: isFollowed,
        });
      }}
    >
      {isFollowed ? (
        <Button
          type="submit"
          variant="outline"
          className="bg-background hover:text-red-600 hover:bg-red-950 hover:bg-opacity-30 hover:border-red-700"
          data-hover={t('unfollow')}
        >
          {t('following')}
        </Button>
      ) : (
        <Button type="submit" variant="secondary">
          {t('follow')}
        </Button>
      )}
    </form>
  );
}
