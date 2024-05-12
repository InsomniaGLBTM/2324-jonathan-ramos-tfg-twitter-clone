import { SignupForm } from '@/core/components/auth/SignupForm';
import { Namespaces } from '@/core/constants/namespaces.constants';
import TranslationsProvider from '@/core/providers/i18n/TranslationsProvider';
import initTranslations from '@/core/services/i18n/i18n.service';

const i18nNamespaces = [Namespaces.AUTH, Namespaces.COMMON];

export default async function Signup({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <SignupForm />
    </TranslationsProvider>
  );
}
