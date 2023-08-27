import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const registerUser = async (userData: {
  email: string;
  password: string;
  username: string;
}) => {
  const newUser = new User(userData);
  await newUser.save();
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  return token;
};
