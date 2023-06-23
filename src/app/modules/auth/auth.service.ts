import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errror/apiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { AuthUser } from './auth.model';

const createUser = async (data: IUser) => {
  const { password, ...userData } = data;

  const newUser = await User.create(userData);
  if (!newUser) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'user created failed');
  }

  const AuthUserData = {
    password: password,
    role: userData.role,
    id: newUser._id,
  };
  let newCreatedData = null;

  if (newUser && Object.keys(newUser).length > 0) {
    const authUser = (await AuthUser.create(AuthUserData)).populate('id');
    newCreatedData = authUser;
    console.log(authUser);
  }
  return newCreatedData;
};

export const AuthService = {
  createUser,
};
