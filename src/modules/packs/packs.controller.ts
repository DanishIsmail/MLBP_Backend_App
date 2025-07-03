import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import { IPackAttrs } from "./packs.types";
import dotenv from "dotenv";
import {
  createPackservice,
  getUserPacks,
  getPacksByCollection,
  getMintedPackById,
} from "./packs.service";
import { getCollectionById } from "../nftCollection/nftCollection.service";
import {
  packCreatedSuccess,
  nftDataSuccess,
  nftListedSuccess,
} from "../../utilities/errorMessages";
dotenv.config();

// @desc      Create Pack
// @route     POST /api/v1/pack/CreatePack
// @access    Public
const createPack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let {
      collectionId,
      creatorAccountId,
      packName,
      nftIds,
      blockChainName,
      chainId,
      packDescription,
      converImage,
      currency,
      transactionHash,
      price,
      ownerWalletAddress,
    } = req.body as {
      collectionId: string;
      creatorAccountId: string;
      packName: string;
      nftIds: [string];
      blockChainName: string;
      chainId: string;
      packDescription: string;
      converImage: string;
      currency: string;
      transactionHash: string;
      price: number;
      ownerWalletAddress: string;
    };
    // @ts-ignore
    let userId = req.user?.id;

    let collection = await getCollectionById(collectionId);

    if (!collection) {
      return errorResponse(res, 400, "collection does not exist!");
    }

    let nft: IPackAttrs = {
      mintingAccountId: userId,
      ownerAccountId: userId,
      OldOwnerAccountId: userId,
      // @ts-ignore
      collectionId: collection._id,
      creatorAccountId: userId,
      packName,
      nftIds,
      blockChainName,
      chainId,
      packDescription,
      packCoverImageURL: converImage,
      currency,
      transactionHash,
      isMinted: true,
      buyPrice: price,
      ownerWalletAddress,
      nftStatus: "locked",
      nftsCount: nftIds.length,
      packstatus: "Minted",
    };

    let nfts = await createPackservice(nft);

    return successResponse(res, 200, packCreatedSuccess, { data: nfts });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User Packs
// @route     POST/api/v1/packs/GetUserPack
// @access    Public
const GetUserPack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const nfts = await getUserPacks(id);
    return successResponse(res, 200, nftDataSuccess, {
      data: nfts,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get Packs By Collection Id
// @route     POST/api/v1/pack/GetPacksByCollectionId
// @access    Public
const GetPacksByCollectionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { collectionId } = req.body as { collectionId: string };
    const nfts = await getPacksByCollection(collectionId);
    return successResponse(res, 200, nftDataSuccess, {
      data: nfts,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Create Draft Pack
// @route     POST /api/v1/pack/CreateDraftPack
// @access    Public
const CreateDraftPack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {
      collectionId,
      creatorAccountId,
      packName,
      nftIds,
      blockChainName,
      chainId,
      packDescription,
      converImage,
      currency,
      transactionHash,
      price,
      ownerWalletAddress,
    } = req.body as {
      collectionId: string;
      creatorAccountId: string;
      packName: string;
      nftIds: [string];
      blockChainName: string;
      chainId: string;
      packDescription: string;
      converImage: string;
      currency: string;
      transactionHash: string;
      price: number;
      ownerWalletAddress: string;
    };
    // @ts-ignore
    let userId = req.user?.id;

    let collection = await getCollectionById(collectionId);

    if (!collection) {
      return errorResponse(res, 400, "collection does not exist!");
    }

    let nft: IPackAttrs = {
      mintingAccountId: userId,
      ownerAccountId: userId,
      OldOwnerAccountId: userId,
      // @ts-ignore
      collectionId: collection._id,
      creatorAccountId: userId,
      packName,
      nftIds,
      blockChainName,
      chainId,
      packDescription,
      packCoverImageURL: converImage,
      currency,
      transactionHash,
      isMinted: false,
      isDraft: true,
      buyPrice: price,
      ownerWalletAddress,
      nftStatus: "locked",
      nftsCount: nftIds.length,
      packstatus: "Minted",
    };

    let nfts = await createPackservice(nft);

    return successResponse(res, 200, packCreatedSuccess, { data: nfts });
  } catch (error) {
    next(error);
  }
};

// @desc      List Pack for Auction
// @route     POST /api/v1/pack/ListPackForAuction
// @access    Public
const ListPackForAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { packId, transactionHash, currency, price, startTime, endTime } =
      req.body as {
        packId: string;
        transactionHash: string;
        currency: string;
        price: number;
        startTime: Date;
        endTime: Date;
      };
    // @ts-ignore
    let userId = req.user?.id;

    let packs = await getMintedPackById(packId, userId, "Minted");
    if (!packs) {
      return errorResponse(res, 400, "Pack does not exist!");
    }

    packs.sellMode = "AUCTION";
    packs.transactionHash = transactionHash;
    packs.currency = currency;
    packs.buyPrice = price;
    packs.startTime = startTime;
    packs.endTime = endTime;
    packs.isOnSale = true;
    packs.isMinted = false;
    packs.isDraft = false;
    packs.save();

    return successResponse(res, 200, nftListedSuccess, { data: packs });
  } catch (error) {
    next(error);
  }
};

export {
  createPack,
  GetUserPack,
  GetPacksByCollectionId,
  CreateDraftPack,
  ListPackForAuction,
};
