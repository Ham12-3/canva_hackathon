import { Request, Response, NextFunction } from "express";

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";

import OrderModel, { IOrder } from "../models/order.model";

import CourseModel, { ICourse } from "../models/course.model";
import userModel from "../models/user.model";
import OrderConfirmationMail from "../mails/order-confirmation-mail";
import path from "path";

import ejs, { name } from "ejs";
import sendMail from "../utils/sendMail";
import { renderToStaticMarkup } from "react-dom/server";

import NotificationModel from "../models/notification.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
import React from "react";

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create order
// Create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info && "id" in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized", 400));
        }
      }

      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      const courseExistUser = user.courses.some(
        (course: any) => course.courseId === courseId
      );
      if (courseExistUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Create order data
      const orderData: any = {
        courseId: course._id,
        userId: user._id,
        payment_info,
      };

      // Create the order
      await newOrder(orderData, res, next);

      // Prepare mail data
      const mailData = {
        order: {
          _id: course._id,
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

      // Render and send email
      const html = renderToStaticMarkup(
        React.createElement(OrderConfirmationMail, { order: mailData.order })
      );

      try {
        if (user.email) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            html, // Send the rendered HTML as the email body
          });
        }
      } catch (err: any) {
        return next(new ErrorHandler(err.message, 500));
      }

      // Add course to user's purchased courses
      user.courses.push({ courseId: course._id } as any);
      await user.save();

      // Cache user data in Redis
      await redis.set(req.user?.id, JSON.stringify(user));

      // Increment course purchased count
      course.purchased = (course.purchased || 0) + 1;
      await course.save();

      // Create a notification for the user
      await NotificationModel.create({
        user: user._id,
        title: "New Course Purchased",
        message: `You have purchased the ${course.name} course`,
      });

      // Successfully create the order
      res.status(201).json({
        success: true,
        message: "Order created successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
export const getAllOrders = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllOrdersService(req, res, next); // Pass req, res, and next
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// send stripe publishable key

export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment

export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "GBP",
        metadata: {
          company: "E-learning",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
