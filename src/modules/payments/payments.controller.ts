import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import {
  createPaymentsService,
  getPaymentsByUserId,
  getPaymentsById,
  createStripeSession,
} from "./payments.service";
import { IPaymentsAttrs } from "./payments.types";
import {
  paymentCreatedSuccess,
  paymentsSuccess,
} from "../../utilities/errorMessages";
import dotenv from "dotenv";
import { getUserByEmailDetails, getUserById } from "../users/users.service";
import { getNftById } from "../nfts/nfts.service";
dotenv.config();

// @desc      Create Checkout Session
// @route     POST /api/v1/payment/createCheckoutSession
// @access    Public
const createCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { currency, price } = req.body as {
      currency: string;
      price: number;
    };
    // @ts-ignore
    let userId = req.user?.id;

    let user = await getUserById(userId);
    if (!user) {
      return res
        .status(500)
        .json({ success: false, error: "user does not exist in out database" });
    }

    let payment: IPaymentsAttrs = {
      userId,
      // @ts-ignore

      email: user.email,
      currency,
      price,
    };

    // create the payment object
    let result = await createPaymentsService(payment);

    let params = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency,
            unit_amount: price * 100, // Convert dollars to cents
            product_data: {
              name: "MLBP Tokens",
            },
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        metadata: {
          buyerId: userId,
          price: price,
          email: user.email,
        },
      },
      mode: "payment",
      success_url: `${process.env.STRIPE_CHECK_OUT_LINK}`,
      cancel_url: process.env.STRIPE_CHECK_OUT_CANCEL_LINK,
    };

    // @ts-ignore
    let session = await createStripeSession(params);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    return successResponse(res, 200, paymentCreatedSuccess, {
      id: session.url,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User Payments
// @route     POST/api/v1/payment/GetMyPayments
// @access    Public
const GetMyPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const payment = await getPaymentsByUserId(id);
    return successResponse(res, 200, paymentsSuccess, {
      data: payment,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get Payment By Id
// @route     POST/api/v1/payment/GetPaymentById
// @access    Public
const GetPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentId } = req.body as {
      paymentId: string;
    };
    const collection = await getPaymentsById(paymentId);
    return successResponse(res, 200, paymentsSuccess, {
      data: collection,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// payment-intent/webhook
// @desc      webhook call By stripe after successfull payment
// @route     POST/api/v1/payment/payment-intent/webhook
// @access    Public
const PaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    switch (req.body.type) {
      case "charge.succeeded":
        // case "customer.subscription.created":
        // case "invoice.updated":
        // case "checkout.session.completed":
        // case "payment_intent.succeeded":
        // case "payment_intent.created":
        // case "checkout.session.completed":
        // console.log("req.body==>", req.body);
        // console.log("name==>", req.body.data.object.billing_details.name);
        // console.log("email==>", req.body.data.object.billing_details.email);
        // console.log("amount in dollars==>", req.body.data.object.amount / 100);
        // console.log("metadata==>", req.body.data.object.metadata);
        if (req.body.data.object.metadata) {
          let email = req.body.data.object.metadata?.email;
          let amount = req.body.data.object.amount / 100;
          let user = await getUserByEmailDetails(email);
          console.log("current user=>", user);
          if (user && amount) {
            // @ts-ignore
            user?.depositeBalance += amount;
            user?.save();
          }
        }
        // if (req.body.data.object.customer_email) {
        // }
        break;
      default:
        break;
    }
    return res.status(200).json({
      success: true,
      message: "NFT Purchased!",
    });
  } catch (error) {
    // res.json({ success: false, message: error });
    console.log("error:", error);
    next(error);
  }
};
export { createCheckoutSession, PaymentIntent, GetMyPayments, GetPaymentById };
