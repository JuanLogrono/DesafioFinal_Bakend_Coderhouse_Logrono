import ProductsDaoMongo from "../Dao_Productos/daoProductosMongo.js";
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";


export default class ProductsService {
    constructor() {
        this.service = new ProductsDaoMongo()
    }

    async readProducts(id) {
        try {
            const productos = await this.service.readProducts(id)

            return (productos.length>1) ? productos : productos[0]
        } catch (error) {
            winstonLogger.error(error.message, "readProducts service")
        }
    }
    async readByCategory(category) {
        try {
            const productos = await this.service.readByCategory(category)
            return productos
        } catch (error) {
            winstonLogger.error(error.message, "readByCategory service")
        }
    }
    async addProduct(product) {
        try {
            return await this.service.addProducts(product)

        } catch (error) {
            winstonLogger.error(error.message, "addProduct service")
        }
    }
    async deleteProduct(id) {
        try {
            const valid = await this.service.readProducts(id)
            if (!valid) return "producto inexistente"
            await this.service.deleteProduct(id)
            return "Producto eliminado con éxito"
        } catch (error) {
            winstonLogger.error(error.message, "deleteProduct service")
        }    
    }
    async updateProduct(id,bodyToChange){
        try {
            const valid = await this.service.readProducts(id)
            if (!valid) return "producto inexistente"
            await this.service.updateProduct(id,bodyToChange)
            return 
        } catch (error) {
            winstonLogger.error(error.message,"updateProduct service")
        }
    }
}