import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const BooksSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date,required: true},
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Books', BooksSchema);
