// // routes/consultations.js
// const express = require("express");
// const router = express.Router();
// const { Consultation } = require("../models/Consultation");

// // GET: Consultas por mascota
// router.get("/pet/:petId", async (req, res) => {
//   try {
//     const consultations = await Consultation.findAll({
//       where: { petId: req.params.petId },
//       order: [["date", "DESC"]],
//     });
//     res.json(consultations);
//   } catch (err) {
//     res.status(500).json({ error: "Error al obtener consultas" });
//   }
// });

// // POST: Crear nueva consulta
// router.post("/", async (req, res) => {
//   try {
//     const { petId, date, symptoms, diagnosis, treatment } = req.body;
//     const consultation = await Consultation.create({
//       petId,
//       date,
//       symptoms,
//       diagnosis,
//       treatment,
//     });
//     res.json(consultation);
//   } catch (err) {
//     res.status(500).json({ error: "Error al crear la consulta" });
//   }
// });

// module.exports = router;
