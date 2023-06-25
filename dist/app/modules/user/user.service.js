"use strict";
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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mongoose_1 = __importDefault(require("mongoose"));
const paginationhelper_1 = require("../../../helper/paginationhelper");
const auth_model_1 = require("../auth/auth.model");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const getAllUser = (filters, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationhelper_1.paginationHelper.calculatePagination(paginationOption);
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userSearchabeFields.map(field => ({
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
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const results = yield user_model_1.User.find(whereCondition).skip(skip).limit(limit);
    const total = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page: page,
            limit: limit,
            total: total,
        },
        data: results,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield user_model_1.User.findById(id);
    return results;
});
const updateUser = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = updatedData, userUpdatedData = __rest(updatedData, ["name"]);
    console.log('form service : ', userUpdatedData);
    console.log('form service : name', name);
    const updatedStudentData = Object.assign({}, userUpdatedData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`; // `name.fisrtName`
            updatedStudentData[nameKey] = name[key];
        });
    }
    const results = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedStudentData, {
        new: true,
    });
    return results;
});
const userDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let finalResults = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const results = yield user_model_1.User.findByIdAndDelete([id], { session });
        finalResults = results;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deleteAuthUser = yield auth_model_1.AuthUser.findOneAndDelete([{ id: id }], {
            session,
        });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    return finalResults;
});
exports.UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    userDelete,
};
