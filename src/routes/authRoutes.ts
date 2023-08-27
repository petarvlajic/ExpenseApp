import express from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/authController";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.route("/test").get(auth, () => {
  console.log("proslo");
});

export default router;
