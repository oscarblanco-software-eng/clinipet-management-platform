// // src/models/user.model.ts
// import { DataTypes, Model } from 'sequelize';
// import { sequelize } from '../config/db';

import { DataTypes, Sequelize } from "sequelize";

// // Agrega export delante de interface
// export interface UserAttributes {
//   id?: number;
//   email: string;
//   password: string;
//   resetToken?: string | null;
//   tokenExpires?: Date | null;
//   role?: 'user' | 'admin';
// }

// export class User extends Model<UserAttributes> implements UserAttributes {
//   public id!: number;
//   public email!: string;
//   public password!: string;
//   public resetToken?: string | null;
//   public tokenExpires?: Date | null;
//   public role?: 'user' | 'admin';
// }

// User.init(
//   {
//     id: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     resetToken: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     tokenExpires: {
//       type: DataTypes.DATE,
//       allowNull: true,
//     },
//     role: {
//       type: DataTypes.ENUM('user', 'admin'),
//       allowNull: false,
//       defaultValue: 'user',
//     },
//   },
//   {
//     sequelize,
//     modelName: 'User',
//     tableName: 'users',
//     timestamps: true,
//   }

// );

export default (sequelize: Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
};
