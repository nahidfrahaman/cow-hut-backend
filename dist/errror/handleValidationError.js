"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const error = Object.values(err.errors).map((element) => {
        return {
            path: element === null || element === void 0 ? void 0 : element.path,
            message: element === null || element === void 0 ? void 0 : element.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorMessage: error,
    };
};
exports.default = handleValidationError;
