import calcularPrecioTotal from "../../../utils/calcularTotal.js";
import { extraerUsername } from "../../../utils/extraerInfoToken.js";
import CarritoService from "../service_carrito/serviceCarrito.js";

const controllerCart = new CarritoService()


export default class CarritoController {

    async addProductsOrCreateCart(req, res) {
        const cantidad = req.body
        const token = req.signedCookies.jwt
        const id = req.params.idProduct
        const producto = { ...cantidad, id }
        const tokenData = extraerUsername(token)
        try {
            await controllerCart.addProductOrCreateCart(tokenData.sub, producto)
            res.redirect('/api/productos')
        } catch (error) {
            console.log(error, "addProductOrCreateCart controller")
        }
    }

    async readCartById(req, res) {
        const token = req.signedCookies.jwt
        const tokenData = extraerUsername(token)
        try {
            let hayCarrito = false
            let total=0
            const cart = await controllerCart.readCartById(tokenData.sub)
            if (cart) {
                hayCarrito = true
                total = calcularPrecioTotal(cart.items)
            }
                res.render('carrito', { cart, total,hayCarrito })
        } catch (error) {
            console.log(error, "readCartById controller")
        }
    }
}