import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import LayoutModel from "../models/layout.model";

// Create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type, image, title, subTitle, faq, categories } = req.body;
    console.log("Create Layout Request Body:", req.body); // Debugging

    try {
      // Check if the layout type already exists
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler("Layout already exists", 400));
      }

      let result;

      if (type === "Banner" && image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
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

        result = await LayoutModel.create({ type: "Banner", banner });
        console.log("Banner Created:", result); // Debugging
      }

      if (type === "FAQ" && faq) {
        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        result = await LayoutModel.create({ type: "FAQ", faq: faqItems });
        console.log("FAQ Created:", result); // Debugging
      }

      if (type === "categories" && categories) {
        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        result = await LayoutModel.create({
          type: "categories",
          categories: categoriesItems,
        });
        console.log("Categories Created:", result); // Debugging
      }

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (err: any) {
      console.error("Create Layout Error:", err.message); // Debugging
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type, image, title, subTitle, faq, categories } = req.body;
    console.log("Edit Layout Request Body:", req.body); // Debugging

    try {
      let result;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        console.log("Banner Data Found:", bannerData); // Debugging

        const imageUpload =
          image && !image.startsWith("https")
            ? await cloudinary.v2.uploader.upload(image, { folder: "layout" })
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

        result = await LayoutModel.findByIdAndUpdate(bannerData._id, {
          banner,
        });
        console.log("Banner Updated:", result); // Debugging
      }

      if (type === "FAQ") {
        const faqItem = await LayoutModel.findOne({ type: "FAQ" });
        console.log("FAQ Data Found:", faqItem); // Debugging

        const faqItems = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));

        result = await LayoutModel.findByIdAndUpdate(faqItem?._id, {
          type: "FAQ",
          faq: faqItems,
        });
        console.log("FAQ Updated:", result); // Debugging
      }

      if (type === "categories") {
        const categoriesItem = await LayoutModel.findOne({
          type: "categories",
        });
        console.log("Categories Data Found:", categoriesItem); // Debugging

        const categoriesItems = categories.map((item: any) => ({
          title: item.title,
        }));

        result = await LayoutModel.findByIdAndUpdate(categoriesItem?._id, {
          type: "categories",
          categories: categoriesItems,
        });
        console.log("Categories Updated:", result); // Debugging
      }

      res.status(200).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (err: any) {
      console.error("Edit Layout Error:", err.message); // Debugging
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Get layout by type
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params;
    console.log("Get Layout By Type:", type); // Debugging

    try {
      const layout = await LayoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler("Layout not found", 404));
      }

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (err: any) {
      console.error("Get Layout Error:", err.message); // Debugging
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
