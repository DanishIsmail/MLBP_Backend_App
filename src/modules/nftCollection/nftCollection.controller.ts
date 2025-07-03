import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import {
  createCollectionService,
  getCollectionsByUserId,
  getCollectionById,
} from "./nftCollection.service";
import { ICollectionAttrs } from "./nftCollection.types";
import {
  collectionCreatedSuccess,
  collectionSuccess,
} from "../../utilities/errorMessages";
import dotenv from "dotenv";
dotenv.config();

// @desc      Create Collection
// @route     POST /api/v1/nft/CreateCollection
// @access    Public
const createCollection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collectionName, colectionSymbol, maxSupply } = req.body as {
      collectionName: string;
      colectionSymbol: string;
      maxSupply: number;
    };
    // @ts-ignore
    let userId = req.user?.id;
    let collection: ICollectionAttrs = {
      userId,
      collectionName,
      colectionSymbol,
      maxSupply,
    };

    let result = await createCollectionService(collection);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    return successResponse(res, 200, collectionCreatedSuccess, {
      collectionName: result?.collectionName,
      colectionSymbol: result?.colectionSymbol,
      maxSupply: result?.maxSupply,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User Collections
// @route     POST/api/v1/nft/GetMyCollections
// @access    Public
const GetMyCollections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const collection = await getCollectionsByUserId(id);
    return successResponse(res, 200, collectionSuccess, {
      data: collection,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get Collection By Id
// @route     POST/api/v1/nft/GetNftCollectionById
// @access    Public
const GetNftCollectionById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { collectionId } = req.body as {
      collectionId: string;
    };
    const collection = await getCollectionById(collectionId);
    return successResponse(res, 200, collectionSuccess, {
      data: collection,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

export { createCollection, GetMyCollections, GetNftCollectionById };
