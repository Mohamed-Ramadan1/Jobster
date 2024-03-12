import { getAllJobs } from "../controllers/jobController.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllJobs);

export default router;
