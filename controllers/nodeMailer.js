import nodemailer from "nodemailer";
import "dotenv/config";

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
        <div><b>Nombre:</b> ${inputForm1}</div>
        <div><b>Email:</b> ${inputForm2}</div>
        <div><b>Telefono:</b> ${inputForm4}</div>
        <div><b>Mensaje:</b> ${inputForm5}</div>
      `,
    });

    res.status(200).json({ ok: true, msg: "Mensaje enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al enviar el mensaje" });
  }
};

export default sendEmail;
