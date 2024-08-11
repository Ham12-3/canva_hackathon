import NotificationModel from "../models/notification.model";

import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";

export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {}
);
