import PersistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import { conexion, products } from '../../../configuraciones/mongo_config/mongoConfig.js'
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";
import DtoProductos from "../DTO_productos/DtoProductos.js";


export default class ProductsDaoMongo {
    constructor() {
        this.dao = new PersistenciaMongoDb(conexion, products)
    }

    async readProducts(idParam) {
        try {
            let id = {}
            if (idParam) id = { _id: idParam }
            const productosMongo = await this.dao.readObjects(id)
            const productos=productosMongo.map(p=>new DtoProductos(p))
            return productos
        } catch (error) {
            //winstonLogger.error(error.message, "ReadProducts Dao")
        }
    }
    async readByCategory(category){
        try {
            const productosMongo=await this.dao.readObjects({categoria:category})
            const productos=productosMongo.map(p=>new DtoProductos(p))
            return productos
        } catch (error) {
            winstonLogger.error(error.message,"ReadByCategory dao")
        }
    }

    async addProducts(product) {
        try {
            await this.dao.addObject(product)
            return "producto agregado con éxito"
        } catch (error) {
            winstonLogger.error(error.message, "addProducts Dao")
        }
    }

    async deleteProduct(id) {
        try {
            await this.dao.deleteObject({ _id: id })
        } catch (error) {
            winstonLogger.error(error.message, "deleteProducts Dao")
        }
    }
    async upgradeProduct(id, bodyToChange){
        try {
            await this.dao.upgradeObject({_id:id},bodyToChange)
            return "producto modificado con éxito"
        } catch (error) {
            winstonLogger.error(error.message,"upgradeProduct dao")
        }

    }
}