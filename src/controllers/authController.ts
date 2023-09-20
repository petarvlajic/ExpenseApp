import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  deleteUser,
  changeUserPassword,
} from "../services/authService";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    await registerUser({ email, password, username });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    await deleteUser(userID);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

export const changeUserPasswordController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = req.params.userId;
    const { newPassword } = req.body;

    await changeUserPassword(userID, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
};
