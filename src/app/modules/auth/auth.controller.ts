import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendeResponse';
import { ILoginResponse } from '../admin/admin.interface';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const createUserData = req.body;

  const results = await AuthService.createUser(createUserData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user created Successfuly',
    data: results,
  });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { ...loginData } = req.body;
  const results = await AuthService.login(loginData);
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
    const results = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user login successful',
      data: results,
    });
  }
);

export const AuthController = {
  createUser,
  login,
  refreshToken,
};
