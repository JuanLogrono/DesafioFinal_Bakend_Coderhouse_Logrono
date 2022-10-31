import { extraerUsername } from "../../../utils/extraerInfoToken.js"
import ChatService from "../service_chat/serviceChat.js"



const ControllerChat = new ChatService()
export default class ChatController {

    renderChatPage(req, res) {
        const token = req.signedCookies.jwt
        const tokenData = extraerUsername(token)
        const username = tokenData.sub
        res.render('chat', { username })
    }

    async renderUserChatPage(req, res) {
        const username = req.params.username
        const mensajes = await ControllerChat.readMessages(username)
        let hayMensajes = false
        if (mensajes) hayMensajes=true
            res.render('userChat.hbs', { username, mensajes,hayMensajes })
    }
}