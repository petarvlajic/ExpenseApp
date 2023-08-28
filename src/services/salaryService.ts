import Salary from "../models/Salary";

export const createSalary = async (
  userID: string,
  amount: number,
  date: Date
) => {
  const salary = new Salary({ userID, amount, date });
  return salary.save();
};

export const getSalariesByUserAndDate = async (userID: string, date: Date) => {
  return Salary.find({ userID, date });
};

export const getSalariesByUser = async (userID: string) => {
  return Salary.find({ userID });
};

export const getSalariesByUserAndMonth = async (
  userID: string,
  month: number
) => {
  return Salary.find({ userID, $expr: { $eq: [{ $month: "$date" }, month] } });
};

export const getSalariesByUserAndYear = async (
  userID: string,
  year: number
) => {
  return Salary.find({ userID, $expr: { $eq: [{ $year: "$date" }, year] } });
};
