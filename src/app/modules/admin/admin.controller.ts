import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config/index';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendeResponse';
import { ILoginResponse } from './admin.interface';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const createdAdminData = req.body;

  const results = await AdminService.createAdmin(createdAdminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'admin created Successfuly',
    data: results,
  });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { ...loginData } = req.body;
  const results = await AdminService.login(loginData);
  const { refreshToken, ...others } = results;

  const cookieOption = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOption);

  sendResponse<ILoginResponse>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user login successfuly',
    data: others,
  });
});

const refreshToken = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;
    const results = await AdminService.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user login successfuly',
      data: results,
    });
  }
);

export const AdminController = {
  createAdmin,
  login,
  refreshToken,
};
