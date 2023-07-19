import { z } from 'zod';

const createReviewzodValidationSchema = z.object({
  body: z.object({
    reviews: z.string({ required_error: 'review is required' }),
  }),
});

export const ReviewValidation = {
  createReviewzodValidationSchema,
};
