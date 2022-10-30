let socket = io();

fetch("/views/chatMensajes.hbs")
    .then(response => response.text())
    .then(template => {
        const hbsView = Handlebars.compile(template);
        socket.on('mensajes', (messagesList) => {
            let hayMensajes = (messagesList.length > 0) ? true : false
            const htmlView = hbsView({ messagesList, hayMensajes });
            const chatDiv = document.getElementById("chat")
            chatDiv.innerHTML = htmlView;
            chatDiv.scrollTop = chatDiv.scrollHeight

        })
    })

const sendMessage = () => {
    const username = document.getElementById('username').value;
    const mensajes = document.getElementById('messageText').value;
    const newMessage = { username, mensajes }
    socket.emit('newMessage', newMessage);

    document.getElementById('messageText').value = '';
    return false
}

