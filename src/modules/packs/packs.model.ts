import { Schema, model } from "mongoose";
import { IPackAttrs } from "./packs.types";

const nftsSchema = new Schema<IPackAttrs>({
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
  packName: { type: String, required: true },
  packDescription: { type: String, default: null },
  nftIds: { type: [String], required: true },
  nftsCount: { type: Number, default: 1 },
  ownerWalletAddress: { type: String, default: null },
  buyPrice: { type: Number, default: 0 },
  supply: { type: Number, default: 0 },
  packstatus: { type: String, default: null },
  viewCount: { type: Number, default: 0 },
  blockChainName: { type: String, default: null },
  chainId: { type: String, default: null },
  sensitiveContent: { type: String, default: null },
  unlockableContent: { type: String, default: null },
  unlockableContentNote: { type: String, default: null },
  transactionHash: { type: String, default: null },
  sellMode: { type: String, default: null },
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
  packCoverImageURL: { type: String, required: true },
  currency: { type: String, default: null },
  isMinted: { type: Boolean, default: true },
  isOnSale: { type: Boolean, default: false },
  isDraft: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: true },
  isAdminPack: { type: Boolean, default: false },
  isPhysicalPack: { type: Boolean, default: false },
  isVerifiedPack: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
});

const Packs = model<IPackAttrs>("Packs", nftsSchema);

export { Packs };
