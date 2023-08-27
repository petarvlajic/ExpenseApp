import connectDB from "./config/database";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import salaryRoutes from "./routes/salaryRoutes";

// Load Environemnt variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/api", expenseRoutes);
app.use("/api", salaryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
