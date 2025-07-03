import { TransactionHistory } from "./transactionHistory.model";
import { findOneAndUpdateOptions } from "../../utilities/common_interfaces";

const isTransactionExistService = (query: object) => {
  return TransactionHistory.exists(query);
};

const updateTransactionService = (
  query: object,
  update: object,
  options: findOneAndUpdateOptions
) => {
  return TransactionHistory.findOneAndUpdate(query, update, options);
};

const createTransactionService = (query: object) => {
  return TransactionHistory.create(query);
};

//Get Transaction By _id
const getTransactionById = (id: string) => {
  return TransactionHistory.findById(id);
};

const getTransactionsByUserId = (userId: string) => {
  return TransactionHistory.find({ userId: userId });
};

const getTransactionsByNftId = (nftId: string) => {
  return TransactionHistory.find({ nftId: nftId });
};

const getAllTransactionHistory = () => {
  return TransactionHistory.find();
};

//CLEAR  Transactions TABLE
const clearTransactions = async () => {
  await TransactionHistory.deleteMany({});
};

export {
  updateTransactionService,
  createTransactionService,
  isTransactionExistService,
  getAllTransactionHistory,
  getTransactionById,
  getTransactionsByUserId,
  clearTransactions,
};
