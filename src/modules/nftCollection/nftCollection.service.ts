import { NftCollection } from "./nftCollection.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";

const isCollectionExistService = (query: object) => {
  return NftCollection.exists(query);
};

const updateCollectionService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return NftCollection.findOneAndUpdate(query, update, options);
};

const createCollectionService = (query: object) => {
  return NftCollection.create(query);
};

//Get Collection By _id
const getCollectionById = (id: string) => {
  return NftCollection.findById(id);
};

const getCollectionsByUserId = (userId: string) => {
  return NftCollection.find({ userId: userId });
};

const getAllNFTCollection = () => {
  return NftCollection.find();
};

//CLEAR  Collections TABLE
const clearCollections = async () => {
  await NftCollection.deleteMany({});
};

export {
  updateCollectionService,
  createCollectionService,
  isCollectionExistService,
  getAllNFTCollection,
  getCollectionById,
  getCollectionsByUserId,
  clearCollections,
};
