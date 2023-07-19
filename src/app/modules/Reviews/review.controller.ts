import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponseApi';
import httpStatus from 'http-status';
import { ReviewService } from './review.service';
import { IBook } from '../books/book.interface';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...reviewData } = req.body;
  const result = await ReviewService.createReview(reviewData);
  sendResponse<IBook>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review added successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
