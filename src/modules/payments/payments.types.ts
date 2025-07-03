import { Types } from "mongoose";

interface IPaymentsAttrs {
  userId?: [Types.ObjectId];
  // nftId?: [Types.ObjectId];
  email?: string;
  // tokenId?: string;
  currency?: string;
  price?: number;
  isActive?: boolean;
}

export { IPaymentsAttrs };
