import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";

const validateTransactionParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    nftId: Joi.string().required(),
    transactionId: Joi.string().required(),
    event: Joi.string().allow(""),
    walletAccountId: Joi.string().allow(""),
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

const validateGetHistoryParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    historyId: Joi.string().required(),
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

export { validateTransactionParams, validateGetHistoryParams };
