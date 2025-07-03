import { Request, Response, NextFunction } from "express";
export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // console.log(err.stack);
  console.log(err.stack);
  console.log(err.message);
  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
}
