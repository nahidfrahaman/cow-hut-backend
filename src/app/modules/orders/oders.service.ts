/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import mongoose from 'mongoose';
// Replace with your error library and status codes
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errror/apiError';

import { Cow } from '../cow/cow.model';
import { User } from '../user/user.model';
import { IOrders } from './oders.interface';
import { Order } from './orders.model';

const postOrders = async (payload: IOrders) => {
  const { cow, buyer } = payload;
  //   console.log('cowId:', cow, 'buyerId:', buyer);

  const session = await mongoose.startSession();

  let results = null;
  try {
    session.startTransaction();

    const buyerData = await User.findById(buyer);
    const cowData = await Cow.findById(cow);
    // console.log('buyerData:', buyerData, '\ncowData:', cowData);

    if (buyerData?.budget !== undefined && cowData?.price !== undefined) {
      if (buyerData.budget < cowData.price) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Insufficient budget');
      }
    }

    if (cowData?.label === 'soldOut') {
      throw new ApiError(StatusCodes.BAD_REQUEST, 'already sold');
    }
    const label = {
      label: 'soldOut',
    };

    if (cowData) {
      const updatedlabel = await Cow.findByIdAndUpdate(cowData._id, label, {
        new: true,
        session,
      });
      //   console.log(results);
    }

    let remaningbudget;

    if (buyerData?.budget && cowData) {
      remaningbudget = buyerData?.budget - cowData?.price;
    }
    console.log(remaningbudget);
    if (buyerData) {
      const updatedbuyerbudget = await User.findByIdAndUpdate(
        buyerData._id,
        {
          budget: remaningbudget,
        },
        { new: true, session }
      );
      // console.log('updatebuyerdata: ', updatedbuyerbudget);

      const updatedSellerIncome = await User.findByIdAndUpdate(
        cowData?.seller,
        {
          income: cowData?.price,
        },
        { new: true, session }
      ).populate('');
      // console.log('updatedSellerIncome : ', updatedSellerIncome);
    }

    const odersResults = await Order.create([payload], { session });
    if (!odersResults.length) {
      throw new ApiError(StatusCodes.FORBIDDEN, 'forbidden');
    }

    const finalresults = await Order.populate(odersResults, [
      { path: 'cow' },
      { path: 'buyer' },
    ]);

    results = finalresults;
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  return results;
};

const getAllOrders = async (id: string, userData: any) => {
  const { userNumber, role } = userData;
  let results = null;
  if (role === 'buyer') {
    const buyerData = await User.findOne({ phoneNumber: userNumber });
    console.log(buyerData._id);
    results = await Order.find({ _id: id, buyer: buyerData._id })
      .populate('cow')
      .populate('buyer');
  }
  if (role === 'seller') {
    const sellerData = await User.findOne({ phoneNumber: userNumber });
    console.log(sellerData._id);
    const cowData = await Cow.findOne({ seller: sellerData._id });
    if (cowData !== null) {
      results = await Order.find({ _id: id, cow: cowData._id })
        .populate('cow')
        .populate('buyer');
    }
  }
  if (role === 'admin') {
    results = await Order.find().populate('cow').populate('buyer');
  }

  return results;
};

export const OrdersServie = {
  postOrders,
  getAllOrders,
};
