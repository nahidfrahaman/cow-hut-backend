import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendeResponse';
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

export const AuthController = {
  createUser,
};
