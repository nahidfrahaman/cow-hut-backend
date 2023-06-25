"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const mongoose_1 = require("mongoose");
const AuthSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ['seller', 'buyer'],
    },
    id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AuthUser = (0, mongoose_1.model)('AuthUser', AuthSchema);
