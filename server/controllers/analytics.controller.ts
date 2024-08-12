import { Request, Response, NextFunction } from "express";

import ErrorHandler from "../utils/ErrorHandler";

import { CatchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";

// user data analytics data

export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);
