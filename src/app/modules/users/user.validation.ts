import { z } from 'zod';

const createUserzodValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }),
    email: z.string({ required_error: 'email is required' }),
    password: z.string({ required_error: 'password is required' }),
  }),
});

export const UserValidation = {
  createUserzodValidationSchema,
};
