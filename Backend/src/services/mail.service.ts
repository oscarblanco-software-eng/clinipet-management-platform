// src/services/mail.service.ts
import transporter from '../config/mailer';

export const sendResetPasswordEmail = async (to: string, resetUrl: string) => {
  await transporter.sendMail({
    from: "no-reply@clinipet.com",
    to,
    subject: "Recuperación de contraseña",
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  });
};
