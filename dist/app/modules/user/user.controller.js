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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendeResponse_1 = __importDefault(require("../../../shared/sendeResponse"));
const user_constant_1 = require("./user.constant");
const user_service_1 = require("./user.service");
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constant_1.userSearchabeFields);
    console.log(filters);
    const paginationOption = (0, pick_1.default)(req.query, user_constant_1.paginationOptions);
    // const filteredData = pick(req.body, ['role', 'address', 'budget']);
    const results = yield user_service_1.UserService.getAllUser(filters, paginationOption);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: results,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const results = yield user_service_1.UserService.getSingleUser(id);
    let message = 'get single User successfuly';
    if (!results) {
        message = 'user not found';
    }
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: message,
        data: results,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const results = yield user_service_1.UserService.updateUser(id, updatedData);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'user updated Successfuly',
        data: results,
    });
}));
const userDelete = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const results = yield user_service_1.UserService.userDelete(id);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'user deleted Successfuly',
        data: results,
    });
}));
const getmyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const results = yield user_service_1.UserService.getmyProfile(userData);
    let message = 'get User profile successfuly';
    if (!results) {
        message = 'user not found';
    }
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: message,
        data: results,
    });
}));
const updatemyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const updatedData = req.body;
    const results = yield user_service_1.UserService.updateMyProfile(userData, updatedData);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'user updated Successfuly',
        data: results,
    });
}));
exports.UserController = {
    getAllUser,
    getSingleUser,
    updateUser,
    userDelete,
    getmyProfile,
    updatemyProfile,
};
