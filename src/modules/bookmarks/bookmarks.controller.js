import bookmarksService from "./bookmarks.service.js";

const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await bookmarksService.getBookmarks(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil semua bookmark",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.body;

    if (!recipeId) {
      return res.status(400).json({
        success: false,
        message: "recipeId wajib di isi ",
      });
    }

    const data = await bookmarksService.addBookmark(userId, recipeId);

    return res.status(201).json({
      success: true,
      message: "Berhasil bookmark resep",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { recipeId } = req.params;

    const data = await bookmarksService.deleteBookmark(userId, recipeId);

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

export default { getBookmarks, addBookmark, deleteBookmark };
