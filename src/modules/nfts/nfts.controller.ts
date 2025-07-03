import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import { INftAttrs } from "./nfts.types";
import dotenv from "dotenv";
import {
  createNftService,
  getUserNfts,
  getNftsByCollection,
  getMintedNftById,
} from "./nfts.service";
import { getCollectionById } from "../nftCollection/nftCollection.service";
import {
  nftCreatedSuccess,
  nftDataSuccess,
  nftListedSuccess,
} from "../../utilities/errorMessages";
dotenv.config();

// @desc      Create NFT
// @route     POST /api/v1/nft/CreateNft
// @access    Public
const createNft = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let {
      collectionId,
      creatorAccountId,
      nftName,
      nftTokenId,
      royalty,
      blockChainName,
      chainId,
      description,
      externalLink,
      iPfsURL,
      currency,
      transactionHash,
      price,
      ownerWalletAddress,
      NftProperties,
      NftStats,
      NftLevels,
    } = req.body as {
      collectionId: string;
      creatorAccountId: string;
      nftName: string;
      nftTokenId: string;
      royalty: number;
      blockChainName: string;
      chainId: string;
      description: string;
      externalLink: string;
      iPfsURL: string;
      currency: string;
      transactionHash: string;
      price: number;
      ownerWalletAddress: string;
      NftProperties: Object;
      NftStats: Object;
      NftLevels: Object;
    };
    // @ts-ignore
    let userId = req.user?.id;

    let collection = await getCollectionById(collectionId);

    if (!collection) {
      return errorResponse(res, 400, "collection does not exist!");
    }

    let nft: INftAttrs = {
      mintingAccountId: userId,
      ownerAccountId: userId,
      OldOwnerAccountId: userId,
      // @ts-ignore
      collectionId: collection._id,
      creatorAccountId: userId,
      nftName,
      nftTokenId,
      royalty,
      blockChainName,
      chainId,
      description,
      externalLink,
      iPfsURL,
      currency,
      transactionHash,
      isMinted: true,
      buyPrice: price,
      ownerWalletAddress,
      NftProperties,
      NftStats,
      NftLevels,
      nftStatus: "Minted",
    };

    let nfts = await createNftService(nft);

    return successResponse(res, 200, nftCreatedSuccess, { data: nfts });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User NFTs
// @route     POST/api/v1/nft/GetUserNft
// @access    Public
const GetUserNft = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const nfts = await getUserNfts(id);
    return successResponse(res, 200, nftDataSuccess, {
      data: nfts,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get NFTs By Collection Id
// @route     POST/api/v1/nft/GetNftsByCollectionId
// @access    Public
const GetNftsByCollectionId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { collectionId } = req.body as { collectionId: string };
    const nfts = await getNftsByCollection(collectionId);
    return successResponse(res, 200, nftDataSuccess, {
      data: nfts,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Create Draft NFT
// @route     POST /api/v1/nft/CreateDraftNft
// @access    Public
const CreateDraftNft = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let {
      collectionId,
      creatorAccountId,
      nftName,
      nftTokenId,
      royalty,
      blockChainName,
      chainId,
      description,
      externalLink,
      iPfsURL,
      currency,
      transactionHash,
      price,
      ownerWalletAddress,
      NftProperties,
      NftStats,
      NftLevels,
    } = req.body as {
      collectionId: string;
      creatorAccountId: string;
      nftName: string;
      nftTokenId: string;
      royalty: number;
      blockChainName: string;
      chainId: string;
      description: string;
      externalLink: string;
      iPfsURL: string;
      currency: string;
      transactionHash: string;
      price: number;
      ownerWalletAddress: string;
      NftProperties: Object;
      NftStats: Object;
      NftLevels: Object;
    };
    // @ts-ignore
    let userId = req.user?.id;

    let collection = await getCollectionById(collectionId);

    if (!collection) {
      return errorResponse(res, 400, "collection does not exist!");
    }

    let nft: INftAttrs = {
      mintingAccountId: userId,
      ownerAccountId: userId,
      OldOwnerAccountId: userId,
      // @ts-ignore
      collectionId: collection._id,
      creatorAccountId: userId,
      nftName,
      nftTokenId,
      royalty,
      blockChainName,
      chainId,
      description,
      externalLink,
      iPfsURL,
      currency,
      transactionHash,
      isMinted: false,
      isDraft: true,
      buyPrice: price,
      ownerWalletAddress,
      NftProperties,
      NftStats,
      NftLevels,
      nftStatus: "Minted",
    };

    let nfts = await createNftService(nft);

    return successResponse(res, 200, nftCreatedSuccess, { data: nfts });
  } catch (error) {
    next(error);
  }
};

// @desc      List NFT for Auction
// @route     POST /api/v1/nft/ListNFTForAuction
// @access    Public
const ListNFTForAuction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { nftId, transactionHash, currency, price, startTime, endTime } =
      req.body as {
        nftId: string;
        transactionHash: string;
        currency: string;
        price: number;
        startTime: Date;
        endTime: Date;
      };
    // @ts-ignore
    let userId = req.user?.id;

    let nfts = await getMintedNftById(nftId, userId, "Minted");
    if (!nfts) {
      return errorResponse(res, 400, "NFT does not exist!");
    }

    nfts.sellMode = "AUCTION";
    nfts.freezeTransactionHash = transactionHash;
    nfts.currency = currency;
    nfts.buyPrice = price;
    nfts.startTime = startTime;
    nfts.endTime = endTime;
    nfts.isOnSale = true;
    nfts.isMinted = false;
    nfts.isDraft = false;
    nfts.save();

    return successResponse(res, 200, nftListedSuccess, { data: nfts });
  } catch (error) {
    next(error);
  }
};

export {
  createNft,
  GetUserNft,
  GetNftsByCollectionId,
  CreateDraftNft,
  ListNFTForAuction,
};
