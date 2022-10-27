import { Router } from "express";
import OrderController from "../controller_ordenes/controllerOrdenes.js";
import { authJWT } from '../../../middlewares/jwtAuth.js'

export const routerOrdenes = Router()
routerOrdenes.use(authJWT)

const orderRoutes= new OrderController()

routerOrdenes.post('/',orderRoutes.finishOrder)

routerOrdenes.get('/order_number',orderRoutes.readOrderByNumber)

routerOrdenes.get('/find_by_number',orderRoutes.findByNumber)

routerOrdenes.get('/username',orderRoutes.readOrderByUsername)