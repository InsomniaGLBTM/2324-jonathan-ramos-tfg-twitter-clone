import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Namespaces } from '@/core/constants/namespaces.constants';
import TranslationsProvider from '@/core/providers/i18n/TranslationsProvider';
import initTranslations from '@/core/services/i18n/i18n.service';
import { ComplexUser } from '@/core/types/user.types';
import { getLocaleFromCookies } from '@/core/utils/cookies.utils';
import { EditUserForm } from './EditUserForm';

type Props = {
  user: ComplexUser;
};

const i18nNamespaces = [Namespaces.PROFILE, Namespaces.COMMON];

export default async function EditUserButton({ user }: Props) {
  const locale = getLocaleFromCookies();
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-background">
            {t('edit')}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div>
              <p className="text-lg font-semibold"> {t('edit')}</p>
            </div>
          </DialogHeader>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <EditUserForm user={user} />
          </TranslationsProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
