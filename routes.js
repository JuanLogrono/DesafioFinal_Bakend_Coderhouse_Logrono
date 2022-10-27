import { routerLogin } from "./modules/usuarios(login-registro)/Routes_User/RoutesUserLogin.js";
import { routerRegister } from "./modules/usuarios(login-registro)/Routes_User/RoutesUserRegister.js";
import { routerProductos } from "./modules/productos/rutas_productos/rutasProductos.js";
import { routerCarrito } from "./modules/carrito/rutas_carrito/rutasCarrito.js";
import { routerOrdenes } from './modules/ordenes/rutas_ordenes/rutasOrdenes.js'


export default {
    routerLogin,
    routerRegister,
    routerProductos,
    routerCarrito,
    routerOrdenes
}