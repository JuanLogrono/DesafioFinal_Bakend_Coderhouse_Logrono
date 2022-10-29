 import ChatService from "../service_chat/serviceChat.js";

 const socketChat= new ChatService()

export const serverIo = (ioServer) => {
    ioServer.on("connection", async (socket) => {
        console.log("conectado");
        socket.emit("mensajes", await socketChat.readMessages());
        socket.on("newMessage", async (newMessage) => {
            await socketChat.addMessages(newMessage);
            ioServer.sockets.emit("mensajes", await socketChat.readMessages());
        });
    });
} 