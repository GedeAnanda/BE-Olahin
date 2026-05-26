import ingredientsService from "./ingredients.service.js";

const getAllIngredients = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await ingredientsService.getAllIngredients(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil semua bahan",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getExpiringIngredients = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await ingredientsService.getExpiringIngredients(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil bahan yang akan kadalaurasa",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addIngredient = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await ingredientsService.addIngredient(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Berhasil tambah bahan",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateIngredient = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await ingredientsService.updateIngredient(
      userId,
      id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Berhasil update bahan",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await ingredientsService.deleteIngredient(userId, id);

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
  getAllIngredients,
  getExpiringIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
