import PersistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import { conexion, order } from '../../../configuraciones/mongo_config/mongoConfig.js'
import { OrdenProductsDto, OrderDto } from "../Dto_orden/dtoOrden.js";
import TransformarEnArrayDeDTO from "../../../utils/transormar_en_array_DTOs.js";

export default class OrdersDaoMongo {
    constructor() {
        this.dao = new PersistenciaMongoDb(conexion, order)
    }


    async finishOrder(orden) {
        try {
            const items = new OrdenProductsDto(orden.items)
            const newOrden = new OrdenProductsDto(order, items)
            await this.dao.addObject(newOrden)
            return "orden generada"
        } catch (error) {
            console.log(error, "finishOrder OrderDaoMongo")
        }
    }

    async readOrderByNumber(numberOrder) {
        try {
            const order = await this.dao.readObjects({ orden_numero: numberOrder })
            const items = TransformarEnArrayDeDTO(order.items, OrdenProductsDto)
            const orderDto = new OrderDto(order, items)
            return orderDto
        } catch (error) {
            console.log(error, "readOrderByNumber dao")
        }
    }
    async readOrdersByUsername(username) {
        try {
            const orders = await this.dao.readObjects({ username })
            if (orders.length === 0) return null
            const ordersDto = []
            orders.map(o => {
                let item = TransformarEnArrayDeDTO(o.items, OrdenProductsDto)
                let orderADto = new OrderDto(o, item)
                ordersDto.push(orderADto)
            })
            return ordersDto
        } catch (error) {
            console.log(error, "readOrderByUsername OrderDaoMongo")
        }
    }
} 