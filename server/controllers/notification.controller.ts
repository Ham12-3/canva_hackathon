import NotificationModel from "../models/notification.model";

import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";

export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
