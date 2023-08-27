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
