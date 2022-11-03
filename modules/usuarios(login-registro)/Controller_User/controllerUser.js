import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";
import UserService from "../Service_User/serviceUser.js";
import jwt from 'jsonwebtoken'
import { config } from "dotenv";
config()

const jwtSign = jwt.sign
const userController = new UserService()
const secret = process.env.SECRET
const expire = process.env.EXPIRES_TOKEN


export default class UserController {

    //vistas
    loginView(_, res) {
        res.render("login", { titulo: "ingreso" })
    }
    registerView(_, res) {
        res.render("registro", { titulo: "registro" })
    }

    errorView(req, res) {
        res.render("error", { error:"credenciales invalidas", mensaje: "el usuario o la contraseña no son correctos intente nuevamente" })
    }
    //ingreso y registro
    async loginIngreso (req, res) {
        const { username } = req.body
        const payload = await userController.crearPayloadToken(username)
       
        const token = jwtSign(payload, secret, { expiresIn: expire })
        res
            .cookie("jwt", token, { httpOnly: true, secure: true, signed: true })
            .redirect("/api/productos")
    }
    async newRegister(req, res) {
        const { nombre, telefono, username, direccion } = req.body

        const bodyToAdd = { nombre, telefono, direccion, autorizacion : "user" }
        try {
            await userController.completeUser(username, bodyToAdd)
            res.redirect("/api/login")
        }
        catch (error) {
            winstonLogger.error(error, "ControllerUser-newRegister")
        }
    }

    passwordControl(req, res, next) {
        const { password, controlPass, username } = req.body
        if (username && password === controlPass) next()
        if (!username) res.render("error", { error: "falta email",mensaje: "ingrese email de usuario" })
        if (password !== controlPass) res.render("error", { error: "error en el password", mensaje: "las contraseñas no coinciden" })
    }

    exitSession(req, res) {
        res.clearCookie(jwt)
       res.redirect("/api/login")
    }
}