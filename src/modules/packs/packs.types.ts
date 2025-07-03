import { Types } from "mongoose";

interface IPackAttrs {
  mintingAccountId?: [Types.ObjectId];
  ownerAccountId?: [Types.ObjectId];
  collectionId?: [Types.ObjectId];
  OldOwnerAccountId?: [Types.ObjectId];
  creatorAccountId?: [Types.ObjectId];
  packName?: string;
  packDescription?: string;
  nftIds?: [string];
  nftsCount?: number;
  ownerWalletAddress?: string;
  buyPrice?: number;
  blockChainName?: string;
  chainId?: string;
  sensitiveContent?: string;
  unlockableContent?: string;
  unlockableContentNote?: string;
  packstatus?: string;
  supply?: number;
  viewCount?: number;
  isMinted?: boolean;
  isOnSale?: boolean;
  isDraft?: boolean;
  isLocked?: boolean;
  sellMode?: string;
  startTime?: Date;
  endTime?: Date;
  isAdminPack?: boolean;
  isPhysicalPack?: boolean;
  isVerifiedPack?: boolean;
  transactionHash?: string;
  packCoverImageURL?: string;
  currency?: string;
  isActive?: boolean;
}

export { IPackAttrs };
