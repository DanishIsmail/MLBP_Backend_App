import { Packs } from "./packs.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";

const isPackExistService = (query: object) => {
  return Packs.exists(query);
};

const updatePackservice = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return Packs.findOneAndUpdate(query, update, options);
};

const createPackservice = (query: object) => {
  return Packs.create(query);
};

//Get Pack By _id
const getPackById = (id: string) => {
  return Packs.findById(id);
};

//Get Minted Pack By _id
const getMintedPackById = (id: string, userId: string, packstatus: string) => {
  return Packs.findOne({
    _id: id,
    ownerAccountId: userId,
    packstatus: packstatus,
  });
};

const getPacksByUserId = (userId: string) => {
  return Packs.find({ userId: userId });
};

const getAllPacks = () => {
  return Packs.find();
};

const getUserPacks = (userId: string) => {
  return Packs.find({ ownerAccountId: userId });
};

const getUserPackslisted = (userId: string, PackId: string) => {
  return Packs.findOne({ _id: PackId, ownerAccountId: userId, isOnSale: true });
};

const getPacksByCollection = (collectionId: string) => {
  return Packs.find({ collectionId: collectionId });
};
//CLEAR  Packs TABLE
const clearPacks = async () => {
  await Packs.deleteMany({});
};

export {
  updatePackservice,
  createPackservice,
  isPackExistService,
  getAllPacks,
  getPackById,
  getPacksByUserId,
  clearPacks,
  getUserPacks,
  getPacksByCollection,
  getMintedPackById,
  getUserPackslisted,
};
