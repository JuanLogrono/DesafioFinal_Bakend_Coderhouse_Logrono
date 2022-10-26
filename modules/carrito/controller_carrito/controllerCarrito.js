import { extraerUsername } from "../../../utils/extraerInfoToken.js";
import CarritoService from "../service_carrito/serviceCarrito.js";

const controllerCart = new CarritoService()


export default class CarritoController {

    async addProductsOrCreateCart(req, res) {
        const cantidad = req.body
        const token = req.signedCookies.jwt
        const id=req.params.idProduct
        const producto={...cantidad,id}
        const username = extraerUsername(token)
         try {
            await controllerCart.addProductOrCreateCart(username,producto) 
            res.redirect('/api/productos')
         } catch (error) {
            console.log(error, "addProductOrCreateCart controller")
        } 
    }

    async readCartById(req, res) {
        const token = req.signedCookies.jwt
        const username = extraerUsername(token)
        try {
            const cart=await controllerCart.readCartById(username)
            const total=cart.items.reduce((a,b)=>a.sub+b.sub)
            res.render('carrito',{cart,total})
        } catch (error) {
            console.log(error, "readCartById controller")
        }
    }
}