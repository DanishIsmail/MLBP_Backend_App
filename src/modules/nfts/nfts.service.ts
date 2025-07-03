import { Nfts } from "./nfts.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";

const isNftExistService = (query: object) => {
  return Nfts.exists(query);
};

const updateNftService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return Nfts.findOneAndUpdate(query, update, options);
};

const createNftService = (query: object) => {
  return Nfts.create(query);
};

//Get Nft By _id
const getNftById = (id: string) => {
  return Nfts.findById(id);
};

//Get Minted Nft By _id
const getMintedNftById = (id: string, userId: string, nftStatus: string) => {
  return Nfts.findOne({
    _id: id,
    ownerAccountId: userId,
    nftStatus: nftStatus,
  });
};

const getNftsByUserId = (userId: string) => {
  return Nfts.find({ userId: userId });
};

const getAllNfts = () => {
  return Nfts.find();
};

const getUserNfts = (userId: string) => {
  return Nfts.find({ ownerAccountId: userId });
};

const getUserNftslisted = (userId: string, nftId: string) => {
  return Nfts.findOne({ _id: nftId, ownerAccountId: userId, isOnSale: true });
};

const getNftsByCollection = (collectionId: string) => {
  return Nfts.find({ collectionId: collectionId });
};
//CLEAR  NFTs TABLE
const clearNfts = async () => {
  await Nfts.deleteMany({});
};

export {
  updateNftService,
  createNftService,
  isNftExistService,
  getAllNfts,
  getNftById,
  getNftsByUserId,
  clearNfts,
  getUserNfts,
  getNftsByCollection,
  getMintedNftById,
  getUserNftslisted,
};
