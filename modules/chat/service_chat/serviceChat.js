import UserDaoMongo from "../../usuarios(login-registro)/Dao_User_mongo/daoUserMongo.js";
import ChatDaoMongo from "../dao_chat_mongo/daoChatMongo.js";


export default class ChatService {
    constructor() {
        this.service = new ChatDaoMongo()
        this.daoUser = new UserDaoMongo()
    }

    async addMessages(bodyMensaje) {
        try {
            const user = await this.daoUser.readUser(bodyMensaje.username)
            const msj = user[0]
            msj.mensaje = bodyMensaje.mensajes
            await this.service.addMessages(msj)
        } catch (error) {
            console.log(error, "addMessages service")
        }
    }
    async readMessages(username) {
        try {
            let mensajes = []
            if (!username) {
                mensajes = await this.service.readMessages()
            } else {
                const traerMensajes = await this.service.messagesByUsername(username)
                if (traerMensajes.length < 1) mensajes = "no hay mensajes para este usuario"
                mensajes = traerMensajes
            }
            return mensajes
        } catch (error) {
            console.log(error, "readMessages service")
        }

    }
}