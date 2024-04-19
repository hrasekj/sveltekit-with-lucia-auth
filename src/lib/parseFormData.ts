import type { ZodIssue, ZodObject, infer as ZodInfer } from 'zod';

type SuccessResult<Data extends Record<string, unknown>> = {
  success: true;
  data: Data;
};

type ErrorResult = {
  success: false;
  errors: ZodIssue[];
};

/**
 * Parse a FormData instance into a valid object based on a Zod schema.
 */
export function parseFormData<
  TSchema extends ZodObject<any, any>,
  TFormData extends ZodInfer<TSchema>
>(schema: TSchema, formData: FormData): SuccessResult<TFormData> | ErrorResult {
  const data = {} as any;

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  const validFormData = schema.safeParse(data);

  if (!validFormData.success) {
    return {
      success: false,
      errors: validFormData.error.errors
    };
  }

  return {
    success: true,
    data: validFormData.data as TFormData
  };
}
