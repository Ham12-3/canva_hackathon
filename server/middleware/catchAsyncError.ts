import { Request, Response, NextFunction } from "express";
export const CatchAsyncError =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch((err) => {
      console.error("Async error caught:", err);
      next(err);
    });
  };
