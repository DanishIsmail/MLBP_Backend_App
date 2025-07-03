import { User } from "./users.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";

const isUserExistService = (query: object) => {
  return User.exists(query);
};

const updateUserService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return User.findOneAndUpdate(query, update, options).select(
    "-email -password -roles"
  );
};

const createUserService = (query: object) => {
  return User.create(query);
};

//Get User By Email
const getUserByEmail = (email: string) => {
  return User.findOne({ email: email });
};

//Get User By Email
const getUserByEmailDetails = (email: string) => {
  return User.findOne({ email: email }).select("-password -secretKey");
};

//Get google user
const getGoogleUserBy = (email: string, isGoogle: boolean) => {
  return User.findOne({ email: email, isGoogle: isGoogle }).select(
    "-password -secretKey"
  );
};

//Get twitter user
const getTwitterUserBy = (email: string, isTwitter: boolean) => {
  return User.findOne({ email: email, isTwitter: isTwitter }).select(
    "-password -secretKey"
  );
};

//Get User By _id
const getUserById = (id: string) => {
  return User.findById(id);
};

const getUserByIdDetails = (id: string) => {
  return User.findById(id).select("-password -secretKey");
};

//CLEAR  USERS TABLE
const clearUsers = async () => {
  await User.deleteMany({});
};

export {
  updateUserService,
  createUserService,
  isUserExistService,
  getUserByEmail,
  getUserByEmailDetails,
  getUserByIdDetails,
  getUserById,
  clearUsers,
  getGoogleUserBy,
  getTwitterUserBy,
};
