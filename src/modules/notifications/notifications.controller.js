import notificationService from "./notifications.service.js";

const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await notificationService.getNotifications(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil semua notifikasi",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await notificationService.getUnreadCount(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil jumlah notifikasi belum dibaca",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await notificationService.markAsRead(userId, id);

    return res.status(200).json({
      success: true,
      message: "Notifikasi berhasil ditandai sudah dibaca",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await notificationService.markAllAsRead(userId);

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createNotification = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await notificationService.createNotification(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Berhasil buat notifikasi",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await notificationService.deleteNotification(userId, id);

    return res.status(200).json({
      success: true,
      message: data.message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification,
};
