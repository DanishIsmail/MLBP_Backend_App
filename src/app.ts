import express, { Application } from "express";
import path from "path";
import cors from "cors";
import { connectDatabase } from "./config/db";
import routes from "./routes";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

// Database Connection.
connectDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(routes);

const port = process.env.PORT || 6500;
app.listen(port, () => console.log(`running on port ${port}`));
