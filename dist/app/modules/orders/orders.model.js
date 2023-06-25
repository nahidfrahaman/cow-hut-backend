"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrdersSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrdersSchema = new mongoose_1.Schema({
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cow',
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});
exports.Order = (0, mongoose_1.model)('Order', exports.OrdersSchema);
