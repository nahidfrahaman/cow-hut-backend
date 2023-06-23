'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require('http-status-codes');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendeResponse_1 = __importDefault(
  require('../../../shared/sendeResponse')
);
const auth_service_1 = require('./auth.service');
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createUserData = req.body;
    const results = yield auth_service_1.AuthService.createUser(createUserData);
    (0, sendeResponse_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      success: true,
      message: 'user created Successfuly',
      data: results,
    });
  })
);
exports.AuthController = {
  createUser,
};
