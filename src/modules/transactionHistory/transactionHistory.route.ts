import express, { Router } from "express";
import {
  createTransactionHistory,
  GetMyHistory,
  GetTransactionHistoryById,
  GetAllTransactionHistory,
} from "./transactionHistory.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validateTransactionParams,
  validateGetHistoryParams,
} from "./transactionHistory.middleware";
const router: Router = express.Router();

// Create Transaction History
router
  .route("/createTransactionHistory")
  .post(verifyJWT, validateTransactionParams, createTransactionHistory);

//  Get User Transactions
router.route("/GetMyHistory").get(verifyJWT, GetMyHistory);

// Get Transactions By Id
router
  .route("/GetTransactionHistoryById")
  .post(verifyJWT, validateGetHistoryParams, GetTransactionHistoryById);

// Get All Transactions History
router
  .route("/GetAllTransactionHistory")
  .get(verifyJWT, GetAllTransactionHistory);

export default router;
