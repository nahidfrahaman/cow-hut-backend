import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errror/apiError';

import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtHelpers } from '../../../helper/jwtHelper';
import { ILoignUser } from '../../../interface/common';
import { IAdmin, IRfreshResponse } from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (data: IAdmin) => {
  const newUser = await Admin.create(data);
  if (!newUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user created failed');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = newUser.toObject();

  return userWithoutPassword;
};

const login = async (payload: ILoignUser) => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User does not find');
  }

  const isPassMatched = await Admin.isPasswordMatched(
    password,
    isAdminExist.password
  );
  if (!isPassMatched) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'unAuthorized password does not match'
    );
  }
  const { phoneNumber: userNumber, role, needPasswordChange } = isAdminExist;
  console.log(userNumber, role);
  // create jwt access token and refresh token
  const accessToken = JwtHelpers.createToken(
    { userNumber, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expired as string
  );

  const refreshToken = JwtHelpers.createToken(
    { userNumber, role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expired as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRfreshResponse> => {
  //verify token
  let verifyToken: string | JwtPayload | null = null;
  try {
    verifyToken = JwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, ' invalid refresh token');
  }
  console.log(verifyToken);

  const { userNumber, role } = verifyToken as JwtPayload;
  console.log('refresh :', userNumber, role);

  const isAdminExist = await Admin.isAdminExist(userNumber);
  if (!isAdminExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'forbidden user not found');
  }

  //generate access token  not : refreshtoken access token nibe
  const newAccessToken = JwtHelpers.createToken(
    { phoneNumber: isAdminExist.phoneNumber, role: isAdminExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expired as string
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AdminService = {
  createAdmin,
  login,
  refreshToken,
};
