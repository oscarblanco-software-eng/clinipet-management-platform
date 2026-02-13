import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import petRoutes from "./routes/pets";
import agendarRoutes from "./routes/cita";
import { connectDB, sequelize } from "./config/db";
//
//
// const consultationsRoutes = require("./routes/consultations");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API CLINIPET funcionando correctamente");
});

app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/agendarCita", agendarRoutes);
//app.use("/api/consultations", consultationsRoutes);
//router.get("/buscar/:nombre", buscarPorNombre);
//router.get("/:id", getPetById);

const startServer = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log("✅ Tablas sincronizadas correctamente");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
