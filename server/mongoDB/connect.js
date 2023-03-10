import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
//not

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
