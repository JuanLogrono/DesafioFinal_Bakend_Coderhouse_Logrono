import {config} from 'dotenv'
import express from 'express'
import passport from './modules/usuarios(login-registro)/Service_User/passport_Service/passport.js'
import {jwtStrategy} from './modules/usuarios(login-registro)/Service_User/passport_Service/jwt.js'
import {hbsEngine} from './configuraciones/hbs_config/hbsConfig.js'
import routes from './routes.js'
import cookieParser from 'cookie-parser'
import { Server as HttpServer } from "http";
import { Server as IoServer } from "socket.io";
import { serverIo } from './modules/chat/controller_chat/socketIo_Chat.js'

config()

const app = express()
const httpServer = new HttpServer(app);
//express mid
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

//socket.io
const ioServer = new IoServer(httpServer);
serverIo(ioServer)
//passport
passport.use(jwtStrategy)
app.use(passport.initialize())
app.use(cookieParser(process.env.SECRET))

//hbs
app.engine("hbs", hbsEngine)
app.set("views","./public/views");
app.set("view engine", "hbs");

//rutas
app.use("/api/orden",routes.routerOrdenes)
app.use("/api/carrito",routes.routerCarrito)
app.use("/api/productos",routes.routerProductos)
app.use("/api/login",routes.routerLogin)
app.use("/api/registro",routes.routerRegister)
app.use("/api/chat",routes.routerChat)


const port = process.env.PORT
httpServer.listen(port, console.log(`servidor escuchando en el puerto ${port}`))