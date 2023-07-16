import { z } from 'zod';

const createUserzodValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
    role: z.string({
      required_error: 'role is required',
    }),
  }),
});

export const UserValidation = {
  createUserzodValidationSchema,
};
