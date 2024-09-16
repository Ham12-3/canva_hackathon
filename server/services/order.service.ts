import { NextFunction, Response, Request } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";

// create new order
export const newOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderModel.create(req.body); // use req.body for order data

      res.status(200).json({
        success: true,
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      next(error); // pass error to Express error handling middleware
    }
  }
);
export const getAllOrdersService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderModel.find();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};
