import { Router } from "express";
import { ControllerAdmin } from "../controllers_admin/controllerAdmin.js";
import { isAdmin } from "../../../middlewares/isAdmin.js";
import { authJWT } from "../../../middlewares/jwtAuth.js";

const adminRuta= new ControllerAdmin()
export const routerAdmin = Router()
routerAdmin.use(authJWT)
routerAdmin.use(isAdmin)

routerAdmin.get("/productos/:id?",adminRuta.adminProductsView)

routerAdmin.post("/productos",adminRuta.addProduct)

routerAdmin.put("/productos/:id",adminRuta.updateProduct)

routerAdmin.delete("/productos/:id",adminRuta.deleteProduct)

routerAdmin.get("/users",)

routerAdmin.put("/users/:username")

routerAdmin.delete("/users/:username")