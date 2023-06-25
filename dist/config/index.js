"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_Url: process.env.URL,
    bcrypt_solt_roud: process.env.DEFAULT_SOLT_ROUND,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expired: process.env.JWT_EXPIRED_IN,
        jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
        jwt_refresh_expired: process.env.JWT_REFRESH_EXPIRED_IN,
    },
};
