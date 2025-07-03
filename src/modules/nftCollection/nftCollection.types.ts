import { Types } from "mongoose";

interface ICollectionAttrs {
  userId?: [Types.ObjectId];
  collectionName?: string;
  colectionSymbol?: string;
  maxSupply?: number;
  nftCount?: number;
  collectionLogo?: string;
  bannerImage?: string;
  isActive?: boolean;
}

export { ICollectionAttrs };
