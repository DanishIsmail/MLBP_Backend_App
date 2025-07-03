import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../../utilities/responses";
import {
  createTransactionService,
  getAllTransactionHistory,
  getTransactionById,
  getTransactionsByUserId,
} from "./transactionHistory.service";
import { ITransactionHistoryAttrs } from "./transactionHistory.types";
import {
  transctionCreatedSuccess,
  transactionSuccess,
} from "../../utilities/errorMessages";
import dotenv from "dotenv";
dotenv.config();

// @desc      Create Transaction History
// @route     POST /api/v1/transactions/createTransactionHistory
// @access    Public
const createTransactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nftId, transactionId, event, walletAccountId } = req.body as {
      nftId: string;
      transactionId: string;
      event: string;
      walletAccountId: string;
    };
    // @ts-ignore
    let userId = req.user?.id;
    let collection: ITransactionHistoryAttrs = {
      userId,
      // @ts-ignore
      nftId,
      transactionId,
      event,
      walletAccountId,
    };

    let result = await createTransactionService(collection);
    if (!result) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
    return successResponse(res, 200, transctionCreatedSuccess, {
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Get User Transactions
// @route     GET/api/v1/transactions/GetMyHistory
// @access    Public
const GetMyHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //@ts-ignore
    let id = req.user?.id;
    const history = await getTransactionsByUserId(id);
    return successResponse(res, 200, transactionSuccess, {
      history,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get Transactions By Id
// @route     POST/api/v1/transactions/GetTransactionHistoryById
// @access    Public
const GetTransactionHistoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { historyId } = req.body as {
      historyId: string;
    };
    const history = await getTransactionById(historyId);
    return successResponse(res, 200, transactionSuccess, {
      data: history,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

// @desc      Get All Transactions History
// @route     POST/api/v1/transactions/GetAllTransactionHistory
// @access    Public
const GetAllTransactionHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const history = await getAllTransactionHistory();
    return successResponse(res, 200, transactionSuccess, {
      data: history,
    });
  } catch (error) {
    console.log("error==>", error);
    next(error);
  }
};

export {
  createTransactionHistory,
  GetMyHistory,
  GetTransactionHistoryById,
  GetAllTransactionHistory,
};
