export default class DtoProductos{
    constructor(data){
        this.id= data._id
        this.categoria= data.categoria
        this.nombre= data.nombre
        this.descripcion= data.descripcion
        this.foto= data.foto
        this.precio= data.precio
        this.stock= data.stock
    }
}