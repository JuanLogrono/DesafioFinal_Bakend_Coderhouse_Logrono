import { Router } from "express";
import UserController from "../Controller_User/controllerUser.js";
import passport from "../Service_User/passport_Service/passport.js"

const userRoutesRegister= new UserController()
export const routerRegister= Router()

routerRegister.get("/",userRoutesRegister.registerView)

routerRegister.post("/",userRoutesRegister.passwordControl,passport.authenticate("registro",{session:false,failureRedirect:"/api/registro/error"}),userRoutesRegister.newRegister)

routerRegister.get("/error",userRoutesRegister.errorView)