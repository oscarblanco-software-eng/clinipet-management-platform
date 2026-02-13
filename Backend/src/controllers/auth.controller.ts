import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { sendResetEmail } from "../utils/sendResetEmail";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../config/db";

const User = db.userModel;

// Registro de usuario
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const normalizedEmail = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      res.status(400).json({ message: "El correo ya está registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
    }).then((user) => user.toJSON());

    res.status(201).json({
      message: "Usuario registrado",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

// Login de usuario
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const normalizedEmail = req.body.email.trim().toLowerCase();
    const { password } = req.body;

    const user = await User.findOne({ where: { email: normalizedEmail } }).then(
      (user) => (user ? user.toJSON() : null)
    );
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Contraseña incorrecta" });
      return;
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );

    // Enviamos token y usuario con rol
    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        // Asegúrate que este campo exista en tu modelo User
      },
    });
  } catch (error) {
    next(error);
  }
};

// Solicitud de recuperación de contraseña
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const normalizedEmail = req.body.email.trim().toLowerCase();

    const user: any = await User.findOne({ where: { email: normalizedEmail } });
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.tokenExpires = new Date(Date.now() + 3600000); // Token válido por 1 hora

    await user.save();
    await sendResetEmail(user.email, token);

    res.json({ message: "Correo de recuperación enviado" });
  } catch (error) {
    next(error);
  }
};

// Restablecer contraseña con token
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({ where: { resetToken: token } }).then(
      (user) => (user ? user.toJSON() : null)
    );

    if (!user || !user.tokenExpires || user.tokenExpires < new Date()) {
      res.status(400).json({ message: "Token inválido o expirado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    user.resetToken = null;
    user.tokenExpires = null;

    await user.save();

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};
