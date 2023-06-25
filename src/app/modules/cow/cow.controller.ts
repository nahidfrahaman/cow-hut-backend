import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendeResponse';
import { paginationOptions } from '../user/user.constant';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const createUserData = req.body;

  const results = await CowService.createCow(createUserData);
  sendResponse<ICow>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cow data created Successfuly',
    data: results,
  });
});

const getCows = catchAsync(async (req: Request, res: Response) => {
  const paginationOption = pick(req.query, paginationOptions);
  const filtersData = pick(req.query, [
    'searchTerm',
    'minPrice',
    'maxPrice',
    'location',
    'category',
  ]);

  const results = await CowService.getCows(filtersData, paginationOption);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cow data retrive Successfuly',
    data: results,
  });
});

const updateCow = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const sellerdata = req.user;
    const id = req.params.id;
    const updatedData = req.body;

    const results = await CowService.updateCow(id, sellerdata, updatedData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user updated Successfuly',
      data: results,
    });
  }
);

const getSingleCow = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const results = await CowService.getSingleCow(id);
    let message = 'get single cow successfuly';
    if (!results) {
      message = 'cow not found';
    }
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: message,
      data: results,
    });
  }
);

const deleteCow = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const sellerData = req.user;

    const results = await CowService.deleteCow(id, sellerData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'cow  deleted Successfuly',
      data: results,
    });
  }
);

export const CowController = {
  createCow,
  getCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
