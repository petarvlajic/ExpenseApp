import { Request, Response } from "express";
import {
  createSalary,
  getSalariesByUser,
  getSalariesByUserAndDate,
  getSalariesByUserAndMonth,
  getSalariesByUserAndYear,
} from "../services/salaryService";

export const createSalaryController = async (req: Request, res: Response) => {
  try {
    const { userID, amount, date } = req.body;
    console.log(req.body);
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

export const getSalariesByUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = req.params.userId;
    const salaries = await getSalariesByUser(userID);
    res.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries:", error);
    res.status(500).json({ error: "Failed to fetch salaries" });
  }
};

export const getSalariesByUserAndMonthController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = req.params.userId;
    const month = parseInt(req.params.month); // Assuming you're passing month as a route parameter
    const salaries = await getSalariesByUserAndMonth(userID, month);
    res.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries by month:", error);
    res.status(500).json({ error: "Failed to fetch salaries by month" });
  }
};

export const getSalariesByUserAndYearController = async (
  req: Request,
  res: Response
) => {
  try {
    const userID = req.params.userId;
    const year = parseInt(req.params.year); // Assuming you're passing year as a route parameter
    const salaries = await getSalariesByUserAndYear(userID, year);
    res.json(salaries);
  } catch (error) {
    console.error("Error fetching salaries by year:", error);
    res.status(500).json({ error: "Failed to fetch salaries by year" });
  }
};
