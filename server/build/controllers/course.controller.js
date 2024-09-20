"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAllCourses = exports.addReplyToReview = exports.addReview = exports.addAnswer = exports.addQuestion = exports.getCourseByUser = exports.getCourses = exports.getSingleCourse = exports.editCourse = exports.uploadCourse = void 0;
const axios_1 = __importDefault(require("axios"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const mongodb_1 = require("mongodb");
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course.model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
exports.uploadCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                url: myCloud.secure_url,
                public_id: myCloud.public_id,
            };
        }
        (0, course_service_1.createCourse)(data, res, next);
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.editCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const courseId = req.params.id;
        console.log(data, "father data");
        console.log(courseId, "courseId");
        const thumbnail = data.thumbnail;
        const courseData = (await course_model_1.default.findById(courseId));
        if (thumbnail &&
            typeof thumbnail === "object" &&
            !thumbnail.url.startsWith("https")) {
            if (courseData.thumbnail && courseData.thumbnail.public_id) {
                await cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                url: myCloud.secure_url,
                public_id: myCloud.public_id,
            };
        }
        if (thumbnail &&
            typeof thumbnail === "object" &&
            thumbnail.url.startsWith("https")) {
            data.thumbnail = {
                url: courseData.thumbnail.url,
                public_id: courseData.thumbnail.public_id,
            };
        }
        const course = await course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, { new: true });
        console.log(course, "course");
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.getSingleCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const isCacheExist = await redis_1.redis.get(courseId);
        if (isCacheExist) {
            console.log("Cache hit for course", courseId);
            const course = JSON.parse(isCacheExist);
            return res.status(200).json({
                success: true,
                course,
            });
        }
        console.log("Cache miss for course", courseId);
        const course = await course_model_1.default.findById(courseId).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        if (!course) {
            console.log(`Course with id ${courseId} not found`);
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        return res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        console.error("Error fetching course:", err);
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.getCourses = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await course_model_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
        await redis_1.redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.getCourseByUser = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userCourselist = req.user?.courses;
        const courseId = req.params.id;
        const courseExists = userCourselist?.find((course) => course.courseId === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You have not purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const content = course.courseData || [];
        res.status(200).json({
            success: true,
            content,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.addQuestion = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { question, courseId, contentId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const courseContent = course?.courseData.find((item) => {
            return item._id.equals(new mongodb_1.ObjectId(contentId));
        });
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: [],
        };
        courseContent.questions.push(newQuestion);
        await notification_model_1.default.create({
            user: req.user?._id,
            title: "New Question",
            message: `You have a new question in ${courseContent.title}`,
        });
        await course?.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.addAnswer = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const courseContent = course?.courseData.find((item) => {
            return item._id === contentId;
        });
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const question = courseContent.questions.find((item) => item._id === questionId);
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid question id", 400));
        }
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        question.questionReplies.push(newAnswer);
        if (req.user?._id === question.user._id) {
            await notification_model_1.default.create({
                user: req.user?._id,
                title: "New Answer",
                message: `You have a new answer in ${courseContent.title}`,
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            };
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                await (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.ejs",
                    data,
                });
            }
            catch (err) {
                return next(new ErrorHandler_1.default(err.message, 500));
            }
        }
        await course?.save();
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.addReview = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList?.some((course) => {
            return course._id.toString() === courseId.toString();
        });
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You have not purchased this course", 404));
        }
        const course = await course_model_1.default.findById(courseId);
        const { review, rating, userId } = req.body;
        const reviewData = {
            user: req.user,
            comment: review,
            rating,
        };
        course?.reviews.push(reviewData);
        let avg = 0;
        course?.reviews.forEach((review) => {
            avg += review.rating;
        });
        if (course) {
            course.ratings = avg / course.reviews.length;
        }
        await course?.save();
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        await notification_model_1.default.create({
            user: req.user?._id,
            title: "New Review Received",
            message: `${req.user?.name} has added a review in ${course?.name}`,
        });
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.addReplyToReview = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = course?.reviews?.find((rev) => rev._id.toString() === reviewId.toString());
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
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
        await redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800);
        res.status(200).json({
            success: true,
            course,
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.getAllCourses = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        (0, course_service_1.getAllCoursesService)(res);
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
exports.deleteCourse = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        await course.deleteOne({ courseId });
        await redis_1.redis.del(courseId);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.generateVideoUrl = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.body;
        const response = await axios_1.default.post(`
        https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 400));
    }
});
