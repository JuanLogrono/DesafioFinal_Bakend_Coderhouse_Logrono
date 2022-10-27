/**
 * 
 * @param {Array_de_Items_del_carrito} array 
 * @returns precio total
 */
export default function calcularPrecioTotal(array) {
    let total = 0
    for (let i = 0; i < array.length; i++) {
        let x = Number(array[i].precio) * Number(array[i].cantidad);
        total += x
    }
    return total
}