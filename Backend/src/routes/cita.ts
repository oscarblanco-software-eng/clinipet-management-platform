import { Router } from "express";
import { Request, Response } from "express";
import { createCita, postCita } from "../controllers/agendarCita";
const router = Router();



    // tu lógica aquí

console.log("postCita es función?", typeof postCita);
router.post("/", createCita);
router.post("/get-all", postCita);

// router.delete("/:id", deletePet);

export default router;
