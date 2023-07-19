import { IReview } from './review.interface';
import { Book } from '../books/book.model';
import { IBook } from '../books/book.interface';

const createReview = async (payload: IReview): Promise<IBook | null> => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: payload.bookId },
      { $push: { reviews: payload.reviews } },
      { new: true }
    );
    return updatedBook;
  } catch (error) {
    return null;
  }
};

export const ReviewService = {
  createReview,
};
