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
exports.AdminService = void 0;
const http_status_codes_1 = require("http-status-codes");
const apiError_1 = __importDefault(require("../../../errror/apiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelper_1 = require("../../../helper/jwtHelper");
const admin_model_1 = require("./admin.model");
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield admin_model_1.Admin.create(data);
    if (!newUser) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'user created failed');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = newUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User does not find');
    }
    const isPassMatched = yield admin_model_1.Admin.isPasswordMatched(password, isAdminExist.password);
    if (!isPassMatched) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'unAuthorized password does not match');
    }
    const { phoneNumber: userNumber, role, needPasswordChange } = isAdminExist;
    console.log(userNumber, role);
    // create jwt access token and refresh token
    const accessToken = jwtHelper_1.JwtHelpers.createToken({ userNumber, role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expired);
    const refreshToken = jwtHelper_1.JwtHelpers.createToken({ userNumber, role }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expired);
    return {
        accessToken,
        refreshToken,
        needPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifyToken = null;
    try {
        verifyToken = jwtHelper_1.JwtHelpers.verifyToken(token, config_1.default.jwt.jwt_refresh_secret);
    }
    catch (error) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, ' invalid refresh token');
    }
    console.log(verifyToken);
    const { userNumber, role } = verifyToken;
    console.log('refresh :', userNumber, role);
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(userNumber);
    if (!isAdminExist) {
        throw new apiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'forbidden user not found');
    }
    //generate access token  not : refreshtoken access token nibe
    const newAccessToken = jwtHelper_1.JwtHelpers.createToken({ phoneNumber: isAdminExist.phoneNumber, role: isAdminExist.role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expired);
    return {
        accessToken: newAccessToken,
    };
});
exports.AdminService = {
    createAdmin,
    login,
    refreshToken,
};
