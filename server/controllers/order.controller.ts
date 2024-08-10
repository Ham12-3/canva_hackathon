import { Request, Response, NextFunction } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";

import OrderModel, { IOrder } from "../models/order.model";

import CourseModel from "../models/course.model";
import userModel from "../models/user.model";

import path from "path";

import ejs, { name } from "ejs";
import sendMail from "../utils/sendMail";

import NotificationModel from "../models/notification.model";
import { newOrder } from "../services/order.service";

// Create order

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const user = await userModel.findById(req.user?.id);

      const courseExistUser = user?.courses.some(
        (course: any) => course.courseId === courseId
      );

      if (courseExistUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
      };

      newOrder(data, res, next);
      const mailData = {
        order: {
          _id: (course._id as string).slice(-5),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        mailData
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
      }
      user?.courses.push({ courseId: course?._id } as any);

      await user?.save();

      const notification = await NotificationModel.create({
        user: user?._id,
        title: "New User",
        message: `You have purchased ${course?.name} course`,
      });

      res.status(200).json({
        success: true,
        message: "Order created successfully",
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
