import { Router } from "express";
import usersController from "./users.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { updateProfileSchema } from "./users.validation.js";

const router = Router();

router.get("/:id/profile", usersController.getUserProfile);
router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  usersController.updateProfil,
);

export default router;
