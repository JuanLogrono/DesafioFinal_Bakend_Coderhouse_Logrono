import UserDaoMongo from "../Dao_User_mongo/daoUserMongo.js";
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";
import { mailRegistro } from "../../../utils/mails.js";


export default class UserService {
    constructor() {
        this.service = new UserDaoMongo()
    }
    // completa el usuario guardado en registro con nombre, teléfono  
    async completeUser(username, bodyToComplete) {
        try {
            await this.service.upgradeUser(username, bodyToComplete)
            return await this.sendMail(username)
        } catch (error) {
            winstonLogger.error(error, "UserService-CompleteUser")
        }
    }
    async sendMail(username) {
        try {
            const user= await this.service.readUser(username)
            return mailRegistro(user)
            
        } catch (error) {
            winstonLogger.error(error, "UserService-sendMail")
        }
    }
} 