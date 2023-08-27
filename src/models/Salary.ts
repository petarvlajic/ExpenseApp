import { Schema, model, Document } from "mongoose";

interface ISalary extends Document {
  userID: string;
  amount: number;
  date: Date;
}

const salarySchema = new Schema<ISalary>({
  userID: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Salary = model<ISalary>("Salary", salarySchema);

export default Salary;
