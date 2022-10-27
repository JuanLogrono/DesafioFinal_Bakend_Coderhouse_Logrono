/* import {} from ""


export const serverIo = (ioServer) => {
    ioServer.on("connection", async (socket) => {
        console.log("conectado");
        socket.emit("mensajes", await chatService.mostrarMensajes());
        socket.on("newMessage", async (newMessage) => {
            await chatService.guardarMensaje(newMessage);
            ioServer.sockets.emit("mensajes", await chatService.mostrarMensajes());
        });
    });
} */