import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import jobRouter from "./routes/jobRouter.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("Database Connected"));

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
