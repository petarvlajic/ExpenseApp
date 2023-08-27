import { Request, Response } from "express";
import {
  createSalary,
  getSalariesByUserAndDate,
} from "../services/salaryService";

export const createSalaryController = async (req: Request, res: Response) => {
  try {
    const { userID, amount, date } = req.body;
    const newSalary = await createSalary(userID, amount, date);
    res.json(newSalary);
  } catch (error) {
    console.error("Error creating salary:", error);
    res.status(500).json({ error: "Failed to create salary" });
  }
};

export const getSalariesByUserAndDateController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = req.params.userId;
    const date = new Date(req.params.date); // Convert date string to Date object
    const salaries = await getSalariesByUserAndDate(userID, date);
    res.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ error: "Failed to fetch salaries" });
  }
};
