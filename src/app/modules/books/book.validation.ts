import { z } from 'zod';

const createBookzodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genres is required' }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),
  }),
});
const UpdateBookzodValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    author: z.string({ required_error: 'Author is required' }).optional(),
    genre: z.string({ required_error: 'Genres is required' }).optional(),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }).optional(),
  }),
});

export const BookValidation = {
  createBookzodValidationSchema,
  UpdateBookzodValidationSchema,
};
