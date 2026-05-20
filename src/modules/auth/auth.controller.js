import authService from "./auth.service.js  ";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, dan Password wajib di isi",
      });
    }

    const data = await authService.register(name, email, password);

    return res.status(201).json({
      success: true,
      message: "Register berhasil",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan Password wajib di isi",
      });
    }

    const data = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      message: "Login Berhasil",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await authService.getMe(userId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil data user",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default { register, login, getMe };
