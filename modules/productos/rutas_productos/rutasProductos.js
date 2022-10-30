import { Router } from "express";
import ProductController from "../controller_productos/controllerProducts.js";
import { authJWT } from "../../../middlewares/jwtAuth.js";
/* import passport from "../../usuarios(login-registro)/Service_User/passport_Service/passport.js" */

export const routerProductos=Router()

const ProductRouter= new ProductController()

routerProductos.use(authJWT) 

routerProductos.get("/:id?",ProductRouter.readProducts)

routerProductos.get("/:categoria?",ProductRouter.readByCategory)

routerProductos.post("/",ProductRouter.addProduct)

routerProductos.put("/:id",ProductRouter.upgradeProduct)

routerProductos.delete("/:id",ProductRouter.deleteProduct)