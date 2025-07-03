import express, { Router } from "express";
import {
  createPack,
  GetUserPack,
  GetPacksByCollectionId,
  CreateDraftPack,
  ListPackForAuction,
} from "./packs.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validatePacksParams,
  validatePackParams,
  validateAuctionPackParams,
  isPacklisted,
} from "./packs.middleware";
import { isCollectionDoesNotExist } from "../nftCollection/nftCollection.middleware";

const router: Router = express.Router();

// Create the Pack
router
  .route("/CreatePack")
  .post(verifyJWT, validatePacksParams, isCollectionDoesNotExist, createPack);

// Get User Pack
router.route("/GetUserPack").get(verifyJWT, GetUserPack);

// Get Pack By Collection Id
router
  .route("/GetPacksByCollectionId")
  .post(verifyJWT, validatePackParams, GetPacksByCollectionId);

// Create the draft pack
router
  .route("/CreateDraftPack")
  .post(
    verifyJWT,
    validatePacksParams,
    isCollectionDoesNotExist,
    CreateDraftPack
  );

// List pack for timed auctioned
router
  .route("/ListPackForAuction")
  .post(verifyJWT, validateAuctionPackParams, isPacklisted, ListPackForAuction);

export default router;
