import { Schema, model } from "mongoose";
import { INftAttrs } from "./nfts.types";
import { object } from "joi";

const nftsSchema = new Schema<INftAttrs>({
  mintingAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  ownerAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: "NftCollection",
    required: true,
  },
  OldOwnerAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  creatorAccountId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  nftName: { type: String, required: true },
  nftTokenId: { type: String, required: true },
  nftSerial: { type: Number, default: 1 },
  NftProperties: { type: Object, default: {} },
  NftStats: { type: Object, default: {} },
  NftLevels: { type: Object, default: {} },
  ownerWalletAddress: { type: String, default: null },
  orignType: { type: String, default: null },
  nftStatus: { type: String, required: true },
  buyPrice: { type: Number, default: 0 },
  supply: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
  royalty: { type: Number, default: 0 },
  blockChainName: { type: String, default: null },
  chainId: { type: String, default: null },
  description: { type: String, default: null },
  externalLink: { type: String, default: null },
  sensitiveContent: { type: String, default: null },
  unlockableContent: { type: String, default: null },
  unlockableContentNote: { type: String, default: null },
  freezeTransactionStauts: { type: String, default: null },
  freezeTransactionHash: { type: String, default: null },
  freezeData: { type: Boolean, default: true },
  nftTransactionType: { type: String, default: null },
  sellMode: { type: String, default: null },
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
  iPfsURL: { type: String, required: true },
  currency: { type: String, default: null },
  isMinted: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  isDraft: { type: Boolean, default: false },
  isAdminNft: { type: Boolean, default: false },
  isPhysicalNft: { type: Boolean, default: false },
  isVerifiedNft: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
});

const Nfts = model<INftAttrs>("Nfts", nftsSchema);

export { Nfts };
