import { NextFunction, Request, Response } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";

import cloudinary from "cloudinary";
import { createCourse } from "../services/course.service";

// upload course

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          url: myCloud.secure_url,
          public_id: myCloud.public_id,
        };
      }

      createCourse(data, res, next);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
