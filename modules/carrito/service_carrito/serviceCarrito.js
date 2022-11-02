import CarritoDaoMongo from "../Dao_carrito_mongo/DaoCarritoMongo.js";
import UserDaoMongo from "../../usuarios(login-registro)/Dao_User_mongo/daoUserMongo.js";
import ProductsDaoMongo from "../../productos/Dao_Productos/daoProductosMongo.js";


export default class CarritoService {
    constructor() {
        this.service = new CarritoDaoMongo()
    }

    async addProductOrCreateCart(userName, product) {
        try {
            const cartVerify = await this.service.readCartById(userName)
            const productoComplete = await new ProductsDaoMongo().readProducts(product.id)
            const { nombre, precio, id, stock } = productoComplete[0]
            const cantidad = Number(product.cantidad)
            const producto = { id, nombre, precio, cantidad, stock }

            if (!cartVerify) {
                const userData = await new UserDaoMongo().readUser(userName)
                const timestamp = new Date()
                const { username, direccion } = userData[0]
                const user = { direccion, username, timestamp }
                return await this.service.addNewCart(user, producto)
            }
            else {
                const productExist = cartVerify.items.filter((prod) => prod.id.valueOf() === product.id)
                if (!productExist[0]) return await this.service.addProductsToCart(userName, producto)
                else {
                    const newQty = Number(productExist[0].cantidad) + Number(product.cantidad)
                    return await this.service.modifyProductQuantity(userName, productExist[0].id, newQty)
                }
            }
        } catch (error) {
            console.log(error, "addProductOrCreateCart service")
        }
    }

    async readCartById(username) {
        try {
            const cart = await this.service.readCartById(username)
            if (!cart) return null

            for (let i = 0; i < cart.items.length; i++) {
                let sub = cart.items[i].cantidad * cart.items[i].precio;
                cart.items[i] = { ...cart.items[i], sub }
            }
            return cart
        } catch (error) {
            console.log(error, "readCartById service")
        }
    }

    async sendChanges(username, body) {
        try {
            if (body.direccion) return await this.service.updateCart(username, body)
            if (body.cantidad > 0){
                const producto = await new ProductsDaoMongo().readProducts(body.id)
                if (producto[0].stock< body.cantidad) return "la cantidad exede al stock disponible" 
            await  this.service.modifyProductQuantity(username,producto[0].id,body.cantidad)}
        } catch (error) {
            console.log(error, "sendChanges serviceCarrito")
        }
    }
}