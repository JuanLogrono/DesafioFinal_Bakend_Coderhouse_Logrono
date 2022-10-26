import mongoose from 'mongoose';
import { config } from 'dotenv';
config()
const productSchema = new mongoose.Schema(
    {
        categoria: { type: String },
        nombre: { type: String },
        descripcin: { type: String },
        foto: { type: String },
        precio: { type: Number },
        stock: { type: Number }
    }
)

const carritoSchema = new mongoose.Schema(
    {
        timeStamp: { type: String },
        username: { type: String, required: true },
        direccion: { type: String },
        items: { type: Array, required: true }
    }
)

const userSchema = new mongoose.Schema({
    nombre: { type: String },
    direccion: {type:String},
    telefono: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

const orderSchema = new mongoose.Schema({
    items: { type: Array, required: true },
    orden_numero: { type: Number },
    timestamp: { type: String },
    estado: { type: String },
    username: { type: String, required: true },
    total: {type: Number}
})

const chatSchema = new mongoose.Schema({
    email: { type: String },
    tipo: { type: String },
    timestamp: { type: String },
    cuerpo_mensaje: { type: String }
})
const connected= process.env.MONGO_CONNECTION

export const cart = mongoose.model('carrito', carritoSchema)
export const products = mongoose.model('producto', productSchema)
export const user = mongoose.model('usuarios', userSchema)
export const order = mongoose.model('ordenes', orderSchema)
export const chat = mongoose.model('chat', chatSchema)
export const conexion = "mongodb+srv://juanLogrono:Juan1234@cluster0.evzhzyt.mongodb.net/?retryWrites=true&w=majority"
//TODO

 