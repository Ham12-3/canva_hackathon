import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";

// create new order

export const newOrder = CatchAsyncError(
  async (data: any, next: NextFunction, res: Response) => {
    const order = await OrderModel.create(data);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  }
);

// get all orders service

export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find();

  res.status(200).json({
    success: true,
    orders,
  });
};
