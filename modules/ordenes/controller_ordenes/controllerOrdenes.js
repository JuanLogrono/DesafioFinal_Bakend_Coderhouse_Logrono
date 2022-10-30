import { extraerUsername } from "../../../utils/extraerInfoToken.js";
import OrdersService from "../service_order/serviceOrder.js";

const controllerOrder = new OrdersService()

export default class OrderController {

    async finishOrder(req, res) {
        const token = req.signedCookies.jwt
        const tokenData = extraerUsername(token)
        const username = tokenData.sub
        try {
            const order = await controllerOrder.finishOrder(username)
            res.render('orden', { order })
        } catch (error) {
            console.log(error, "finishOrder controller")
        }
    }

    async readOrderByNumber(req, res) {
        const token = req.signedCookies.jwt
        const tokenData = extraerUsername(token)
        const numberOrder = Number(req.query.orden_numero)
        try {
            let existe = false
            const order = await controllerOrder.readOrderByNumber(tokenData.sub, numberOrder)
            if (order !==null) {
                existe = true;
                const { total } = order
                res.render('orden', { order, total, existe })
            }
            else res.render('orden',{existe})
        } catch (error) {
            console.log(error, "readOrderByNumber controller")
        }
    }

    async readOrderByUsername(req, res) {
        const token = req.signedCookies.jwt
        const tokenData = extraerUsername(token)
        const username = tokenData.sub
        try {
            let hayOrdenes = true
            const orders = await controllerOrder.readOrderByUsername(username)
            const ordenesQty = orders.length
            if (ordenesQty < 1) hayOrdenes = false
            res.render('ordenes', { ordenesQty, username, orders, hayOrdenes })
        } catch (error) {
            console.log(error, "readOrderByUsername controller")
        }
    }

    findByNumber(_, res) {
        res.render('ordenPorNumero')
    }
}