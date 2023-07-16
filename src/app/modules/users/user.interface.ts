/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  email: string;
  password: string;
  role:"user";
};

export type IUserLoginMethod = {
  isExistEmail(email: string): Promise<Partial<IUser> | null>;
};
export type UserModel = Model<IUser, Record<string, unknown>, IUserLoginMethod>;
