import Joi, { ValidationResult } from "joi";
import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../utilities/responses";
import { getNftById, getUserNftslisted } from "./nfts.service";

const validateNftParams = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    collectionId: Joi.string().required(),
    creatorAccountId: Joi.string().allow(""),
    nftName: Joi.string().required(),
    NftProperties: Joi.object().allow({}),
    NftStats: Joi.object().allow({}),
    NftLevels: Joi.object().allow({}),
    nftTokenId: Joi.string().required(),
    royalty: Joi.number().allow(""),
    blockChainName: Joi.string().required(),
    chianId: Joi.string().required(),
    description: Joi.string().required(),
    externalLink: Joi.string().allow(""),
    iPfsURL: Joi.string().required(),
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

const validateNftsParams = (
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

const validateAuctionNftsParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    nftId: Joi.string().required(),
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

const isNftlisted = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    let userId = req.user?.id;
    const { nftId } = req.body;

    const result = await getUserNftslisted(userId, nftId);

    if (result) {
      return errorResponse(res, 400, "Nft is already on sale!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

const isNftExist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nftId } = req.body;

    const result = await getNftById(nftId);

    if (!result) {
      return errorResponse(res, 400, "Nft does not exist!");
    }

    next();
  } catch (error) {
    return next(error);
  }
};

export {
  validateNftParams,
  validateNftsParams,
  validateAuctionNftsParams,
  isNftlisted,
  isNftExist,
};
