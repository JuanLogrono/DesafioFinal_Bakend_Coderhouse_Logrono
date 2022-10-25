import persistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import { conexion, user } from "../../../configuraciones/mongo_config/mongoConfig.js";
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";


export default class UserDaoMongo {
    constructor() {
        this.dao = new persistenciaMongoDb(conexion, user)
    }
    async addUser(user) {
        try {
            await this.dao.addObject(user)
        } catch (error) {
            winstonLogger.error(error, "UserDaoMongo-addUser")
        }
    }

    async readUser(username) {
        try {
            return await this.dao.readObjects({username})
        } catch (error) {
            winstonLogger.error(error, "UserDaoMongo-readUser")
        }
    }
    async upgradeUser(username, bodyToAdd) {
        try {
            return await this.dao.upgradeObject({username},bodyToAdd)

        } catch (error) {
            winstonLogger.error(error, "UserDaoMongo-UpgradeUser")
        }
    }
}