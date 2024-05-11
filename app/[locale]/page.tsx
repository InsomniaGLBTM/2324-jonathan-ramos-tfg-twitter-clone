import TranslationsProvider from '@/core/providers/i18n/TranslationsProvider';
import initTranslations from '@/core/services/i18n/i18n.service';

const i18nNamespaces = ['login'];

export default async function Login({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>{t('header')}</h1>
      </main>
    </TranslationsProvider>
  );
}
