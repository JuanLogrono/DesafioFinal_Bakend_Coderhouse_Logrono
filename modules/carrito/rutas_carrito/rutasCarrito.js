import CarritoController from "../controller_carrito/controllerCarrito.js";
import {authJWT} from '../../../middlewares/jwtAuth.js'
import { Router } from "express";

const CarritoRouter=new CarritoController()
export const routerCarrito= Router()
routerCarrito.use(authJWT)

routerCarrito.post("/:idProduct",CarritoRouter.addProductsOrCreateCart)

routerCarrito.get("/",CarritoRouter.readCartById)

routerCarrito.get("/modificar/:username",CarritoRouter.cartModify)

routerCarrito.put("/modificar/:username",CarritoRouter.sendChanges)

