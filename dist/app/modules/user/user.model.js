'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const mongoose_1 = require('mongoose');
const UserSchema = new mongoose_1.Schema(
  {
    id: {
      type: mongoose_1.Schema.Types.ObjectId,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: false,
        },
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: false,
    },
    income: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
exports.User = (0, mongoose_1.model)('User', UserSchema);
