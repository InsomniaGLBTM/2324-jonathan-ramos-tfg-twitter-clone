import { NOT_LOGGED_IN_REDIRECT } from '@/core/constants/authRoutes.constants';
import { IconSize } from '@/core/constants/iconSize.constants';
import { signOut } from '@/core/services/nextAuth/auth.service';
import { CgLogOut } from 'react-icons/cg';

type Props = {
  buttonTitle?: string;
};

export default function LogoutButton({ buttonTitle = '' }: Props) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({
          redirectTo: NOT_LOGGED_IN_REDIRECT,
        });
      }}
    >
      <button
        type="submit"
        className="flex content-center rounded-full pl-3 pr-7 py-3 w-fit hover:backdrop-brightness-150 "
      >
        <CgLogOut size={IconSize.mainApp.navBar} />
        <h4 className="text-2xl antialiased ml-4">{buttonTitle}</h4>
      </button>
    </form>
  );
}
