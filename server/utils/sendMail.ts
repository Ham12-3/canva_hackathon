import nodemailer, { Transporter } from "nodemailer";
import path from "path";
require("dotenv").config();

interface EmailOptions {
  email: string;
  subject: string;
  html: string; // Accept rendered HTML directly
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    service: process.env.SMTP_SERVICE,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, html } = options;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    html, // Use the provided HTML directly
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
