import { SortOrder } from 'mongoose';

type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionResuts = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (opiton: IOption): IOptionResuts => {
  const page = Number(opiton.page || 1);
  const limit = Number(opiton.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = opiton.sortBy || 'createdAt';
  const sortOrder = opiton.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
