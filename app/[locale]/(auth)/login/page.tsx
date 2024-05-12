import { LoginForm } from '@/core/components/auth/LoginForm';
import { namespaces } from '@/core/constants/namespaces.constants';
import TranslationsProvider from '@/core/providers/i18n/TranslationsProvider';
import initTranslations from '@/core/services/i18n/i18n.service';

const i18nNamespaces = [namespaces.LOGIN, namespaces.COMMON];

export default async function Login({
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
      <LoginForm />
    </TranslationsProvider>
  );
}
