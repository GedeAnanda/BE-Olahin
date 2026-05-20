import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Olahin API is running!",
  });
});

app.use("/api/auth", authRoutes);

export default app;
