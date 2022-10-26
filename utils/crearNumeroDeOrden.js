export default function crearNumeroDeOrden(array) {
    let ordenNumero = 1
    if(array.length===0) return ordenNumero
    const newArray = array.sort((a, b) => Number(a.orden_numero) - Number(b.orden_numero))
    const i = newArray.length
     ordenNumero= Number(newArray[i].orden_numero)+1
    return ordenNumero
}