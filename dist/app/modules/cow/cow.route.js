"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enum/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.post('/createCow', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.SELLER), cow_controller_1.CowController.createCow);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN, user_1.ENUM_USER_ROLLE.BUYER, user_1.ENUM_USER_ROLLE.SELLER), cow_controller_1.CowController.getSingleCow);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.SELLER), cow_controller_1.CowController.updateCow);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.SELLER), cow_controller_1.CowController.deleteCow);
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLLE.ADMIN, user_1.ENUM_USER_ROLLE.BUYER, user_1.ENUM_USER_ROLLE.SELLER), cow_controller_1.CowController.getCows);
exports.CowRoutes = router;
