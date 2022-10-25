import CarritoDaoMongo from "../Dao_carrito_mongo/DaoCarritoMongo.js";
import UserDaoMongo from "../../usuarios(login-registro)/Dao_User_mongo/daoUserMongo.js";

export default class CarritoService {
    constructor() {
        this.service = new CarritoDaoMongo()
    }

    async addProductOrCreateCart(username, product) {
        try {
            const cartVerify = await this.service.readCartById(username)
            if (!cartVerify) {
                const userData =await new UserDaoMongo().readUser(username)
                const timestamp= new Date()
                const user= {userData,timestamp}
                return await this.service.addNewCart(user, product)
            }
            else {
                const productExist = cartVerify.items.filter((prod) => prod.id === product.id)
                if (!productExist) return await this.service.addProductsToCart(username, product)
                else {
                    const newQty = Number(productExist.cantidad) + Number(product.cantidad)
                    return await this.service.modifyProductQuantity(username, product.id, newQty)
                }
            }
        } catch (error) {
            console.log(error, "addProductOrCreateCart service")
        }
    }

    async readCartById(username) {
        try {
            const cart = await this.service.readCartById(username)
            if (!cart) return "carrito inexistente"
            return cart
        } catch (error) {
            console.log(error, "readCartById service")
        }
    }
}