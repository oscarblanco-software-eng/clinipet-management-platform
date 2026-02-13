import { Router } from "express";
import { createCita, postCita } from "../controllers/agendarCita";

const router = Router();

router.post("/", createCita); // para crear cita
router.post("/get-all", postCita); // para obtener todas

export default router;