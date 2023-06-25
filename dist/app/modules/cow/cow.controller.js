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
exports.CowController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendeResponse_1 = __importDefault(require("../../../shared/sendeResponse"));
const user_constant_1 = require("../user/user.constant");
const cow_service_1 = require("./cow.service");
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserData = req.body;
    const results = yield cow_service_1.CowService.createCow(createUserData);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Cow data created Successfuly',
        data: results,
    });
}));
const getCows = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOption = (0, pick_1.default)(req.query, user_constant_1.paginationOptions);
    const filtersData = (0, pick_1.default)(req.query, [
        'searchTerm',
        'minPrice',
        'maxPrice',
        'location',
        'category',
    ]);
    const results = yield cow_service_1.CowService.getCows(filtersData, paginationOption);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Cow data retrive Successfuly',
        data: results,
    });
}));
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellerdata = req.user;
    const id = req.params.id;
    const updatedData = req.body;
    const results = yield cow_service_1.CowService.updateCow(id, sellerdata, updatedData);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'cow updated Successfuly',
        data: results,
    });
}));
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const results = yield cow_service_1.CowService.getSingleCow(id);
    let message = 'get single cow successfuly';
    if (!results) {
        message = 'cow not found';
    }
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: message,
        data: results,
    });
}));
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const sellerData = req.user;
    const results = yield cow_service_1.CowService.deleteCow(id, sellerData);
    (0, sendeResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'cow  deleted Successfuly',
        data: results,
    });
}));
exports.CowController = {
    createCow,
    getCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
