import express, { Router } from "express";
import {
  createCheckoutSession,
  GetMyPayments,
  GetPaymentById,
  PaymentIntent,
} from "./payments.controller";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  validatePaymentsParams,
  validateGetPaymentParams,
} from "./payments.middleware";
import { isNftExist } from "../nfts/nfts.middleware";
const router: Router = express.Router();
// Create Checkout Session
router
  .route("/CreateCheckoutSession")
  .post(verifyJWT, validatePaymentsParams, createCheckoutSession);

//  Get the user payments
router.route("/GetMyPayments").post(verifyJWT, GetMyPayments);

// Get payment by id
router
  .route("/GetPaymentById")
  .post(verifyJWT, validateGetPaymentParams, GetPaymentById);

// webhook only called by stripe
router.route("/payment-intent/webhook").post(PaymentIntent);

export default router;
