export class OrderDto {
    constructor(data,items) {
        this.items= items,
        this.orden_numero= data.orden_numero,
        this.timestamp= data.timestamp,
        this.estado= data.estado|| "Generada",
        this.username= data.username
        this.total=data.total
    }
}

export class OrdenProductsDto {
    constructor(data) {
            this.id = data.id,
            this.nombre = data.nombre,
            this.precio = Number(data.precio,)
            this.cantidad = Number(data.cantidad)
            this.sub=this.precio*this.cantidad
    }
}