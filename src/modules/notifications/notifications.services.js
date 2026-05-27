import prisma from "../../config/database.js";

const getNotifications = async (userId) => {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return notifications;
};

const getUnreadCount = async (userId) => {
  const count = await prisma.notification.count({
    where: {
      userId,
      isRead: false,
    },
  });

  return { unreadCount: count };
};

const markAsRead = async (userId, notificationId) => {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification) {
    throw new Error("Notifikasi tidak ditemukan");
  }

  if (notification.userId !== userId) {
    throw new Error("Kamu tidak berhak mengubah notifikasi ini");
  }

  const updated = await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return updated;
};

const markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

  return { message: "Semua notifikasi telah dibaca" };
};

const createNotification = async (userId, body) => {
  const { title, message, type } = body;

  const notification = await prisma.notification.create({
    data: { userId, title, message, type },
  });

  return notification;
};

const deleteNotification = async (userId, notificationId) => {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification) {
    throw new Error("Notifikasi tidak ditemukan");
  }

  if (notification.userId !== userId) {
    throw new Error("Kamu tidak berhak menghapus notifikasi ini");
  }

  await prisma.notification.delete({
    where: { id: notificationId },
  });

  return { message: "Notifikasi berhasil dihapus" };
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification,
};
