import UserDaoMongo from "../Dao_User_mongo/daoUserMongo.js";
import winstonLogger from "../../../configuraciones/winston_config/winstonConfig.js";
import { mailRegistro } from "../../../utils/mails.js";


export default class UserService {
    constructor() {
        this.service = new UserDaoMongo()
    }
    // completa el usuario guardado en registro con nombre, teléfono ,dirección
    async completeUser(username, bodyToComplete) {
        try {
            await this.service.updateUser(username, bodyToComplete)
            return await this.sendMail(username)
        } catch (error) {
            winstonLogger.error(error, "UserService-CompleteUser")
        }
    }
async crearPayloadToken(us){
try {
    const user =await this.service.readUser(us)
    const {username, autorizacion}=user[0]
    const payload={sub:username, user:autorizacion}
    return payload
} catch (error) {
    winstonLogger.error(error.message,'crearPayloadToken UserService')
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