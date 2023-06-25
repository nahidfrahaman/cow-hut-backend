"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: 'invalid id',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'validation error',
        errorMessage: errors,
    };
};
exports.default = handleCastError;
