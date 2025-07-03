import express, { Router } from "express";
import {
  createNft,
  GetUserNft,
  GetNftsByCollectionId,
  CreateDraftNft,
  ListNFTForAuction,
} from "./nfts.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validateNftParams,
  validateNftsParams,
  validateAuctionNftsParams,
  isNftlisted,
} from "./nfts.middleware";
import { isCollectionDoesNotExist } from "../nftCollection/nftCollection.middleware";

const router: Router = express.Router();

// Create the nft
router
  .route("/CreateNft")
  .post(verifyJWT, validateNftParams, isCollectionDoesNotExist, createNft);

// Get User Nft
router.route("/GetUserNft").get(verifyJWT, GetUserNft);

// Get Nfts By Collection Id
router
  .route("/GetNftsByCollectionId")
  .post(verifyJWT, validateNftsParams, GetNftsByCollectionId);

// Create the draft nft
router
  .route("/CreateDraftNft")
  .post(verifyJWT, validateNftParams, isCollectionDoesNotExist, CreateDraftNft);

// List nft for timed auctioned
router
  .route("/ListNFTForAuction")
  .post(verifyJWT, validateAuctionNftsParams, isNftlisted, ListNFTForAuction);

export default router;
