'use strict';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrdersServie = void 0;
const mongoose_1 = __importDefault(require('mongoose'));
// Replace with your error library and status codes
const http_status_codes_1 = require('http-status-codes');
const apiError_1 = __importDefault(require('../../../errror/apiError'));
const cow_model_1 = require('../cow/cow.model');
const user_model_1 = require('../user/user.model');
const orders_model_1 = require('./orders.model');
const postOrders = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = payload;
    //   console.log('cowId:', cow, 'buyerId:', buyer);
    const session = yield mongoose_1.default.startSession();
    let results = null;
    try {
      session.startTransaction();
      const buyerData = yield user_model_1.User.findById(buyer);
      const cowData = yield cow_model_1.Cow.findById(cow);
      console.log('buyerData:', buyerData, '\ncowData:', cowData);
      if (
        (buyerData === null || buyerData === void 0
          ? void 0
          : buyerData.budget) !== undefined &&
        (cowData === null || cowData === void 0 ? void 0 : cowData.price) !==
          undefined
      ) {
        if (buyerData.budget < cowData.price) {
          throw new apiError_1.default(
            http_status_codes_1.StatusCodes.BAD_REQUEST,
            'Insufficient budget'
          );
        }
      }
      if (
        (cowData === null || cowData === void 0 ? void 0 : cowData.label) ===
        'soldOut'
      ) {
        throw new apiError_1.default(
          http_status_codes_1.StatusCodes.BAD_REQUEST,
          'already sold'
        );
      }
      const label = {
        label: 'soldOut',
      };
      if (cowData) {
        const updatedlabel = yield cow_model_1.Cow.findByIdAndUpdate(
          cowData._id,
          label,
          {
            new: true,
            session,
          }
        );
        //   console.log(results);
      }
      let remaningbudget;
      if (
        (buyerData === null || buyerData === void 0
          ? void 0
          : buyerData.budget) &&
        cowData
      ) {
        remaningbudget =
          (buyerData === null || buyerData === void 0
            ? void 0
            : buyerData.budget) -
          (cowData === null || cowData === void 0 ? void 0 : cowData.price);
      }
      console.log(remaningbudget);
      if (buyerData) {
        const updatedbuyerbudget = yield user_model_1.User.findByIdAndUpdate(
          buyerData._id,
          {
            budget: remaningbudget,
          },
          { new: true, session }
        );
        console.log('updatebuyerdata: ', updatedbuyerbudget);
        const updatedSellerIncome = yield user_model_1.User.findByIdAndUpdate(
          cowData === null || cowData === void 0 ? void 0 : cowData.seller,
          {
            income:
              cowData === null || cowData === void 0 ? void 0 : cowData.price,
          },
          { new: true, session }
        ).populate('');
        console.log('updatedSellerIncome : ', updatedSellerIncome);
      }
      const finlalresults = yield orders_model_1.Order.create([payload], {
        session,
      });
      results = finlalresults;
      yield session.commitTransaction();
      session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      session.endSession();
      throw error;
    }
    return results;
  });
const getAllOrders = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const results = yield orders_model_1.Order.find();
    return results;
  });
exports.OrdersServie = {
  postOrders,
  getAllOrders,
};
