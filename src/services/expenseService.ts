import Expense from "../models/Expense";

export const createExpense = async (expenseData: {
  userId: string;
  category: string;
  name: string;
  price: number;
}) => {
  const newExpense = new Expense(expenseData);
  await newExpense.save();
};

export const getAllExpensesByUserId = async (userId: string) => {
  return Expense.find({ userId });
};

export const getUniqueExpenseCategoriesByUserId = async (userId: string) => {
  return Expense.aggregate([
    { $match: { userId } },
    { $group: { _id: "$category" } },
    { $project: { _id: 0, category: "$_id" } },
  ]);
};

export const getAllExpensesByCategoryAndUserId = async (
  userId: string,
  category: string
) => {
  return Expense.find({ userId, category });
};
