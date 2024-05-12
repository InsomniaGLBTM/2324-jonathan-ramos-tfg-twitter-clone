import { Toaster } from '@/components/ui/toaster';
import { AuthContainer } from '@/core/components/auth/AuthContainer';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <AuthContainer>
        {children}
        <Toaster />
      </AuthContainer>
    </main>
  );
}
