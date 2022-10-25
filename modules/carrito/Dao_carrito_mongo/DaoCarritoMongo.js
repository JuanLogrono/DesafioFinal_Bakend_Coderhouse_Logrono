import PersistenciaMongoDb from '../../../modules/persistencia/Persistencia_MongoDB/persistenciaMongoDb.js'
import { conexion, cart } from '../../../configuraciones/mongo_config/mongoConfig.js'
import { CarritoDto, CarritoProductsDto } from '../Dto_carrito/dtoCarrito.js'



export default class CarritoDaoMongo {
    constructor() {
        this.dao = new PersistenciaMongoDb(conexion, cart)
    }

    async addNewCart(user, item) {
        try {
            const DtoItem = new CarritoProductsDto(item)
            const newCart = new CarritoDto(user, DtoItem)
            return await this.dao.addObject(newCart)

        } catch (error) {
            console.log(error, "addNewCart dao")
        }
    }
    async addProductsToCart(username, product) {
        try {
            await this.dao.addInArray({ username }, { items: { $each: [product] } })
            return "producto agregado con éxito"
        } catch (error) {
            console.log(error, "addProductTocart dao")
        }
    }

    async modifyProductQuantity(username, productId, newQty) {
        try {
            await this.dao.upgradeObject({ username, "items.id": productId }, { "items.$.cantidad": newQty })
            return "cantidad agregada con éxito"
        } catch (error) {
            console.log(error, "modifyProductQuantity dao")
        }
    }

    async readCartById(username) {
        try {
            const cart = await this.dao.readObjects({ username })
            cart.item = cart.item.map((e) => CarritoProductsDto(e))
            const cartDto= new CarritoDto(cart,cart.items)
            return cartDto
        } catch (error) {
            console.log(error, "readCartById dao")
        }
    }
}