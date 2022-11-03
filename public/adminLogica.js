function modificarProducto() {
    const id = document.getElementById("idProd").value
    const data = {
        "nombre": document.getElementById("nombre").value || null,
        "descripcion": document.getElementById("descripcion").value || null,
        "precio": document.getElementById("precio").value || null,
        "stock": document.getElementById("stock").value || null
    }
    const cleanData = Object.fromEntries(Object.entries(data).filter(p => p[1]));

    fetch(`/api/admin/productos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cleanData)
    }
    ).then(()=>window.location.assign('/api/admin/productos'))
    
    return false
}


function buttonDelete(event) {
    const id = event.target.value
    fetch(`/api/admin/productos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    ).then((res) => res.redirected(true))
}