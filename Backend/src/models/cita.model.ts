import { DataTypes, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  const citaModel = sequelize.define(
    "cita",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      idVeterinary: {
        type: DataTypes.INTEGER,
        allowNull: true, // Lo hacemos opcional
      },
      idPet: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true, // No obligatorio
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendiente", // Valor por defecto
      },
    },
    {
      tableName: "cita",
      timestamps: false,
    }
  );

  return citaModel;
};
