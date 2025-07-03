import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";
import { isCollectionExistService } from "./nftCollection.service";

const validateCollectionParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    collectionName: Joi.string().required(),
    colectionSymbol: Joi.string().required(),
    maxSupply: Joi.number().required(),
    collectionLogo: Joi.string().allow(""),
    bannerImage: Joi.string().allow(""),
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

const validateGetCollectionParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    collectionId: Joi.string().required(),
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

const isCollectionExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collectionId } = req.body;
    const query = { collectionId };

    const result = await isCollectionExistService(query);

    if (result) {
      return errorResponse(res, 400, "Nft collection already exist!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isCollectionDoesNotExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collectionId } = req.body;
    const query = { collectionId };

    const result = await isCollectionExistService(query);

    if (!result) {
      return errorResponse(
        res,
        400,
        "Nft collection does not exist in our database!"
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export {
  validateGetCollectionParams,
  validateCollectionParams,
  isCollectionExist,
  isCollectionDoesNotExist,
};
