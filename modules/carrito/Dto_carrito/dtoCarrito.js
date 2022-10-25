export class CarritoDto {
    constructor(data, products) {
        this.username = data.username
        this.timestamp = data.timestamp
        this.direccion = data.direccion
        this.items = [products]
    }
}

export class CarritoProductsDto {
    constructor(data) {
        this.items = {
            id: data.id,
            nombre: data.nombre,
            precio: data.precio,
            cantidad: data.cantidad
        }
    }
}