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
    )
    window.location.reload(true)
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
    )
    window.location.reload(true)
}

