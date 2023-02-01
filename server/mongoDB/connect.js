import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectDB = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
