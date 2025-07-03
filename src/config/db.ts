import mongoose, { ConnectOptions } from "mongoose";
import { IMongodbConnOptions } from "../utilities/common_interfaces";
import dotenv from "dotenv";
dotenv.config();

const connectDatabase = async () => {
  try {
    let connOptions: IMongodbConnOptions;
    connOptions = {
      useNewUrlParser: true,
    };
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      process.env.MONGO_URL!,
      connOptions as ConnectOptions
    );

    console.log("connected to database");
  } catch (error) {
    console.log("could not connect to database", error);
    process.exit(1);
  }
};

export { connectDatabase };
