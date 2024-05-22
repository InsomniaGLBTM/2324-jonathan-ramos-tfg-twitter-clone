import NextAuth from 'next-auth';
import { i18nRouter } from 'next-i18n-router';
import {
  LOGIN_REDIRECT,
  NOT_LOGGED_IN_REDIRECT,
  authRoutes,
} from './core/constants/authRoutes.constants';
import { i18nConfig } from './core/services/i18n/i18nConifg';
import authConfig from './core/services/nextAuth/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { nextUrl } = request;

  const isLoggedIn = !!request.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggedIn && !isAuthRoute) {
    return Response.redirect(new URL(NOT_LOGGED_IN_REDIRECT, nextUrl));
  }
  return i18nRouter(request, i18nConfig);
});

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
