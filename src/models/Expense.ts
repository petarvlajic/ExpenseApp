import { Schema, model, Document } from "mongoose";

interface IExpense extends Document {
  userId: string;
  category: string;
  name: string;
  price: number;
}

const expenseSchema = new Schema<IExpense>(
  {
    userId: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Expense = model<IExpense>("Expense", expenseSchema);

export default Expense;
