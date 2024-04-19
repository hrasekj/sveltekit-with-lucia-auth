import { object, string } from 'zod';

export const LoginSchema = object({
  email: string().email().trim().toLowerCase(),
  password: string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message:
      'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
  })
});
