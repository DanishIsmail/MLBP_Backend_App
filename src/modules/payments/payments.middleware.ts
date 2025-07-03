import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";

const validatePaymentsParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    // nftId: Joi.string().required(),
    // tokenId: Joi.string().required(),
    currency: Joi.string().required(),
    price: Joi.number().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

const validateGetPaymentParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    paymentId: Joi.string().required(),
  });

  const { error }: ValidationResult = schema.validate(req.body);
  if (error) {
    return errorResponse(
      res,
      400,
      error.details[0].message.replace(/['"]+/g, "")
    );
  }
  next();
};

export { validatePaymentsParams, validateGetPaymentParams };
