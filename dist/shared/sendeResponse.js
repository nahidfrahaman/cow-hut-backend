'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sendResponse = (res, data) => {
  const ResponseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  return res.status(data.statusCode).json(ResponseData);
};
exports.default = sendResponse;
