import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  user: Types.ObjectId | IUser;
  role: string;
  reviews:string[];
};
export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookSearch = { searchTerm?: string };
