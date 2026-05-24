import challengesServices from "./challenges.services.js";

const createChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, recipeId, weekStart, weekEnd } = req.body;

    if (!title || !description || !weekStart || !weekEnd) {
      return res.status(400).json({
        success: false,
        message: "Title, description, weekStart, dan weekEnd wajib diisi",
      });
    }

    const data = await challengesServices.createChallenge(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Berhasil membuat challenge",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllChallenges = async (req, res) => {
  try {
    const data = await challengesServices.getAllChallenges();

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil semua challenge",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await challengesServices.getChallengeById(id);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil detail challenge",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const joinChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await challengesServices.joinChallenge(userId, id);

    return res.status(201).json({
      success: true,
      message: "Berhasil ikut challenge",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const data = await challengesServices.deleteChallenge(userId, id);

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
  getChallengeById,
  getAllChallenges,
  joinChallenge,
  createChallenge,
  deleteChallenge,
};
