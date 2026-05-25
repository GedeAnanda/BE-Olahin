import { Router } from "express";
import challengesController from "./challenges.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { createChallengeSchema } from "./challenges.validation.js";

const router = Router();

router.get("/", challengesController.getAllChallenges);
router.get("/:id", challengesController.getChallengeById);
router.post(
  "/",
  authMiddleware,
  validate(createChallengeSchema),
  challengesController.createChallenge,
);
router.post("/:id/join", authMiddleware, challengesController.joinChallenge);
router.delete("/:id", authMiddleware, challengesController.deleteChallenge);

export default router;

