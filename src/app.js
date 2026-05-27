import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import recipeRoutes from "./modules/recipes/recipes.routes.js";
import bookmarkRoutes from "./modules/bookmarks/bookmarks.routes.js";
import challengeRoutes from "./modules/challenges/challenges.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import ingredientsRoutes from "./modules/ingredients/ingredients.routes.js";
import budgetRoutes from "./modules/budgets/budgets.routes.js";
import notificationRoutes from "./modules/notifications/notifications.routes.js";

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
app.use("/api/recipes", recipeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;
