/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import mongoose from 'mongoose';
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

export const UserService = {
  getAllUser,
  getSingleUser,
  updateUser,
  userDelete,
};
