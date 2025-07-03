import { Response } from "express";

const successResponse = (
  res: Response,
  status: number,
  message: string,
  resData: any
) => {
  return res.status(status).json({
    success: true,
    message: message,
    data: resData,
  });
};

const errorResponse = (res: Response, status: number, errMessage: any) => {
  return res.status(status).json({
    success: false,
    error: errMessage,
  });
};

export { successResponse, errorResponse };
