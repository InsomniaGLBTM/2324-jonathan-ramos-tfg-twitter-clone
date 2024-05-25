import { getUserById } from '@/core/utils/db/user.utils';
import { db } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth, { type DefaultSession } from 'next-auth';
import authConfig from './auth.config';

type ExtendedUser = DefaultSession['user'] & {
  username: string;
  name: string;
  id: string;
  image: string | null | undefined;
  profileCoverImage: string | null | undefined;
};
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        const user = await getUserById(token.sub);

        session.user.username = user?.username || '';
        session.user.name = user?.name || '';
        session.user.id = user?.id || '';
        session.user.image = user?.image;
        session.user.profileCoverImage = user?.profileCoverImage;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
