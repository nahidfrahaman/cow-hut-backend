// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationhelper';
import { IpaginationOption } from '../../../interface/paginationOption';
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

const updateCow = async (id: string, updatedData: Partial<ICow>) => {
  const results = await Cow.findByIdAndUpdate(id, updatedData, { new: true });
  return results;
};

const getSingleCow = async (id: string) => {
  const results = await Cow.findById(id);
  return results;
};
const deleteCow = async (id: string) => {
  const results = await Cow.findByIdAndDelete(id);
  return results;
};

export const CowService = {
  createCow,
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
