"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPayment = exports.sendStripePublishableKey = exports.getAllOrders = exports.createOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const course_model_1 = __importDefault(require("../models/course.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const order_service_1 = require("../services/order.service");
const redis_1 = require("../utils/redis");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Create order
exports.createOrder = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { courseId, payment_info } = req.body;
        if (payment_info && "id" in payment_info) {
            const paymentIntentId = payment_info.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            // If the payment is not successful, throw an error
            if (paymentIntent.status !== "succeeded") {
                return next(new ErrorHandler_1.default("Payment not authorized", 400));
            }
        }
        const user = await user_model_1.default.findById(req.user?._id);
        console.log(req);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        // Check if user has already purchased the course
        const courseExistUser = user.courses.some((course) => course.courseId === courseId);
        if (courseExistUser) {
            return next(new ErrorHandler_1.default("You have already purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        // Create order data
        const data = {
            courseId: course._id,
            userId: user._id,
            payment_info,
        };
        // Create the order
        await (0, order_service_1.newOrder)(data, res, next);
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
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), mailData);
        try {
            if (user.email) {
                await (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (err) {
            return next(new ErrorHandler_1.default(err.message, 500));
        }
        // Add course to user's purchased courses
        user.courses.push({ courseId: course._id });
        await user.save();
        // Cache user data in Redis after successfully saving it
        await redis_1.redis.set(req.user?.id, JSON.stringify(user));
        // Increment course purchased count
        course.purchased = (course.purchased || 0) + 1;
        await course.save();
        // Create a notification for the user
        await notification_model_1.default.create({
            user: user._id,
            title: "New Course Purchased",
            message: `You have purchased the ${course.name} course`,
        });
        // Successfully create the order
        res.status(201).json({
            success: true,
            message: "Order created successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.getAllOrders = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        await (0, order_service_1.getAllOrdersService)(req, res, next); // Pass req, res, and next
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
// send stripe publishable key
exports.sendStripePublishableKey = (0, catchAsyncError_1.CatchAsyncError)(async (req, res) => {
    res.status(200).json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
// new payment
exports.newPayment = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
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
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
