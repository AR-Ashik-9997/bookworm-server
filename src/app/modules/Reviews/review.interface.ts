import { Types } from "mongoose";
import { IBook } from "../books/book.interface";

export type IReview = {
  bookId: Types.ObjectId | IBook;
  reviews: string[];
};
