import prisma from "../../config/database.js";

const getBudget = async (userId, month, year) => {
  const budget = await prisma.budget.findUnique({
    where: {
      userId_month_year: {
        userId,
        month: Number(month),
        year: Number(year),
      },
    },
    include: {
      transactions: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!budget) {
    throw new Error("Budget tidak ditemukan");
  }

  const totalExpense = budget.transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = budget.transactions
    .filter((t) => t.type === "INCOME")
    .reduce((acc, t) => acc + t.amount, 0);

  return {
    ...budget,
    totalExpense,
    totalIncome,
    remaining: budget.limitAmount - totalExpense,
  };
};

const createBudget = async (userId, body) => {
  const { month, year, limitAmount } = body;

  const existing = await prisma.budget.findUnique({
    where: {
      userId_month_year: {
        userId,
        month: Number(month),
        year: Number(year),
      },
    },
  });

  if (existing) {
    throw new Error("Budget bulan ini sudah ada ");
  }

  const budget = await prisma.budget.create({
    data: {
      userId,
      month: Number(month),
      year: Number(year),
      limitAmount,
    },
  });

  return budget;
};

const addTransaction = async (userId, budgetId, body) => {
  const { title, amount, type } = body;

  const budget = await prisma.budget.findUnique({
    where: {
      id: budgetId,
    },
  });

  if (!budget) {
    throw new Error("Budget tidak ditemukan");
  }

  if (budget.userId !== userId) {
    throw new Error("Kamu tidak berhak menambah trasaksi ini");
  }

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      budgetId,
      title,
      amount,
      type,
    },
  });

  return transaction;
};

const getTransactions = async (userId, budgetId) => {
  const budget = await prisma.budget.findUnique({
    where: {
      id: budgetId,
    },
  });

  if (!budget) {
    throw new Error("Budget tidak ditemukan");
  }

  if (budget.userId !== userId) {
    throw new Error("Kamu tidak berhak melihat transaksi ini");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      budgetId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactions;
};

const deleteTransaction = async (userId, transactionId) => {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });

  if (!transaction) {
    throw new Error("Transaksi tidak ditemukan");
  }

  if (transaction.userId !== userId) {
    throw new Error("Kamu tidak berhak menghapus transaksi ini");
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  return { message: "Transaksi berhasil dihapus" };
};

export default {
  getBudget,
  createBudget,
  addTransaction,
  getTransactions,
  deleteTransaction,
};
