"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrdersService = exports.newOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const order_model_1 = __importDefault(require("../models/order.model"));
// create new order
exports.newOrder = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const order = await order_model_1.default.create(req.body); // use req.body for order data
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    }
    catch (error) {
        next(error); // pass error to Express error handling middleware
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
        next(error); // Pass the error to the next middleware
    }
};
exports.getAllOrdersService = getAllOrdersService;
