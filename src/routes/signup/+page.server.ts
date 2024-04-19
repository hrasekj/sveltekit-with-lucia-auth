import { createIssue } from '$lib/createIssue';
import { parseFormData } from '$lib/parseFormData';
import { createSession, setSessionCookie } from '$lib/server/auth';
import { userRepository } from '$lib/server/db';
import { generateRandomId, hashPassword } from '$lib/server/password';
import { RegistrationSchema } from '$lib/validations/RegistrationSchema';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const model = parseFormData(RegistrationSchema, formData);

    if (!model.success) {
      return fail(400, {
        errors: model.errors
      });
    }

    const { email, password } = model.data;

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
          errors: [createIssue('Email already in use')]
        });
      }

      throw err;
    }

    redirect(302, '/');
  }
} satisfies Actions;
