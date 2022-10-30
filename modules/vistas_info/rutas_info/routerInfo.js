import { Router } from "express";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import { serverInfo } from "../controller_info/controllerInfo.js";

export const routerInfo= Router()

routerInfo.use(isAdmin)

routerInfo.get("/",serverInfo)
