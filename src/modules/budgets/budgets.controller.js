import budgetsService from "./budgets.service.js";

const getBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "Month dan Year wajib diisi",
      });
    }

    const data = await budgetsService.getBudget(userId, month, year);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil budget",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const createBudget = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await budgetsService.createBudget(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Berhasil buat budget",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { budgetId } = req.params;

    const data = await budgetsService.addTransaction(
      userId,
      budgetId,
      req.body,
    );

    return res.status(201).json({
      success: true,
      message: "Berhasil tambah transaksi",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { budgetId } = req.params;

    const data = await budgetsService.getTransactions(userId, budgetId);

    return res.status(200).json({
      success: true,
      message: "Berhasil ambil transaksi",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { transactionId } = req.params;

    const data = await budgetsService.deleteTransaction(userId, transactionId);

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
  getBudget,
  createBudget,
  addTransaction,
  getTransactions,
  deleteTransaction,
};
