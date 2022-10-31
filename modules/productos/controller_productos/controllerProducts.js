import ProductsService from "../service_productos/serviceProductos.js";
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";

const controller = new ProductsService()


export default class ProductController {

    async readProducts(req, res) {
        const id = req.params.id
        let url = "productos"
        if (id) url = "productById"
        try {
            let hayProductos = true
            const productos = await controller.readProducts(id)
            if (productos.length < 1) hayProductos = false
            res.render(url, { productos, Titulo: "disponible", hayProductos })
        } catch (error) {
            winstonLogger.error(error.message, "readProducts controller")
        }
    }
    async readByCategory(req, res) {
        const categoria = req.params.categoria
        try {
            let hayProductos = true
            const productos = await controller.readByCategory(categoria)
            if (productos.length < 1) hayProductos = false
            res.render("productos", { productos, titulo: categoria, hayProductos })
        } catch (error) {
            winstonLogger.error(error.message, "readByCategory controller")
        }
    }

}
