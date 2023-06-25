"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errror/apiError"));
const handleCastError_1 = __importDefault(require("../../errror/handleCastError"));
const handleValidationError_1 = __importDefault(require("../../errror/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errror/handleZodError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.node_env === 'development'
        ? console.log('global error handler theke ----~~~~~~', error)
        : console.log(' global error handler theke ----~~~~~~', error);
    let statusCode = 500;
    let message = 'something went wrong';
    let errorMessage = [];
    if (error.name == 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        (message = simplifiedError.message),
            (errorMessage = simplifiedError.errorMessage);
    }
    else if (error.name === 'CastError') {
        console.log('lalalala');
        const simplifiedError = (0, handleCastError_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message);
        errorMessage = simplifiedError.errorMessage;
    }
    else if (error instanceof Error) {
        message = 'something went wrong from instance';
        errorMessage = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.node_env !== 'production' ? error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
