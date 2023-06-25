/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errror/apiError';
import { JwtHelpers } from '../../../helper/jwtHelper';
import { ILoignUser } from '../../../interface/common';
import { IRfreshResponse } from '../admin/admin.interface';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (payload: IUser) => {
  const { role, budget, phoneNumber } = payload;
  console.log('role : ', role, 'buddget : ', budget);
  if (role === 'buyer' && (budget === undefined || budget <= 0)) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'plz put your buddget');
  }

  if (role === 'seller' && (budget === undefined || budget > 0)) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'remove your buddget');
  }
  const isExistAlreadyExist = await User.isUserExist(phoneNumber);
  if (isExistAlreadyExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'phone number must be unique');
  }

  const results = await User.create(payload);
  if (!results) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user created failed');
  }

  const { password, ...othersData } = results.toObject();

  return othersData;
};

const login = async (payload: ILoignUser) => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User does not find');
  }

  const isPassMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  );
  if (!isPassMatched) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      'unAuthorized password does not match'
    );
  }
  const { phoneNumber: userNumber, role, needPasswordChange } = isUserExist;
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

  const isAdminExist = await User.isUserExist(userNumber);
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

export const AuthService = {
  createUser,
  login,
  refreshToken,
};
