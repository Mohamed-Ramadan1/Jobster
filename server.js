import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";

import jobRouter from "./routes/jobRouter.js";

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/v1/jobs", jobRouter);

const port = process.env.PORT || 5100;
0
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
