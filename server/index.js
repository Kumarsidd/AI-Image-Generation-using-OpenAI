import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const startServer = () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(6060, () => {
      console.log("Listening to 6060");
    });
  } catch (err) {
    console.log(err);
    res.send(500).json(err);
  }
};

startServer();
