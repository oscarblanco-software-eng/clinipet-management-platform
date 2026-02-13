import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { sequelize } from "../src/config/db";
import defineUser from "../src/models/user.model";

dotenv.config();
const User = defineUser(sequelize);

async function createAdminUser() {
  try {
    await sequelize.sync();

    const email = "admin25@clinipet.com";
    const plainPassword = "admin25";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const [admin, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        email,
        password: hashedPassword,
        role: "admin",
      },
    });

    if (created) {
      console.log("✅ Usuario admin creado:", admin.get("email"));
    } else {
      console.log("⚠️ Ya existe un usuario admin con ese correo.");
    }

    await sequelize.close();
  } catch (error) {
    console.error("❌ Error al crear el admin:", error);
    await sequelize.close();
  }
}

createAdminUser();
