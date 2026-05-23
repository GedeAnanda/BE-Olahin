import { Router } from "express";
import bookmarksController from "./bookmarks.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, bookmarksController.getBookmarks);
router.post("/", authMiddleware, bookmarksController.addBookmark);
router.delete("/:recipeId", authMiddleware, bookmarksController.deleteBookmark);

export default router;
