import { enviarMail } from "../configuraciones/nodemailer_config/nodemailer.js";



export const mailRegistro=(user)=>{
    
    const {username, nombre, telefono, direccion}=user[0];
    const asunto = 'Nuevo Registro'
    const cuerpoMail = `<ul>
    <li>Nombre: ${nombre}</li>
    <li>E-mail: ${username}</li>
    <li>Teléfono: ${telefono}</li>
    <li>Dirección: ${direccion}</li>
    </ul>`
    enviarMail(_,asunto,cuerpoMail)
    return "mail de registro enviado"
}



export const mailOrder = (user)=>{
    
    const asunto = `Pedido nro ${user.orden_numero} del cliente ${user.username}`
    const destino="juanjoselogrono@gmail.com"
    const items=user.items
    let lista=""
     items.map((e)=>{
        lista+=`<li>${e.nombre} $${e.precio} X ${e.cantidad} Un</li>`
    }) 
    const cuerpoMail = `<strong>Productos seleccionados:</strong> <ul>${lista}</ul>`
    enviarMail(destino,asunto,cuerpoMail)
    return "mail de orden enviado"
}
