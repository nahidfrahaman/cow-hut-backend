"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string({
            required_error: 'Phone number is required',
        }),
        role: zod_1.default.enum(['seller', 'buyer'], {
            required_error: 'role is required',
        }),
        password: zod_1.default.string({
            required_error: 'password is required',
        }),
        needPasswordChange: zod_1.default.boolean().optional(),
        name: zod_1.default.object({
            firstName: zod_1.default.string({
                required_error: 'fistName is required',
            }),
            lastName: zod_1.default.string({
                required_error: 'lastName is required',
            }),
            middleName: zod_1.default.string().optional(),
        }),
        address: zod_1.default.string({
            required_error: 'address is required',
        }),
        budget: zod_1.default.number().optional(),
        income: zod_1.default.number().optional(),
    }),
});
const updateUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string().optional(),
        role: zod_1.default.enum(['seller', 'buyer']).optional(),
        password: zod_1.default.string().optional(),
        needPasswordChange: zod_1.default.boolean().optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
            middleName: zod_1.default.string().optional(),
        })
            .optional(),
        address: zod_1.default.string().optional(),
        budget: zod_1.default.number().optional(),
        income: zod_1.default.number().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
