import { Schema, model } from "mongoose";
import { IUserAttrs } from "./users.types";
import { ACCOUNT_STATUS, ROLES_LIST } from "../../config/enums";

const userSchema = new Schema<IUserAttrs>({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  userName: {
    type: String,
    default: null,
    // required: true,
  },
  email: {
    type: String,
    pattern: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  accountType: { type: String, default: null },
  address: { type: String, default: null },
  bio: { type: String, default: null },
  dob: { type: String, default: null },
  city: { type: String, default: null },
  faceBookLink: { type: String, default: null },
  twitterLink: { type: String, default: null },
  instagramLink: { type: String, default: null },
  yourSiteLink: { type: String, default: null },
  profileImage: { type: String, default: null },
  profileBannerImage: { type: String, default: null },
  isStacked: { type: String, default: null },
  location: { type: String, default: null },
  isEmailVerfied: { type: Boolean, default: false },
  accountStatus: { type: Boolean, default: ACCOUNT_STATUS.isActive },
  publicKey: { type: String, default: null },
  secretKey: { type: String, default: null },
  stripeAccountID: { type: String, default: null },
  roles: { type: Object, default: ROLES_LIST.User },
  followersCount: { type: Number, default: 0 },
  nftSellPrice: { type: Number, default: 0 },
  isVerfiedAccount: { type: Boolean, default: false },
  isGoogle: { type: Boolean, default: false },
  isTwitter: { type: Boolean, default: false },
  depositeBalance: { type: Number, default: 0 },
});

const User = model<IUserAttrs>("User", userSchema);

export { User };
