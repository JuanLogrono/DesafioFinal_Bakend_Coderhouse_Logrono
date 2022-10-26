export class CarritoDto {
    constructor(data, products) {
        this.username = data.username
        this.timestamp = data.timestamp
        this.direccion = data.direccion
        this.items = products
    }
}

export class CarritoProductsDto {
    constructor(data) {
            this.id = data.id,
            this.nombre = data.nombre,
            this.precio = data.precio,
            this.cantidad = data.cantidad
    }
}