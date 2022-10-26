import { Router } from "express";
import OrderController from "../controller_ordenes/controllerOrdenes.js";
import { authJWT } from '../../../middlewares/jwtAuth.js'

export const routerOrdenes = Router()
routerOrdenes.use(authJWT)

const orderRoutes= new OrderController()

orderRoutes.post('/',orderRoutes.finishOrder)

orderRoutes.get('/order_number',orderRoutes.readOrderByNumber)

orderRoutes.get('/username',orderRoutes.readOrderByUsername)