import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token =
    authHeader.split(" ")[1] != "Bearer"
      ? authHeader.split(" ")[1]
      : authHeader.split(" ")[2];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
    (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({ success: false, error: "Invalid token" }); //invalid token
      //@ts-ignore
      req.user = decoded;
      //@ts-ignore
      req.roles = decoded.roles;
      next();
    }
  );
};

export { verifyJWT };
