import {
  UnauthorizedError,
  createBlankSessionCookie,
  createSession,
  createSessionCookie,
  lucia
} from '$lib/server/auth';
import { userRepository } from '$lib/server/db';
import { verifyPassword } from '$lib/server/password';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  login: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const password = formData.get('password');

    if (typeof email !== 'string') {
      return fail(400, {
        message: 'Invalid email'
      });
    }

    if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
      return fail(400, {
        message: 'Invalid password'
      });
    }

    try {
      const existingUser = await userRepository.findUserByEmail(email);

      if (!existingUser) {
        throw new UnauthorizedError();
      }

      const passwordMatched = await verifyPassword(existingUser, password);

      if (!passwordMatched) {
        throw new UnauthorizedError();
      }

      const session = await createSession(existingUser.id);
      createSessionCookie(event, session);

      redirect(302, '/');
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return fail(401, {
          message: 'Invalid email or password'
        });
      }

      throw err;
    }
  },

  logout: async (event) => {
    const sessionId = event.locals.session?.id ?? '';
    await lucia.invalidateSession(sessionId);

    createBlankSessionCookie(event);

    redirect(302, '/');
  }
} satisfies Actions;
