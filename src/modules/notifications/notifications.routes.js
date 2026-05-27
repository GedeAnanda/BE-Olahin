import { Router } from "express";
import notificationController from "./notifications.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import { z } from "zod";

const router = Router();

const createNotificationSchema = z.object({
  title: z.string().min(1, "Judul notifikasi wajib diisi"),
  message: z.string().min(1, "Pesan notifikasi wajib diisi"),
  type: z.enum(["EXPIRY", "BUDGET", "RECIPE", "COMMUNITY"], {
    errorMap: () => ({ message: "Type tidak valid" }),
  }),
});

router.get("/", authMiddleware, notificationController.getNotifications);
router.get(
  "/unread-count",
  authMiddleware,
  notificationController.getUnreadCount,
);
router.post(
  "/",
  authMiddleware,
  validate(createNotificationSchema),
  notificationController.createNotification,
);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);
router.patch("/read-all", authMiddleware, notificationController.markAllAsRead);
router.delete(
  "/:id",
  authMiddleware,
  notificationController.deleteNotification,
);

export default router;
