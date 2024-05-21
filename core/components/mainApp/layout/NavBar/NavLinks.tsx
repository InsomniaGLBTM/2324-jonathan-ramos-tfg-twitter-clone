'use client';

import { IconSize } from '@/core/constants/iconSize.constants';
import { ROUTES } from '@/core/constants/routes.constants';
import { getRoute } from '@/core/utils/route.utils';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { BiHomeCircle } from 'react-icons/bi';
import { IoPersonOutline, IoSettingsOutline } from 'react-icons/io5';
import NavLink from './NavLink';

type Props = {
  session: Session | null;
};

const ICON_SIZE = IconSize.mainApp.navBar;

export default function NavLinks({ session }: Props) {
  const pathname = usePathname();
  const { t } = useTranslation();

  const profileRoute = getRoute(
    ROUTES.mainApp.profile,
    session?.user?.username!
  );

  return (
    <div className="space-y-2">
      <NavLink
        title={t('home')}
        icon={<BiHomeCircle size={ICON_SIZE} />}
        href={ROUTES.mainApp.home}
        pathname={pathname}
      />
      <NavLink
        title={t('profile')}
        icon={<IoPersonOutline size={ICON_SIZE} />}
        href={profileRoute}
        pathname={pathname}
      />
      <NavLink
        title={t('settings')}
        icon={<IoSettingsOutline size={ICON_SIZE} />}
        href={ROUTES.mainApp.settings}
        pathname={pathname}
      />
    </div>
  );
}
