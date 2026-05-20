import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../config/database.js";

const register = async (name, email, password) => {
  const existingUser = await prisma.user.findFirst({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email sudah digunakan");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

const login = async (email, password) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new Error("Email tidak ditemukan");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Password salah");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      bio: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User tidak ditemukan");
  }

  return user;
};

export default { register, login, getMe };
