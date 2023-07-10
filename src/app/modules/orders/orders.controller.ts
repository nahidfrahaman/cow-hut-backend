import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendeResponse';
import { OrdersServie } from './oders.service';

const postOrders = catchAsync(async (req: Request, res: Response) => {
  const createUserData = req.body;

  const results = await OrdersServie.postOrders(createUserData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'congratualtion !! cow purchase Successfuly',
    data: results,
  });
});

const getSpecifiqOrders = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;

  const results = await OrdersServie.getSpecefiqOrder(req.params.id, userData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'oders retrive Successfuly',
    data: results,
  });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user;

  const results = await OrdersServie.getAllOrders(req.params.id, userData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'oders retrive Successfuly',
    data: results,
  });
});

export const OrdersController = {
  postOrders,
  getAllOrders,
  getSpecifiqOrders,
};
