import { Schema, model } from "mongoose";
import { IUserPasswordAttrs } from "./usersPasword.types";
import { ACCOUNT_STATUS, ROLES_LIST } from "../../config/enums";

const usersPaswordSchema = new Schema<IUserPasswordAttrs>({
  email: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenExpire: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UsersPasword = model<IUserPasswordAttrs>(
  "usersPasword",
  usersPaswordSchema
);

export { UsersPasword };
