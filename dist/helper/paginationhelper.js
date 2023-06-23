'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.paginationHelper = void 0;
const calculatePagination = opiton => {
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
exports.paginationHelper = {
  calculatePagination,
};
