import { lucia, setBlankSessionCookie } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async (event) => {
    const sessionId = event.locals.session?.id ?? '';

    await lucia.invalidateSession(sessionId);
    setBlankSessionCookie(event);

    redirect(302, '/');
  }
} satisfies Actions;
