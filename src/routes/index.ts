import express, { Router, Request, Response, NextFunction } from "express";
import usersRoutes from "../modules/users/users.route";
import collectionRoutes from "../modules/nftCollection/nftCollection.route";
import nftsRoutes from "../modules/nfts/nfts.route";
import transacntionsRoutes from "../modules/transactionHistory/transactionHistory.route";
import paymentsRoutes from "../modules/payments/payments.route";
import packRoutes from "../modules/packs/packs.route";

import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";

const router: Router = express.Router();

// const mainResource = "/api/v1";
const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }",
};

//Health route
router.get(
  "/api/v1/health",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send("Ok");
  }
);

// app routes
router.use("/api/v1/auth", usersRoutes);
router.use("/api/v1/nft", collectionRoutes);
router.use("/api/v1/nft", nftsRoutes);
router.use("/api/v1/transactions", transacntionsRoutes);
router.use("/api/v1/payment", paymentsRoutes);
router.use("/api/v1/pack", packRoutes);

router.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerOutput, swaggerUiOptions)
);

export default router;
