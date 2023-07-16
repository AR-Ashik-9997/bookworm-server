import { Model, Types } from 'mongoose';
import { IUser } from '../users/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  user: Types.ObjectId | IUser;
};
export type BookModel = Model<IBook, Record<string, unknown>>;
