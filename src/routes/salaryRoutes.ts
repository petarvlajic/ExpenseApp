import express from "express";
import {
  createSalaryController,
  getSalariesByUserAndDateController,
  getSalariesByUserAndMonthController,
  getSalariesByUserAndYearController,
  getSalariesByUserController,
} from "../controllers/salaryController";
import auth from "../middlewares/auth";

const router = express.Router();

// Define the routes
router.route("/salaries").post(auth, createSalaryController);
router
  .route("/salaries/:userId/:date")
  .get(auth, getSalariesByUserAndDateController);

router.route("/salaries/:userId").get(auth, getSalariesByUserController);
router
  .route("/salaries/:userId/month/:month")
  .get(auth, getSalariesByUserAndMonthController);
router
  .route("/salaries/:userId/year/:year")
  .get(auth, getSalariesByUserAndYearController);
export default router;
