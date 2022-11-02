import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";
import ProductsService from "../../productos/service_productos/serviceProductos.js";

const productAdminService = new ProductsService()


export class ControllerAdmin {
    async adminProductsView(req, res) {
        const id = req.params.id
        let url = "productosAdmin"
        if (id) url = "modificarProducto"
        try {
            let hayProductos = true
            const productos = await productAdminService.readProducts(id)
            if (productos.length < 1) hayProductos = false
            res.render(url, { productos, hayProductos, titulo: "admin" })
        }
        catch (error) {
            winstonLogger.error(error.message, "readProductsAdmin controller")
        }
    }


    async addProduct(req, res) {
        const product = req.body
        try {
            await productAdminService.addProduct(product)
            res.redirect('/api/admin/productos')
        } catch (error) {
            winstonLogger.error(error.message, "addProduct controller")
        }
    }

    async updateProduct(req, res) {
        const id = req.params.id
        const body = req.body
        try {
            await productAdminService.updateProduct(id, body)
            res.send(body)
        } catch (error) {
            winstonLogger.error(error.message, "updateProducts controller")
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.id
        try {
             await productAdminService.deleteProduct(id)
            res.send('/api/admin/productos')
        } catch (error) {
            winstonLogger.error(error.message, "deleteProducts")
        }
    }

}