import { setBlankSessionCookie, setSessionCookie, lucia } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session?.fresh) {
    setSessionCookie(event, session);
  }

  if (!session) {
    setBlankSessionCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};
