import crearNumeroDeOrden from "../../../utils/crearNumeroDeOrden.js";
import CarritoDaoMongo from "../../carrito/Dao_carrito_mongo/DaoCarritoMongo.js";
import OrdersDaoMongo from "../Dao_ordenes_mongo/DaoOrdenesMongo.js";

export default class OrdersService {
    constructor() {
        this.service = new OrdersDaoMongo()
        this.carritoDao = new CarritoDaoMongo()
    }

    async finishOrder(username) {
        try {
            const orders = await this.service.readOrdersByUsername("")
            const orderNumber = crearNumeroDeOrden(orders)
            const cart = await this.carritoDao.readCartById(username)
            const total = cart.items.reduce((a, b) => a.sub + b.sub)
            const newOrder = { ...cart[0], Orden_numero: orderNumber,total}
            await this.service.finishOrder(newOrder)
            await this.carritoDao.deleteCart(username)
            return newOrder
        } catch (error) {
            console.log(error, "FinishOrder service")
        }
    }

    async readOrderByNumber(username,ordenNumero) {
        try {
            const order = await this.service.readOrderByNumber(ordenNumero)
            if (!order || order.username !== username) return "no existe este numero de orden"
            return order
        } catch (error) {
            console.log(error, "readOrderByNumber service")
        }
    }

    async readOrderByUsername(username){
        try {
            const orders = this.service.readOrdersByUsername(username)
            return orders
        } catch (error) {
            console.log(error,"readOrderByUsername service")
        }
    }
}   