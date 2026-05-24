import { Router } from "express";
import challengesController from "./challenges.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", challengesController.getAllChallenges);
router.get("/:id", challengesController.getChallengeById);
router.post("/", authMiddleware, challengesController.createChallenge);
router.post("/:id/join", authMiddleware, challengesController.joinChallenge);
router.delete("/:id", authMiddleware, challengesController.deleteChallenge);

export default router;
