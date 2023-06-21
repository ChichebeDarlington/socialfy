import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import DBConnect from "./database/database.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// route middleware
app.use("/api/user", userRoute);

const port = process.env.PORT || 7000;
const start = async () => {
  try {
    await DBConnect(process.env.URI);
    app.listen(port, () => {
      console.log(`Server listening to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
