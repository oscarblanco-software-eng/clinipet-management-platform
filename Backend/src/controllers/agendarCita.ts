import { Request, Response } from "express";
import db, { sequelize } from "../config/db";





export const createCita = async (req: Request, res: Response) => {
  try {
    const { date, hour, idVeterinary, idPet, endDate, status } = req.body;

    // Validación básica
    if (!date || !hour || !idPet) {
      return res
        .status(400)
        .json({ error: "Fecha, hora y mascota son obligatorios" });
    }

    // Crear nueva cita
    const newCita = await db.citaModel.create({
      date,
      hour,
      idVeterinary: idVeterinary || null,
      idPet,
      endDate: endDate || null,
      status: status || "pendiente",
    });

    res.status(201).json(newCita);
  } catch (error) {
    console.error("Error al registrar cita:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Obtener todas las mascotas
export const postCita = async (req: Request, res: Response) => {
  try {
    // const rows = await sequelize.query("SELECT * FROM cita", {
    //   type: QueryTypes.SELECT,
    // });

    const rows = await db.citaModel.findAll({
      include: [
        {
          model: db.petModel,
          as: "pet",
        },
      ],
    });

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener cita:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};



  

