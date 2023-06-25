"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globarErrorHandler_1 = __importDefault(require("./app/middlewares/globarErrorHandler"));
const route_1 = __importDefault(require("./app/route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parse data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', route_1.default);
app.use(globarErrorHandler_1.default);
// testing;
app.get('/', (req, res) => {
    res.send('welcome cow-hut-with-auth backend');
});
app.use((req, res, next) => {
    next();
    res.status(400).json({
        success: false,
        message: 'route not found',
        errorMessage: [
            {
                path: req.originalUrl,
                message: 'Api route not Found',
            },
        ],
    });
});
exports.default = app;
