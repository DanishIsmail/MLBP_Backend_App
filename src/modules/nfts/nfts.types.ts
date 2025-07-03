import { Types } from "mongoose";

interface INftAttrs {
  mintingAccountId?: [Types.ObjectId];
  ownerAccountId?: [Types.ObjectId];
  collectionId?: [Types.ObjectId];
  OldOwnerAccountId?: [Types.ObjectId];
  creatorAccountId?: [Types.ObjectId];
  nftName?: string;
  nftTokenId?: string;
  nftSerial?: number;
  NftProperties?: object;
  NftStats?: Object;
  NftLevels?: Object;
  ownerWalletAddress?: string;
  orignType: string;
  buyPrice?: number;
  nftStatus?: string;
  blockChainName?: string;
  chainId?: string;
  description?: string;
  externalLink?: string;
  sensitiveContent?: string;
  unlockableContent?: string;
  unlockableContentNote?: string;
  supply?: number;
  viewCount?: number;
  isMinted?: boolean;
  isOnSale?: boolean;
  isDraft?: boolean;
  sellMode?: string;
  startTime?: Date;
  endTime?: Date;
  isAdminNft?: boolean;
  isPhysicalNft?: boolean;
  isVerifiedNft?: boolean;
  freezeTransactionStauts?: string;
  freezeData?: boolean;
  freezeTransactionHash?: string;
  nftTransactionType?: string;
  iPfsURL?: string;
  currency?: string;
  royalty?: number;
  isActive?: boolean;
}

export { INftAttrs };
