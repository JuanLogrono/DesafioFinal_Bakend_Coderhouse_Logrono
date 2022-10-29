import express from 'express'
import { authJWT } from "../../../middlewares/jwtAuth.js";
import ChatController from "../controller_chat/controllerChat.js";


export const routerChat=express.Router()

const chatRouter=new ChatController()


routerChat.use(authJWT)

routerChat.get("/",chatRouter.renderChatPage)

routerChat.get("/username",chatRouter.renderUserChatPage)