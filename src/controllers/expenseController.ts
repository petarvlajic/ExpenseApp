import { Request, Response } from "express";
import {
  createExpense,
  getAllExpensesByCategoryAndUserId,
  getAllExpensesByUserId,
  getUniqueExpenseCategoriesByUserId,
} from "../services/expenseService";

export const createExpenseController = async (req: Request, res: Response) => {
  try {
    const { category, name, price } = req.body;
    const userId = (req as any).userId;
    await createExpense({ userId, category, name, price });
    res.status(201).json({ message: "Expense created successfully" });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

export const getAllExpensesByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Assuming you're passing userId as a route parameter
    const expenses = await getAllExpensesByUserId(userId);
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export const getUniqueExpenseCategoriesByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const categories = await getUniqueExpenseCategoriesByUserId(userId);
    res.json(categories);
  } catch (error) {
    console.error("Error fetching unique categories:", error);
    res.status(500).json({ error: "Failed to fetch unique categories" });
  }
};

export const getAllExpensesByCategoryAndUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const category = req.params.category; // Assuming you're passing category as a route parameter
    const expenses = await getAllExpensesByCategoryAndUserId(userId, category);
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    res.status(500).json({ error: "Failed to fetch expenses by category" });
  }
};
