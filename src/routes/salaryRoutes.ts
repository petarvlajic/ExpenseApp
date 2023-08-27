import express from "express";
import {
  createSalaryController,
  getSalariesByUserAndDateController,
} from "../controllers/salaryController";
import auth from "../middlewares/auth";

const router = express.Router();

// Define the routes
router.route("/salaries").post(auth, createSalaryController);
router
  .route("/salaries/:userId/:date")
  .get(auth, getSalariesByUserAndDateController);

export default router;
