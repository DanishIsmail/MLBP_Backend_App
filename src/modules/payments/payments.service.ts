import { Payments } from "./payments.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY!, {
  apiVersion: "2023-10-16",
});

const isPaymentsExistService = (query: object) => {
  return Payments.exists(query);
};

const updatePaymentsService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return Payments.findOneAndUpdate(query, update, options);
};

const createPaymentsService = (query: object) => {
  return Payments.create(query);
};

//Get Payments By _id
const getPaymentsById = (id: string) => {
  return Payments.findById(id);
};

const getPaymentsByUserId = (userId: string) => {
  return Payments.find({ userId: userId });
};

const getAllPayments = () => {
  return Payments.find();
};

//CLEAR  Paymentss TABLE
const clearPaymentss = async () => {
  await Payments.deleteMany({});
};

// create stripe customer
const createStripeCustomer = async (body: Stripe.CustomerCreateParams) => {
  return await stripe.customers.create({
    name: body.name,
    email: body.email,
    description: "new customer",
  });
};

const createStripeSession = async (
  params: Stripe.Checkout.SessionCreateParams
) => {
  return await stripe.checkout.sessions.create(params);
};
export {
  updatePaymentsService,
  createPaymentsService,
  isPaymentsExistService,
  getAllPayments,
  getPaymentsById,
  getPaymentsByUserId,
  clearPaymentss,
  createStripeCustomer,
  createStripeSession,
};
