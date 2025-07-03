import { Schema, model } from "mongoose";
import { ICollectionAttrs } from "./nftCollection.types";

const nftCollectionSchema = new Schema<ICollectionAttrs>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  collectionName: { type: String, required: true },
  colectionSymbol: { type: String, required: true },
  maxSupply: { type: Number, default: 0 },
  nftCount: { type: Number, default: 0 },
  collectionLogo: { type: String, default: null },
  bannerImage: { type: String, default: null },
  isActive: { type: Boolean, default: true },
});

const NftCollection = model<ICollectionAttrs>(
  "NftCollection",
  nftCollectionSchema
);

export { NftCollection };
