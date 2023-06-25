/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { StatusCodes } from 'http-status-codes';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errror/apiError';
import { paginationHelper } from '../../../helper/paginationhelper';
import { IpaginationOption } from '../../../interface/paginationOption';
import { User } from '../user/user.model';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow) => {
  const results = (await Cow.create(payload)).populate('seller');
  return results;
};

const getCows = async (
  filters: ICowFilters,
  paginationOption: IpaginationOption
) => {
  const { searchTerm, ...filtersData } = filters;

  type Condition = {
    $or?: { [key: string]: { $regex: string; $options: string } }[];
    $and?: { [key: string]: unknown }[];
  };

  const andCondition: Condition[] = [];
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableFields.map(field => ({
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
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  let whereCondition: any =
    andCondition.length > 0 ? { $and: andCondition } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOption);

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  console.log('where:', whereCondition, 'and:', andCondition);
  const maxFilter = {
    price: { $lte: parseInt(filtersData.maxPrice as string) },
  };
  const minFilter = {
    price: { $gte: parseInt(filtersData.minPrice as string) },
  };

  if (Object.hasOwnProperty.call(filtersData, 'maxPrice')) {
    whereCondition = maxFilter;
  }

  if (Object.hasOwnProperty.call(filtersData, 'minPrice')) {
    whereCondition = minFilter;
  }

  const results = await Cow.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  return {
    meta: {
      page: page,
      limit: limit,
      total: total,
    },
    data: results,
  };
};

const updateCow = async (
  id: string,
  sellerdata: any,
  updatedData: Partial<ICow>
) => {
  const { userNumber } = sellerdata;
  console.log('form service ', userNumber);

  const isSellerExist = await User.findOne({ phoneNumber: userNumber });
  console.log('issellerExist form service :', isSellerExist);
  if (!isSellerExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'forbiddens');
  }

  const results = await Cow.findOneAndUpdate(
    { _id: id, seller: isSellerExist._id },
    updatedData,
    { new: true }
  );
  if (!results) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'your are not owner of this cow');
  }
  return results;
};

const getSingleCow = async (id: string) => {
  const results = await Cow.findById(id);
  return results;
};

const deleteCow = async (id: string, sellerData: any) => {
  const { userNumber } = sellerData;

  const isSellerExist = await User.findOne({ phoneNumber: userNumber });

  if (!isSellerExist) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'forbiddens');
  }

  const results = await Cow.findOneAndDelete({
    _id: id,
    seller: isSellerExist._id,
  });
  console.log('results :', results);
  if (!results) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'your are not owner of this cow');
  }
  return results;
};

export const CowService = {
  createCow,
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
