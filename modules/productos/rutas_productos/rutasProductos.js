import { Router } from "express";
import ProductController from "../controller_productos/controllerProducts.js";
import { authJWT } from "../../../middlewares/jwtAuth.js";


export const routerProductos=Router()

const ProductRouter= new ProductController()

routerProductos.use(authJWT) 

routerProductos.get("/:id?",ProductRouter.readProducts)

routerProductos.get("/:categoria?",ProductRouter.readByCategory)
