import { IconSize } from '@/core/constants/iconSize.constants';
import { Namespaces } from '@/core/constants/namespaces.constants';
import TranslationsProvider from '@/core/providers/i18n/TranslationsProvider';
import initTranslations from '@/core/services/i18n/i18n.service';
import { auth } from '@/core/services/nextAuth/auth.service';
import { FaTwitter } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import NavLinks from './NavLinks';
type Props = {
  locale: string;
};

const i18nNamespaces = [Namespaces.NAV_BAR];

export default async function NavBar({ locale }: Props) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const session = await auth();

  return (
    <div className="md:min-w-[250px] pt-2">
      <FaTwitter
        size={IconSize.mainApp.navBar}
        className="text-sky-500 mb-6 ml-3"
      />
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <NavLinks session={session} />
      </TranslationsProvider>
      <div className="mt-2">
        <LogoutButton buttonTitle={t('logout')} />
      </div>
    </div>
  );
}
