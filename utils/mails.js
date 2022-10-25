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
    enviarMail(asunto,cuerpoMail)
    return "mail de registro enviado"
}



export const mailOrder = (user,productsView)=>{
    const asunto = `Nuevo pedido ${user.nombre} ${user.username}`
    const listaProd= productsView.productos
    let lista=""
    listaProd.map((e)=>{
        lista+=`<li>${e.nombre}  $${e.precio}</li>`
    })
    const cuerpoMail = `<strong>Productos seleccionados:</strong> <ul>${lista}</ul>`
    enviarMail(asunto,cuerpoMail)
    return "mail de orden enviado"
}
