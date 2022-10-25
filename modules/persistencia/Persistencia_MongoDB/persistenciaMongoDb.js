import mongoose from "mongoose"
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js"


class PersistenciaMongoDb {
    constructor(conexion, modelo) {
        this.connection = conexion
        this.modelo = modelo
    }

    dbConnection() {
        mongoose.connect(this.connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    async addObject(object) {
        try {
            this.dbConnection()
            const newObject = this.modelo(object)
            await newObject.save()
            return "guardado con éxito"
        } catch (error) {
            winstonLogger.error(error, "persistencia mongoDb addObject")
        }
    }
    async readObjects(object) {
        try {
            this.dbConnection()
            const readObjects = this.modelo.find(object)
            return readObjects
        } catch (error) {
            winstonLogger.error(error, "persistencia mongoDb readObject")
        }
    }
    async upgradeObject(param, objectChange) {
        try {
            this.dbConnection()
            await this.modelo.updateOne(param, { $set: objectChange })
            return "modificado con éxito"
        } catch (error) {
            winstonLogger.error(error, "persistencia mongoDb upgradeObject")
        }
    }
    async deleteObject(param) {
        try {
            this.dbConnection()
            await this.modelo.deleteOne(param)
            return "eliminado con éxito"
        } catch (error) {
            winstonLogger.error(error, "persistencia mongoDb deleteObject")
        }
    }
    /**
     * 
     * @param {parametroFiltro} param 
     * @param {{key:{$each:ArrayConObjeto}}} abjWithArray 
     */
    async addInArray(param, objWithArray) {
        try {
            this.dbConnection()
            await this.modelo.update(param, { $push: objWithArray })
        } catch (error) {
            console.log(error, "addInArray persistencia")
        }
    }
}

export default PersistenciaMongoDb