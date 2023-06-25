"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_codes_1 = require("http-status-codes");
const apiError_1 = __importDefault(require("../../../errror/apiError"));
const paginationhelper_1 = require("../../../helper/paginationhelper");
const user_model_1 = require("../user/user.model");
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = require("./cow.model");
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const results = (yield cow_model_1.Cow.create(payload)).populate('seller');
    return results;
});
const getCows = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    let whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const sortConditions = {};
    const { page, limit, skip, sortBy, sortOrder } = paginationhelper_1.paginationHelper.calculatePagination(paginationOption);
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    console.log('where:', whereCondition, 'and:', andCondition);
    const maxFilter = {
        price: { $lte: parseInt(filtersData.maxPrice) },
    };
    const minFilter = {
        price: { $gte: parseInt(filtersData.minPrice) },
    };
    if (Object.hasOwnProperty.call(filtersData, 'maxPrice')) {
        whereCondition = maxFilter;
    }
    if (Object.hasOwnProperty.call(filtersData, 'minPrice')) {
        whereCondition = minFilter;
    }
    const results = yield cow_model_1.Cow.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            total: total,
        },
        data: results,
    };
});
const updateCow = (id, sellerdata, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userNumber } = sellerdata;
    console.log('form service ', userNumber);
    const isSellerExist = yield user_model_1.User.findOne({ phoneNumber: userNumber });
    console.log('issellerExist form service :', isSellerExist);
    if (!isSellerExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'forbiddens');
    }
    const results = yield cow_model_1.Cow.findOneAndUpdate({ _id: id, seller: isSellerExist._id }, updatedData, { new: true });
    if (!results) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'your are not owner of this cow');
    }
    return results;
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield cow_model_1.Cow.findById(id);
    return results;
});
const deleteCow = (id, sellerData) => __awaiter(void 0, void 0, void 0, function* () {
    const { userNumber } = sellerData;
    const isSellerExist = yield user_model_1.User.findOne({ phoneNumber: userNumber });
    if (!isSellerExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'forbiddens');
    }
    const results = yield cow_model_1.Cow.findOneAndDelete({
        _id: id,
        seller: isSellerExist._id,
    });
    console.log('results :', results);
    if (!results) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'your are not owner of this cow');
    }
    return results;
});
exports.CowService = {
    createCow,
    getCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
