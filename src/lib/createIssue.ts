import type { ZodIssue } from 'zod';

export function createIssue(message: string): ZodIssue {
  return {
    code: 'custom',
    path: [],
    message
  };
}
