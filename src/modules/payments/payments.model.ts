import { Schema, model } from "mongoose";
import { IPaymentsAttrs } from "./payments.types";

const paymentsSchema = new Schema<IPaymentsAttrs>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  // nftId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Nfts",
  //   required: true,
  // },
  email: { type: String, required: true },
  // tokenId: { type: String, required: true },
  currency: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

const Payments = model<IPaymentsAttrs>("Payments", paymentsSchema);

export { Payments };
