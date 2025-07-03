import { Types } from "mongoose";

interface ITransactionHistoryAttrs {
  userId?: [Types.ObjectId];
  nftId?: [Types.ObjectId];
  transactionId?: string;
  event?: string;
  walletAccountId?: string;
  isActive?: boolean;
}

export { ITransactionHistoryAttrs };
