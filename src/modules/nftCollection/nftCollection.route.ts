import express, { Router } from "express";
import {
  createCollection,
  GetMyCollections,
  GetNftCollectionById,
} from "./nftCollection.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validateCollectionParams,
  validateGetCollectionParams,
  isCollectionExist,
  isCollectionDoesNotExist,
} from "./nftCollection.middleware";
const router: Router = express.Router();

// Create the nft collection
router
  .route("/CreateCollection")
  .post(verifyJWT,  validateCollectionParams, createCollection);

//  Get the user nft collection
router.route("/GetMyCollections").post(verifyJWT, GetMyCollections);

// Get nft collection by id
router
  .route("/GetNftCollectionById")
  .post(verifyJWT, validateGetCollectionParams, GetNftCollectionById);

export default router;
