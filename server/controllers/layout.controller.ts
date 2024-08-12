import { Request, Response, NextFunction } from "express";
import cloudinary from "cloudinary"; // Import the 'cloudinary' module

import ErrorHandler from "../utils/ErrorHandler";

import { CatchAsyncError } from "../middleware/catchAsyncError";
import LayoutModel from "../models/layout.model";

// create layout

export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler("Layout already exists", 400));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
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
        await LayoutModel.create(banner);
        if (type === "FAQ") {
          const { faq } = req.body;

          const faqItems = await Promise.all(
            faq.map(async (item: any) => {
              return {
                question: item.question,
                answer: item.answer,
              };
            })
          );
          await LayoutModel.create({ type: "FAQ", faq: faqItems });
        }
        if (type === "categories") {
          const { categories } = req.body;
          const categoriesItems = await Promise.all(
            categories.map(async (item: any) => {
              return {
                title: item.title,
              };
            })
          );

          await LayoutModel.create({
            type: "categories",
            categories: categoriesItems,
          });
        }
      }
      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// Edit layout

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData?.image.public_id);
        }

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
        await LayoutModel.findOneAndUpdate(bannerData.id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItem = await LayoutModel.findOne({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(faqItem?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }

      if (type === "categories") {
        const { categories } = req.body;
        const categoriesItem = await LayoutModel.findOne({
          type: "categories",
        });
        const categoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.findByIdAndUpdate(categoriesItem?._id, {
          type: "categories",
          categories: categoriesItems,
        });

        res.status(200).json({
          success: true,
          message: "Layout updated successfully",
        });
      }
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
