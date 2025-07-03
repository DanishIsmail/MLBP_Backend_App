import { UsersPasword } from "./usersPasword.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";
import { forgetPasswordEmail } from "../../helpers/email.service";
import crypto from "crypto";

const isUsersPaswordExistService = (query: object) => {
  return UsersPasword.exists(query);
};

const updateUserPasswordService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return UsersPasword.findOneAndUpdate(query, update, options);
};

const createUserPasswordService = (query: object) => {
  return UsersPasword.create(query);
};

//Get User By Email
const getUserPasswordByEmail = (email: string) => {
  return UsersPasword.findOne({ email: email });
};

//Get User By _id
const getUserPasswordById = (id: string) => {
  return UsersPasword.findById(id);
};

//CLEAR  USERS TABLE
const clearUsersPasword = async () => {
  await UsersPasword.deleteMany({});
};

// Delete the specific record
const deleteUsersPasword = async (email: string, tokenType: string) => {
  await UsersPasword.deleteOne({ email: email, tokenType: tokenType });
};

// Forget Password
const forgotUsersPasword = async (email: string) => {
  let user = await getUserPasswordByEmail(email);
  if (user) await deleteUsersPasword(email, "Forgot");

  let { resetToken, resetPasswordToken, resetTokenExpire } =
    await getResetPasswordToken();

  // sending email to user for recovery of account
  let emailToUser = await forgetPasswordEmail(email, resetToken);

  let usersPasword = {
    email: email,
    tokenType: "Forgot",
    token: resetPasswordToken,
    tokenExpire: resetTokenExpire,
  };
  await createUserPasswordService(usersPasword);
};

const getResetPasswordToken = async () => {
  //Create Token......
  const resetToken = crypto.randomBytes(20).toString("hex");

  //HASH THE TOKEN...
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const resetTokenExpire = Date.now() + 5 * 60 * 1000; //5 Minutes Expiration time......

  return { resetToken, resetPasswordToken, resetTokenExpire };
};

const checkPasswordTokenValidity = async (token: string) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  //Checking the token expiration....
  let query = {
    token: resetPasswordToken,
    tokenType: "Forgot",
    tokenExpire: { $gt: Date.now() },
  };
  let isExpired = await UsersPasword.findOne({
    token: resetPasswordToken,
    tokenType: "Forgot",
    tokenExpire: { $gt: Date.now() },
  });

  return isExpired;
};

export {
  updateUserPasswordService,
  createUserPasswordService,
  isUsersPaswordExistService,
  getUserPasswordByEmail,
  getUserPasswordById,
  clearUsersPasword,
  deleteUsersPasword,
  forgotUsersPasword,
  checkPasswordTokenValidity,
};
