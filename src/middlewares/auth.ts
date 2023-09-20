import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.cookie?.split("=")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      (req as any).userId = (decoded as any).userId;
      (req as any).user = await User.findById((decoded as any).id);
      next();
    } catch (err) {
      res.status(401).json({ msg: "Invalid Token" });
    }
  } else {
    console.log("Unauthorized");
    res.status(401).json({ msg: "Unauthorized" });
  }
};

export default auth;
