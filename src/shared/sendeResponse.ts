import { Response } from 'express';

export type IApiResponsetype<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const sendResponse = <T>(res: Response, data: IApiResponsetype<T>) => {
  const ResponseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null || undefined,
    data: data.data || null,
  };
  return res.status(data.statusCode).json(ResponseData);
};

export default sendResponse;
