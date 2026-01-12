import nodemailer from "nodemailer";
import { Router } from "express";
import "dotenv/config";

const router = Router();

const sendEmail = async (req, res) => {
  try {
    const { emailClient, inputForm1, inputForm2, inputForm4, inputForm5 } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Envio de emails <${process.env.EMAIL_USER}>`,
      to: emailClient,
      subject: inputForm4, 
      html: `
        <div style="display: flex; background-color: white; border-bottom: 1px solid rgb(199, 199, 199); width: 600px;">
          <p style="color:red; margin-right: 10px;">Nombre:</p><p>${inputForm1}</p>
        </div>
        <div style="display: flex; background-color: white; border-bottom: 1px solid rgb(199, 199, 199); width: 600px;">
          <p style="color:red; margin-right: 10px;">Email:</p><p>${inputForm2}</p>
        </div>
        <div style="display: flex; background-color: white; border-bottom: 1px solid rgb(199, 199, 199); width: 600px;">
          <p style="color:red; margin-right: 10px;">Asunto:</p><p>${inputForm4}</p>
        </div>
        <div style="background-color: white; border-bottom: 1px solid rgb(199, 199, 199); width: 600px; padding: 5px 0;">
          <p style="color:red; margin-bottom: 5px;">Mensaje:</p>
          <p>${inputForm5}</p>
        </div>
      `,
    });

    res.status(201).json({ ok: true, msg: "Mensaje enviado exitosamente" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ ok: false, msg: "Error al enviar el mensaje" });
  }
};

router.post("/", sendEmail);

export default router;
