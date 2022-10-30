import { extraerUsername } from "../utils/extraerInfoToken.js";


export const isAdmin = (req, res, next) => {
    const token = req.signedCookies.jwt
    const data = extraerUsername(token)
    let permiso= data.user
    if(permiso === "admin")  next()
    else res.send("el usuario no tiene permiso para esta ruta")
}