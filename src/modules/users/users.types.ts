import { ACCOUNT_STATUS } from "../../config/enums";

interface IUserAttrs {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  accountType?: string;
  address?: string;
  bio?: string;
  dob?: string;
  city?: string;
  faceBookLink?: string;
  followersCount?: number;
  isEmailVerfied?: boolean;
  twitterLink?: string;
  instagramLink?: string;
  yourSiteLink?: string;
  profileImage?: string;
  profileBannerImage?: string;
  isKycVerified?: boolean;
  nftSellPrice?: number;
  isStacked?: string;
  location?: string;
  isVerfiedAccount?: boolean;
  accountStatus?: boolean;
  publicKey?: string;
  secretKey?: string;
  stripeAccountID?: string;
  isGoogle?: boolean;
  isTwitter?: boolean;
  roles?: object;
  depositeBalance?: number;
}

export { IUserAttrs };
