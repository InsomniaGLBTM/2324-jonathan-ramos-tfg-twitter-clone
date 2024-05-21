import clsx from 'clsx';
import Link from 'next/link';

type Props = {
  title: string;
  icon: React.ReactNode;
  href: string;
  pathname: string;
};

export default function NavLink({ title, icon, href, pathname }: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex content-center rounded-full pl-3 pr-7 py-3 w-fit hover:backdrop-brightness-150',
        {
          'font-semibold': pathname === href,
        }
      )}
    >
      {icon}
      <h4 className="text-2xl antialiased ml-4">{title}</h4>
    </Link>
  );
}
