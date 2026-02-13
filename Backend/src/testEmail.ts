// testEmail.ts
// src/testEmail.ts

import { transporter } from './utils/nodemailer'; // Asegúrate de que esta ruta sea correcta
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
  try {
    const testEmail = 'oscarblanco2013.ob@gmail.com'; // ← Cambia esto por tu correo real
    const token = 'TOKEN_DE_PRUEBA'; // ← Puedes usar un token generado de la DB

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: `"Clinipet" <${process.env.EMAIL_USER}>`,
      to: testEmail,
      subject: "Restablece tu contraseña",
      html: `
        <h2>Solicitud de restablecimiento de contraseña</h2>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Si no solicitaste esto, puedes ignorar este mensaje.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
};

main();
