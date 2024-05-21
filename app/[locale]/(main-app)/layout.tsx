import NavBar from '@/core/components/mainApp/layout/NavBar/NavBar';
import React from 'react';

export default async function MainAppLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  return (
    <div className="flex h-screen justify-center divide-x-[1px] divide-gray-600">
      <NavBar locale={locale} />
      <div className="max-w-[600px] min-w-[600px]">{children}</div>
      <div></div>
    </div>
  );
}
