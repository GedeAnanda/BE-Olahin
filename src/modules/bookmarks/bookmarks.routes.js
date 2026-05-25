import { Router } from "express";
import bookmarksController from "./bookmarks.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { addBookmarkSchema } from "./bookmarks.validation.js";

const router = Router();

router.get("/", authMiddleware, bookmarksController.getBookmarks);
router.post(
  "/",
  authMiddleware,
  validate(addBookmarkSchema),
  bookmarksController.addBookmark,
);
router.delete("/:recipeId", authMiddleware, bookmarksController.deleteBookmark);

export default router;
