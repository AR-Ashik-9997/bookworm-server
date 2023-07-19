export type IRefreshTokenResponse = {
  accessToken: string;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string; 
  userId?: string;
};
