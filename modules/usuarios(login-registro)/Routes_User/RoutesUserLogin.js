import { Router } from "express";
import UserController from "../Controller_User/controllerUser.js";
import passport from "../Service_User/passport_Service/passport.js"


const userRoutesLogin= new UserController()
export const routerLogin = Router()

routerLogin.get('/', userRoutesLogin.loginView)

routerLogin.post('/',passport.authenticate("auth",{session:false, failureRedirect:"api/login/error"}), userRoutesLogin.loginIngreso)

routerLogin.get("/error",userRoutesLogin.errorView)

routerLogin.get('/logout',userRoutesLogin.exitSession)