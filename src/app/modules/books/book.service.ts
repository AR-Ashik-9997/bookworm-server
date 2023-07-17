import httpStatus from 'http-status';
import { IBook, IBookSearch } from './book.interface';
import { Book } from './book.model';

import ApiError from '../../../eroors/apiErrorHandler';
import { BookSearchableFields } from './book.constant';

const createBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (filters: IBookSearch): Promise<IBook[] | null> => {
  const { searchTerm } = filters;
  const searchResult = [];
  if (searchTerm) {
    searchResult.push({
      $or: BookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  const whereCondition=searchResult.length>0?{$and:searchResult}:{}
  const result = await Book.find(whereCondition);
  return result;
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is not found!');
  }
  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const isExist = await Book.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is not found!');
  }
  const { ...bookData } = payload;
  const updateBookData: Partial<IBook> = { ...bookData };

  const result = await Book.findOneAndUpdate({ _id: id }, updateBookData, {
    new: true,
  });

  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};
export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
