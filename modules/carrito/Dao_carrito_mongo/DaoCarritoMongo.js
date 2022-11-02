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
            await this.dao.updateObject({ username, "items.id": productId},{"items.$.cantidad": newQty })
            return "cantidad agregada con éxito"
        } catch (error) {
            console.log(error, "modifyProductQuantity dao")
        }
    }

    async readCartById(username) {
        try {
            const cartArray = await this.dao.readObjects({ username })
            const cart=cartArray[0]
            if(!cart) return cart
            const items=[]
            cart.items.forEach((p)=>{let i = new CarritoProductsDto(p)
            items.push(i)
            })
            const cartDto= new CarritoDto(cart,items)
            return cartDto
        } catch (error) {
            console.log(error, "readCartById dao")
        }
    }

    async updateCart(username, body){
        try {
            await this.dao.updateObject({username},body)
        } catch (error) {
            console.log(error,"updateCart dao")
        }
    }
    //también llamado desde OrderService al finalizar la orden
    async deleteCart(username){
        try {
            await this.dao.deleteObject({username})
        } catch (error) {
            console.log(error,"deleteCart daoCarrito")
        }
    }
}