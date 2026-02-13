//import { Router } from 'express';
import express from "express";
import "../models/user.model";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register); // <- Este debe estar
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
