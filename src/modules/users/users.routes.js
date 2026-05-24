import { Router } from "express";
import usersController from "./users.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/:id/profile", usersController.getUserProfile);
router.patch("/me", authMiddleware, usersController.updateProfil);

export default router;
