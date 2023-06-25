/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errror/apiError';
import { paginationHelper } from '../../../helper/paginationhelper';
import { IpaginationOption } from '../../../interface/paginationOption';
import { AuthUser } from '../auth/auth.model';
import { userSearchabeFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { User } from './user.model';

const getAllUser = async (
  filters: IUserFilters,
  paginationOption: IpaginationOption
) => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationOption);

  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };

  const andCondition: Condition[] = [];

  if (searchTerm) {
    andCondition.push({
      $or: userSearchabeFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const results = await User.find(whereCondition).skip(skip).limit(limit);

  const total = await User.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const results = await User.findById(id);

  return results;
};

const updateUser = async (id: string, updatedData: Partial<IUser>) => {
  const { name, ...userUpdatedData } = updatedData;
  console.log('form service : ', userUpdatedData);
  console.log('form service : name', name);

  const updatedStudentData: Partial<IUser> = { ...userUpdatedData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>; // `name.fisrtName`
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const results = await User.findOneAndUpdate({ _id: id }, updatedStudentData, {
    new: true,
  });
  return results;
};
const userDelete = async (id: string): Promise<IUser | null> => {
  let finalResults = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const results = await User.findByIdAndDelete([id], { session });

    finalResults = results;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteAuthUser = await AuthUser.findOneAndDelete([{ id: id }], {
      session,
    });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  return finalResults;
};

const getmyProfile = async (
  userData: any
): Promise<Partial<IUser[]> | null> => {
  console.log(userData);
  const agg = [
    {
      $match: {
        phoneNumber: '01714516180',
        role: 'seller',
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        phoneNumber: 1,
        address: 1,
      },
    },
  ];
  const results = await User.aggregate(agg);
  let finalResults;
  if (results.length) {
    finalResults = results[0];
  }

  return finalResults;
};

const updateMyProfile = async (userData: any, payload: IUser) => {
  const { userNumber, role } = userData;
  const { name, password, ...updatedData } = payload;

  const updatedUserdData: any = updatedData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const namekey = `name.${key}`;
      updatedUserdData[namekey] = name[key as keyof typeof name];
    });
  }

  if (password) {
    updatedUserdData.password = await bcrypt.hash(
      password,
      Number(config.bcrypt_solt_roud)
    );
  }
  const isUserExist = await User.findOne({ phoneNumber: userNumber });
  if (!isUserExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'fobidden');
  }
  console.log(isUserExist);

  const results = await User.findOneAndUpdate(
    { phoneNumber: userNumber, role },
    updatedUserdData,
    { new: true }
  );
  return results;
};

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  userDelete,
  getmyProfile,
  updateMyProfile,
};
