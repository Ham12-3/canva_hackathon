"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = exports.newOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const order_model_1 = __importDefault(require("../models/order.model"));
exports.newOrder = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const order = await order_model_1.default.create(req.body);
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllOrdersService = async (req, res, next) => {
    try {
        const orders = await order_model_1.default.find();
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrdersService = getAllOrdersService;
