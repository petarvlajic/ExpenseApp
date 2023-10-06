import express from "express";
import {
  checkUsernameValidty,
  deleteUserController,
  loginUserController,
  registerUserController,
} from "../controllers/authController";
import auth from "../middlewares/auth";

const router = express.Router();

router.route("/delete/:userId").delete(auth, deleteUserController);
router.get("/check-username/:username", checkUsernameValidty);
router.post("/register", registerUserController);
router.post("/login", loginUserController);

export default router;
