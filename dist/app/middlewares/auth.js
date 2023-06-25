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
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errror/apiError"));
const jwtHelper_1 = require("../../helper/jwtHelper");
const auth = (...requiredRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // access token
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'you are not authorized user');
        }
        //verify token
        const verifiedUser = jwtHelper_1.JwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
        req.user = verifiedUser;
        if (requiredRole.length &&
            typeof verifiedUser !== 'string' &&
            !requiredRole.includes(verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role)) {
            throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
