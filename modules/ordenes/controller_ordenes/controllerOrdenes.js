import { extraerUsername } from "../../../utils/extraerInfoToken.js";
import OrdersService from "../service_order/serviceOrder.js";

const controllerOrder = new OrdersService()

export default class OrderController {

    async finishOrder(req, res) {
        const token = req.signedCookies.jwt
        const username = extraerUsername(token)
        try {
            const order = await controllerOrder.finishOrder(username)
            res.render('orden', { order})
        } catch (error) {
            console.log(error, "finishOrder controller")
        }
    }

    async readOrderByNumber(req,res){
        const token = req.signedCookies.jwt
        const username = extraerUsername(token)
        const numberOrder= req.body.orden_numero
        try {
            const order = controllerOrder.readOrderByNumber(username,numberOrder)
            res.render('orden',{order})
        } catch (error) {
            console.log(error,"readOrderByNumber controller")
        }
    }

    async readOrderByUsername(req,res){
        const token = req.signedCookies.jwt
        const username = extraerUsername(token)
        try {
            const orders = await controllerOrder.readOrderByUsername(username)
            res.render('ordenes',{orders})
        } catch (error) {
            console.log(error,"readOrderByUsername controller")
        }
    }
}