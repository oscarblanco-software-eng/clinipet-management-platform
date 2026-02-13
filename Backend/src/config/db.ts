import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fUserModel from "../models/user.model";
import fPetModel from "../models/petsmodel";
import fCitaModel from "../models/cita.model";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
    logging: false,
  }
);

const db = {
  userModel: fUserModel(sequelize),
  petModel: fPetModel(sequelize),
  citaModel: fCitaModel(sequelize),
};

// Relaciones entre modelos
db.citaModel.belongsTo(db.petModel, {
  foreignKey: "idPet",
  as: "pet",
});
db.petModel.hasMany(db.citaModel, {
  foreignKey: "idPet",
  as: "citas",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("🟢 Conexión a la base de datos establecida con éxito.");
  } catch (error) {
    console.error("🔴 No se pudo conectar a la base de datos:", error);
  }
};

export default db;
