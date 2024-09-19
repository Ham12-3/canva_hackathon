"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchAsyncError = void 0;
const CatchAsyncError = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((err) => {
        console.error("Async error caught:", err);
        next(err);
    });
};
exports.CatchAsyncError = CatchAsyncError;
