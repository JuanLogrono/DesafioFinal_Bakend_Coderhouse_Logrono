import { extraerUsername } from "../../../utils/extraerInfoToken.js";
import CarritoService from "../service_carrito/serviceCarrito.js";

const controllerCart = new CarritoService()


export default class CarritoController {

    async addProductsOrCreateCart(req, res) {
        const product = req.body
        const token = req.cookie.jwt
        const username = extraerUsername(token)
        try {
            await controllerCart.addProductOrCreateCart(username, product)
            res.redirect("/api/productos")
        } catch (error) {
            console.log(error, "addProductOrCreateCart controller")
        }
    }

    async readCartById(req, res) {
        const token = req.cookie.jwt
        const username = extraerUsername(token)
        try {
            const cart=await controllerCart.readCartById(username)
            res.render('carrito',{cart})
        } catch (error) {
            console.log(error, "readCartById controller")
        }
    }
}