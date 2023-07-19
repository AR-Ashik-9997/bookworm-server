import express from 'express';
import requestValidation from '../../../middleware/requestValidation';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
const router = express.Router();
router.post(
  '/',
  requestValidation(ReviewValidation.createReviewzodValidationSchema),
  ReviewController.createReview
);

export const ReviewRoutes = router;
