import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import connectDB from "./mongoDB/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/v1/post", postRoutes);
app.use("/v1/dall-e", dalleRoutes);

app.get("/", async (req, res) => {
  res.send("HEllo from dall-e");
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => {
      console.log("Listening to 8080");
    });
  } catch (err) {
    console.log(err);
    res.send(500).json(err);
  }
};

startServer();
