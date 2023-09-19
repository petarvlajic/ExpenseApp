import connectDB from "./config/database";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import salaryRoutes from "./routes/salaryRoutes";
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Load Environemnt variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/api", expenseRoutes);
app.use("/api", salaryRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
