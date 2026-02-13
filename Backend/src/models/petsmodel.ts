// // src/models/petsmodel.ts
// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/db";

import { DataTypes, Sequelize } from "sequelize";

// const PetModel = sequelize.define("pets", {
//   name: { type: DataTypes.STRING },
//   species: { type: DataTypes.STRING },
//   breed: { type: DataTypes.STRING },
//   sex: { type: DataTypes.STRING },
//   age: { type: DataTypes.INTEGER },
//   owner: { type: DataTypes.STRING },
//   phone: { type: DataTypes.STRING },
// });

// export default PetModel;

export default (sequelize: Sequelize) => {
  const PetModel = sequelize.define(
    "Pets",
    {
      name: { type: DataTypes.STRING },
      species: { type: DataTypes.STRING },
      breed: { type: DataTypes.STRING },
      sex: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      owner: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
    },
    {
      tableName: "pets", // nombre exacto de la tabla en la base de datos
      timestamps: false, // si no necesitas createdAt y updatedAt
    }
  );

  return PetModel;
};
