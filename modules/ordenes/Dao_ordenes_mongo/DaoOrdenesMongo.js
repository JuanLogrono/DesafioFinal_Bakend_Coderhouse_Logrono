import PersistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import { conexion, order } from '../../../configuraciones/mongo_config/mongoConfig.js'
import { OrdenProductsDto, OrderDto } from "../Dto_orden/dtoOrden.js";
import TransformarEnArrayDeDTO from "../../../utils/transormar_en_array_DTOs.js";

export default class OrdersDaoMongo {
    constructor() {
        this.dao = new PersistenciaMongoDb(conexion, order)
    }
    async readOrders() {
        try {
            const orders = await this.dao.readObjects({})
            const ordersDto=this.ordersReadToDto(orders)
            return ordersDto
        } catch (error) {
            console.log(error, "readOrders OrdersDaoMongo")
        }
    }

    async finishOrder(orden) {
        try {
            const items = []
            orden.items.map((o) => items.push(new OrdenProductsDto(o)))
            const newOrden = new OrderDto(orden, items)
            await this.dao.addObject(newOrden)
            return "orden generada"
        } catch (error) {
            console.log(error, "finishOrder OrderDaoMongo")
        }
    }

    async readOrderByNumber(orden_numero) {
        try {
            const order = await this.dao.readObjects({orden_numero})
            const items = []
            order[0].items.map((p)=>items.push( new OrdenProductsDto(p)))
            const orderDto = new OrderDto(order[0], items)
            return orderDto
        } catch (error) {
            console.log(error, "readOrderByNumber dao")
        }
    }
    async readOrdersByUsername(username) {
        try {
            const orders = await this.dao.readObjects({ username })
            const ordersDto = this.ordersReadToDto(orders)
            return ordersDto
        } catch (error) {
            console.log(error, "readOrderByUsername OrderDaoMongo")
        }
    }

    ordersReadToDto(orders) {
        if (orders.length === 0) return null
        const ordersDto = []
        orders.map(o => {
            let item = TransformarEnArrayDeDTO(o.items, OrdenProductsDto)
            let orderADto = new OrderDto(o, item)
            ordersDto.push(orderADto)
        })
        return ordersDto
    }
} 