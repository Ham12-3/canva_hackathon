import { NextFunction, Request, response, Response } from "express";
import axios from "axios"; // Import the 'axios' library

import { CatchAsyncError } from "../middleware/catchAsyncError";

import ErrorHandler from "../utils/ErrorHandler";
import { ObjectId } from "mongodb";

import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";

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

// edit course

export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const courseId = req.params.id;
      console.log(data, "father data");

      const thumbnail = data.thumbnail;
      const courseData = (await CourseModel.findById(courseId)) as any;

      // Check if thumbnail is provided and if it's not already a URL
      if (
        thumbnail &&
        typeof thumbnail === "object" &&
        !thumbnail.url.startsWith("https")
      ) {
        // Destroy old thumbnail if present
        if (courseData.thumbnail && courseData.thumbnail.public_id) {
          await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
        }

        // Upload new thumbnail
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          url: myCloud.secure_url,
          public_id: myCloud.public_id,
        };
      }

      // If thumbnail is already a URL
      if (
        thumbnail &&
        typeof thumbnail === "object" &&
        thumbnail.url.startsWith("https")
      ) {
        data.thumbnail = {
          url: courseData.thumbnail.url,
          public_id: courseData.thumbnail.public_id,
        };
      }

      // Update course with the new data
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);
// Get single course without purchasing

export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      // Try fetching from Redis first
      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        console.log("Cache hit for course", courseId);
        const course = JSON.parse(isCacheExist);

        // Return cached course
        return res.status(200).json({
          success: true,
          course,
        });
      }

      // Cache miss, fetching from the database
      console.log("Cache miss for course", courseId);
      const course = await CourseModel.findById(courseId).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      // If no course is found, don't cache and return a 404
      if (!course) {
        console.log(`Course with id ${courseId} not found`);
        return next(new ErrorHandler("Course not found", 404));
      }

      // Cache the course data only if it exists
      await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7 days expiration

      // Return the course from DB
      return res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      console.error("Error fetching course:", err);
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// get all courses without purchasing

export const getCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
      );

      await redis.set("allCourses", JSON.stringify(courses));

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// get course content  -- only for valid user

export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourselist = req.user?.courses;

      const courseId = req.params.id;

      const courseExists = userCourselist?.find(
        (course: any) => course.courseId === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You have not purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const content = course.courseData || []; // Ensure content is an array

      res.status(200).json({
        success: true,
        content,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add question in course

interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;

      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData.find((item: any) => {
        return item._id.equals(new ObjectId(contentId)); // Use `.equals()` for ObjectId comparison
      });

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      // Create a new question object

      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // add this question to our course content

      courseContent.questions.push(newQuestion);
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question",
        message: `You have a new question in ${courseContent.title}`,
      });

      // save the updated course

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add answer in course question

interface IAddAnswerData {
  answer: string;

  courseId: string;

  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, courseId, contentId, questionId }: IAddAnswerData =
        req.body;

      const course = await CourseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData.find((item: any) => {
        return item._id === contentId;
      });

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = courseContent.questions.find(
        (item: any) => item._id === questionId
      );
      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // Create new answer object

      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // add this answer to our course content
      question.questionReplies.push(newAnswer);

      if (req.user?._id === question.user._id) {
        // create a notification

        await NotificationModel.create({
          user: req.user?._id,
          title: "New Answer",
          message: `You have a new answer in ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (err: any) {
          return next(new ErrorHandler(err.message, 500));
        }
      }

      await course?.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add review in course

interface IAddReviewData {
  review: string;
  rating: number;
  courseId: string;
  userId: string;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      // check if courseId already exists in userCourseList based on _id

      const courseExists = userCourseList?.some((course: any) => {
        return course._id.toString() === courseId.toString();
      });

      if (!courseExists) {
        return next(
          new ErrorHandler("You have not purchased this course", 404)
        );
      }

      const course = await CourseModel.findById(courseId);

      const { review, rating, userId }: IAddReviewData = req.body;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((review: any) => {
        avg += review.rating;
      });

      if (course) {
        course.ratings = avg / course.reviews.length;
      }
      await course?.save();

      await redis.set(courseId, JSON.stringify(course), "EX", 604800);

      // create notification
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Review Received",
        message: `${req.user?.name} has added a review in ${course?.name}`,
      });

      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// add reply in review

interface IAddReviewData {
  comment: string;

  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId }: IAddReviewData = req.body;

      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId.toString()
      );

      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }

      review.commentReplies?.push(replyData);

      await course?.save();

      await redis.set(courseId, JSON.stringify(course), "EX", 604800);
      res.status(200).json({
        success: true,
        course,
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);

// deleteCourse

export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      await course.deleteOne({ courseId });

      await redis.del(courseId);

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 500));
    }
  }
);

// generate video url

export const generateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `
        https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );

      res.json(response.data);
    } catch (err: any) {
      return next(new ErrorHandler(err.message, 400));
    }
  }
);
