import express from "express";
import {
  deleteUserController,
  loginUserController,
  registerUserController,
} from "../controllers/authController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.route("/delete/:userId").delete(auth, deleteUserController);

export default router;
