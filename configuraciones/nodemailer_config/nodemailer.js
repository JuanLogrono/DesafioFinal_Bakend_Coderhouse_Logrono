import nodemailer from "nodemailer";
import winstonLogger from "../winston_config/winstonConfig.js";

//ingresar usuario y contraseña
const mailAdmin = {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL
}

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: mailAdmin,
    tls: {
        rejectUnauthorized: false
    }
});

export const enviarMail = async (username, asunto, datos) => {
    try {
        const info = await transporter.sendMail({
            from: mailAdmin.user,
            to: username || mailAdmin.user,
            subject: asunto,
            html: datos,

        })
        winstonLogger.info(info)
    }
    catch (error) {
        winstonLogger.error(error)
    }
}

