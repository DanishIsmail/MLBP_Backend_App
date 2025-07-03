import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";
import { getPackById, getUserPackslisted } from "./packs.service";

const validatePacksParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    collectionId: Joi.string().required(),
    creatorAccountId: Joi.string().allow(""),
    packName: Joi.string().required(),
    nftIds: Joi.array().required(),
    blockChainName: Joi.string().required(),
    chianId: Joi.string().required(),
    packDescription: Joi.string().required(),
    converImage: Joi.string().required(),
    price: Joi.number().required(),
    currency: Joi.string().required(),
    transactionHash: Joi.string().allow(""),
    ownerWalletAddress: Joi.string().allow(""),
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

const validatePackParams = (
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

const validateAuctionPackParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    packId: Joi.string().required(),
    transactionHash: Joi.string().required(),
    currency: Joi.string().required(),
    price: Joi.number().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
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

const isPacklisted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    let userId = req.user?.id;
    const { nftId } = req.body;

    const result = await getUserPackslisted(userId, nftId);

    if (result) {
      return errorResponse(res, 400, "Nft is already on sale!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isPackExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nftId } = req.body;

    const result = await getPackById(nftId);

    if (!result) {
      return errorResponse(res, 400, "Nft does not exist!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export {
  validatePacksParams,
  validatePackParams,
  validateAuctionPackParams,
  isPacklisted,
  isPackExist,
};
