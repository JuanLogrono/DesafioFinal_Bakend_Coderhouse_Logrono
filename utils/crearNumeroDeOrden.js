export default function crearNumeroDeOrden(array) {
    let ordenNumero = 1
    if(array.length<1) return ordenNumero
    const newArray = array.sort((a, b) => Number(a.orden_numero) - Number(b.orden_numero))
    const i = newArray.length-1
     ordenNumero= Number(newArray[i].orden_numero)+1
    return ordenNumero
}