import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helper/jwtHelper';
import { IUser } from '../users/user.interface';
import { User } from '../users/user.model';
import ApiError from '../../../eroors/apiErrorHandler';
import httpStatus from 'http-status';
import {
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import bcrypt from 'bcrypt';

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const LoginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;
  const user = new User();
  const isExistUser = await user.isExistEmail(email);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (
    isExistUser?.password &&
    !(await bcrypt.compare(password, isExistUser?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect');
  }

  const { _id } = (await User.findOne({ email: email }, { _id: 1 }).lean()) as {
    _id: string;
  };
  const { role, email: useremail } = isExistUser;
  const accessToken = jwtHelper.createToken(
    { _id, role, useremail },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelper.createToken(
    { _id, role, useremail },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return { accessToken, refreshToken,userId:_id}; 
};

const RefreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verified = null;
  try {
    verified = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token');
  }

  const { _id } = verified;

  const isExistUser = await User.findById(_id);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const { _id: id, role } = isExistUser;
  const newAccessToken = jwtHelper.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return { accessToken: newAccessToken };
};

export const authService = {
  createUser,
  LoginUser,
  RefreshToken, 
};
