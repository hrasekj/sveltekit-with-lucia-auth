import { string } from 'zod';
import { LoginSchema } from './LoginSchema';

export const RegistrationSchema = LoginSchema.extend({
  password: string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, {
    message:
      'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
  })
  // TODO: Add additional fields for registration
});
