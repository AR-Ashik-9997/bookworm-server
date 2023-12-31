/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, IUserLoginMethod, UserModel } from './user.interface';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserLoginMethod>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String },    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
userSchema.pre('save', async function (next) {
  const user = this;
  const isExist = await User.findOne({
    email: user.email,
  });
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'user is already exists !');
  }
  next();
});
userSchema.methods.isExistEmail = async function (
  email: string
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { email },
    { role: 1, password: 1, email:1 }
  ).lean();
};
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password; // Exclude the password field from the response
    return ret;
  },
});
export const User = model<IUser, UserModel>('User', userSchema);
