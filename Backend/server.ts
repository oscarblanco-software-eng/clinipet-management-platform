import express from "express";
import { connectDB, sequelize } from "./src/config/db";
import "./src/models/user.model";
import "./src/models/service.model";
import "./src/models/order.model";
import "./src/models/payment.model";
import "./src/models/petsmodel";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes";
import dotenv from "dotenv";
import petRoutes from "./src/routes/pets";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//app.use(bodyParser.json()); // para procesar JSON del body

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`🟢 Servidor backend en el puerto ${PORT}`);
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log("🟢 Tablas sincronizadas");
});
