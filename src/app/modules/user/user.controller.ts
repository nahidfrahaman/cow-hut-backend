import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendeResponse';
import { paginationOptions, userSearchabeFields } from './user.constant';
import { IUser, IUserFilters } from './user.interface';
import { UserService } from './user.service';

const getAllUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const filters: IUserFilters = pick(req.query, userSearchabeFields);
    console.log(filters);

    const paginationOption = pick(req.query, paginationOptions);

    // const filteredData = pick(req.body, ['role', 'address', 'budget']);
    const results = await UserService.getAllUser(filters, paginationOption);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: results,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const results = await UserService.getSingleUser(id);
    let message = 'get single User successfuly';
    if (!results) {
      message = 'user not found';
    }
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: message,
      data: results,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedData = req.body;
    const results = await UserService.updateUser(id, updatedData);
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user updated Successfuly',
      data: results,
    });
  }
);
const userDelete = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const results = await UserService.userDelete(id);
    sendResponse<IUser>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user deleted Successfuly',
      data: results,
    });
  }
);

const getmyProfile = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userData = req.user;

    const results = await UserService.getmyProfile(userData);
    let message = 'get User profile successfuly';
    if (!results) {
      message = 'user not found';
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: message,
      data: results,
    });
  }
);

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  userDelete,
  getmyProfile,
};
