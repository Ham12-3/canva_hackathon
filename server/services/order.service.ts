import { NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";

// create new order

export const newOrder = CatchAsyncError(
  async (data: any, next: NextFunction) => {
    const order = await OrderModel.create(data);

    next(order);
  }
);
