import { createSession, setSessionCookie } from '$lib/server/auth';
import { userRepository } from '$lib/server/db';
import { generateRandomId, hashPassword } from '$lib/server/password';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (event) => {
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
      const salt = generateRandomId();
      const hashedPassword = await hashPassword(salt, password);

      const user = await userRepository.createUser({
        email,
        salt,
        password: hashedPassword
      });

      const session = await createSession(user.id);
      setSessionCookie(event, session);
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        return fail(409, {
          message: 'Email already in use'
        });
      }

      throw err;
    }

    redirect(302, '/');
  }
};
