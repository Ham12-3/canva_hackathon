"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByType = exports.editLayout = exports.createLayout = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const layout_model_1 = __importDefault(require("../models/layout.model"));
exports.createLayout = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { type, image, title, subTitle, faq, categories } = req.body;
    console.log("Create Layout Request Body:", req.body);
    try {
        const isTypeExist = await layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default("Layout already exists", 400));
        }
        let result;
        if (type === "Banner" && image) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            result = await layout_model_1.default.create({ type: "Banner", banner });
            console.log("Banner Created:", result);
        }
        if (type === "FAQ" && faq) {
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            result = await layout_model_1.default.create({ type: "FAQ", faq: faqItems });
            console.log("FAQ Created:", result);
        }
        if (type === "categories" && categories) {
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            result = await layout_model_1.default.create({
                type: "categories",
                categories: categoriesItems,
            });
            console.log("Categories Created:", result);
        }
        res.status(201).json({
            success: true,
            message: "Layout created successfully",
        });
    }
    catch (err) {
        console.error("Create Layout Error:", err.message);
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.editLayout = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { type, image, title, subTitle, faq, categories } = req.body;
    console.log("Edit Layout Request Body:", req.body);
    try {
        let result;
        if (type === "Banner") {
            const bannerData = await layout_model_1.default.findOne({ type: "Banner" });
            console.log("Banner Data Found:", bannerData);
            const imageUpload = image && !image.startsWith("https")
                ? await cloudinary_1.default.v2.uploader.upload(image, { folder: "layout" })
                : null;
            const banner = {
                type: "Banner",
                image: {
                    public_id: image.startsWith("https")
                        ? bannerData.banner.image.public_id
                        : imageUpload?.public_id,
                    url: image.startsWith("https")
                        ? bannerData.banner.image.url
                        : imageUpload?.secure_url,
                },
                title,
                subTitle,
            };
            result = await layout_model_1.default.findByIdAndUpdate(bannerData._id, {
                banner,
            });
            console.log("Banner Updated:", result);
        }
        if (type === "FAQ") {
            const faqItem = await layout_model_1.default.findOne({ type: "FAQ" });
            console.log("FAQ Data Found:", faqItem);
            const faqItems = faq.map((item) => ({
                question: item.question,
                answer: item.answer,
            }));
            result = await layout_model_1.default.findByIdAndUpdate(faqItem?._id, {
                type: "FAQ",
                faq: faqItems,
            });
            console.log("FAQ Updated:", result);
        }
        if (type === "categories") {
            const categoriesItem = await layout_model_1.default.findOne({
                type: "categories",
            });
            console.log("Categories Data Found:", categoriesItem);
            const categoriesItems = categories.map((item) => ({
                title: item.title,
            }));
            result = await layout_model_1.default.findByIdAndUpdate(categoriesItem?._id, {
                type: "categories",
                categories: categoriesItems,
            });
            console.log("Categories Updated:", result);
        }
        res.status(200).json({
            success: true,
            message: "Layout updated successfully",
        });
    }
    catch (err) {
        console.error("Edit Layout Error:", err.message);
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.getLayoutByType = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    const { type } = req.params;
    console.log("Get Layout By Type:", type);
    try {
        const layout = await layout_model_1.default.findOne({ type });
        if (!layout) {
            return next(new ErrorHandler_1.default("Layout not found", 404));
        }
        res.status(200).json({
            success: true,
            layout,
        });
    }
    catch (err) {
        console.error("Get Layout Error:", err.message);
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
