import { Router } from "express";
import {
  getPets,
  createPet,
  deletePet,
  updatePet,
  //getPetById,
} from "../controllers/petcontroller";

const router = Router();

router.get("/", getPets);
router.post("/", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);
//router.get("/:id", getPetById);

export default router;
