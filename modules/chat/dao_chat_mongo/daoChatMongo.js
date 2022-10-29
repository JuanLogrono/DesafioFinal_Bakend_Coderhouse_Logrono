import PersistenciaMongoDb from "../../persistencia/Persistencia_MongoDB/persistenciaMongoDb.js";
import { chat, conexion } from '../../../configuraciones/mongo_config/mongoConfig.js'
import { ChatDto } from "../dto_mensajes/dtoMensajes.js";
import TransformarEnArrayDeDTO from "../../../utils/transormar_en_array_DTOs.js";



export default class ChatDaoMongo {
    constructor() {
        this.dao = new PersistenciaMongoDb(conexion, chat)
    }
    async addMessages(mensaje) {
        try {
            const mensajeDto = new ChatDto(mensaje)
            await this.dao.addObject(mensajeDto)
            const mensajes = await this.dao.readObjects({})
            return mensajes

        } catch (error) {
            console.log(error, "addMessages ChatDaoMongo")
        }
    }

    async readMessages() {
        try {
            const mensajes = await this.dao.readObjects({})
            const mensajesDto = TransformarEnArrayDeDTO(mensajes, ChatDto)
            return mensajesDto
        } catch (error) {
            console.log(error, "readMessages ChatDaoMessages")
        }
    }

    async messagesByUsername(username) {
        try {
            const mensajes = await this.dao.readObjects({ username })
            const mensajesDto = TransformarEnArrayDeDTO(mensajes, ChatDto)
            return mensajesDto

        } catch (error) {
            console.log(error, "messagesByUsername ChatDaoMongo")
        }
    }
}