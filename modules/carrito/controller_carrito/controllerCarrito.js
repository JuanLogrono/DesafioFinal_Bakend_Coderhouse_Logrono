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
            let total = 0
            const cart = await controllerCart.readCartById(tokenData.sub)
            if (cart) {
                hayCarrito = true
                total = calcularPrecioTotal(cart.items)
            }
            res.render('carrito', { cart, total, hayCarrito })
        } catch (error) {
            console.log(error, "readCartById controller")
        }
    }
    async cartModify(req, res) {
        const username = req.params.username
        try {
            const cart = await controllerCart.readCartById(username)
            res.render('modificarCarrito', { cart })
        } catch (error) {
            console.log(error, "cartModify cartController")
        }
    }

    async sendChanges(req, res) {
        const username = req.params.username
        const body = req.body
        try {
            await controllerCart.sendChanges(username, body)
            res.sendStatus(201)
        } catch (error) {
            console.log(error, "sendChanges controllerCart")
        }
    }
    async deleteProductInCart(req, res){
        const username= req.params.username
        const id = req.body
        try {
            await controllerCart.deleteProductInCart(username,id)
            res.sendStatus(201)
        } catch (error) {
            console.log(error,"deleteProductInCart controllerCarrito")
        }
    }

    async deleteCart(req,res){
        const username=req.params.username
        try {
            await controllerCart.deleteCart(username)
            res.sendStatus(201)
        } catch (error) {
            console.log(error,"deleteCart controllerCart")
        }

    }
}