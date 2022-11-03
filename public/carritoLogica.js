function modificarDireccion(event) {
    const username = event.target.value
    const dir = document.getElementById("dir").value;
    const direccion = { direccion: dir }
    fetch(`/api/carrito/modificar/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(direccion)
    }
    ).then(()=>window.location.assign('/api/carrito'))
}


function modificarCantidad(event) {
    const url = event.target.formAction
    const id = event.target.value
    const cant = document.getElementById("modificar_cantidad").value;
    const items = { id: id, cantidad: cant }
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
    }
    ).then(()=>window.location.assign('/api/carrito'))    
}

function eliminarCarrito(event){
    const username=event.target.value

    fetch(`/api/carrito/${username}`,{
        method: "DELETE"
    }
    ).then(()=>window.location.assign('/api/productos'))    
}

function eliminarProductoCarrito(event){
    const id = event.target.value
    const url= event.target.formAction
 
    fetch(`${url}/eliminado`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id:id})
    }
    ).then(()=>window.location.assign('/api/carrito'))    
}

