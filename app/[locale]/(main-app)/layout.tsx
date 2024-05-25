import NavBar from '@/core/components/mainApp/layout/NavBar/NavBar';
import React from 'react';

export default async function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen h-screen divide-x-[1px] divide-gray-600 fixed">
      <div className="xl:min-w-[600px] md:min-w-[300px]  flex justify-end b">
        <NavBar />
      </div>
      <div className="flex-1 flex overflow-y-auto">
        <div className="max-w-[600px] min-w-[600px] h-full">{children}</div>
        <div className="flex-1 h-full"></div>
      </div>
    </div>
  );
}
