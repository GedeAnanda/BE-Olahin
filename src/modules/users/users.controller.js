import usersService from "./users.service.js";

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await usersService.getUserProfile(id);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil profil user",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProfil = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await usersService.updateProfil(userId, req.body);

    return res.status(200).json({
      success: true,
      message: "Berhasil update profil",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default { getUserProfile, updateProfil };
