import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

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
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ error: "Invalid credentials" });
  }
};
