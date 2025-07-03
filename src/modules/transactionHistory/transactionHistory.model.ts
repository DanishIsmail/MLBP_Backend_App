import { Schema, model } from "mongoose";
import { ITransactionHistoryAttrs } from "./transactionHistory.types";

const transactionHistorySchema = new Schema<ITransactionHistoryAttrs>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  nftId: {
    type: Schema.Types.ObjectId,
    ref: "Nfts",
    required: true,
  },
  transactionId: { type: String, required: true },
  event: { type: String, required: true },
  walletAccountId: { type: String, default: null },
  isActive: { type: Boolean, default: true },
});

const TransactionHistory = model<ITransactionHistoryAttrs>(
  "transactionHistory",
  transactionHistorySchema
);

export { TransactionHistory };
