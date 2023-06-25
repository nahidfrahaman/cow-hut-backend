"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enum/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validRequest_1 = __importDefault(require("../../middlewares/validRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, validRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN), user_controller_1.UserController.userDelete);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN), user_controller_1.UserController.getAllUser);
exports.UserRoutes = router;
