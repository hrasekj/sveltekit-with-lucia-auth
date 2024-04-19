import { object, string } from 'zod';

export const LoginSchema = object({
  email: string().email().trim().toLowerCase(),
  password: string()
});
