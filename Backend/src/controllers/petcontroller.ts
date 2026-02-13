import { Request, Response } from "express";
import db, { sequelize } from "../config/db";
import Pet from "../models/petsmodel";

// Obtener todas las mascotas
export const getPets = async (req: Request, res: Response) => {
  try {
    const rows = await db.petModel.findAll();

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener mascotas:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};
export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const pet = await db.petModel.findByPk(id);
    if (!pet) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    await pet.update(data);
    res.status(200).json(pet);
  } catch (error) {
    console.error("Error al actualizar mascota:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Registrar nueva mascota
export const createPet = async (req: Request, res: Response) => {
  try {
    const { name, species, breed, sex, age, owner, phone } = req.body;

    if (!name || !species || !breed || !sex || !age || !owner || !phone) {
      res.status(400).json({ error: "Todos los campos son obligatorios" });
      return;
    }

    const result = await db.petModel.create({
      name,
      species,
      breed,
      sex,
      age,
      owner,
      phone,
    });

    const insertedId = result ? result : null;

    const newPet = {
      id: insertedId,
      name,
      species,
      breed,
      sex,
      age,
      owner,
      phone,
    };

    res.status(201).json(newPet);
  } catch (error) {
    console.error("Error al registrar mascota:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await db.petModel.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ error: "Mascota no encontrada" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar mascota:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// export const getPetById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const pet = await Pet.findByPk(id);

//     if (!pet) {
//       return res.status(404).json({ message: "Mascota no encontrada" });
//     }

//     res.status(200).json(pet);
//   } catch (error) {
//     console.error("Error al obtener la mascota por ID:", error);
//     res.status(500).json({ message: "Error del servidor" });
//   }
// };

