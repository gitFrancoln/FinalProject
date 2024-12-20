document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-items');
    const totalGeneral = document.getElementById('total');
    const btnLimpiarCarrito = document.getElementById('limpiar-carrito');
    const btnFinalizarCompra = document.getElementById('finalizar-compra');
    let total = 0;

    // mostrar productos en la tabla
    carritoItemsStorage.forEach((item, index) => {
        const row = document.createElement('tr');

        // nombre
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = item.title;
        row.appendChild(nombreCelda);

        // precio
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${item.price}`;
        row.appendChild(precioCelda);

        // cantidad
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = 1;
        row.appendChild(cantidadCelda);

        // subtotal
        const subtotal = item.price;
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${subtotal}`;
        row.appendChild(subtotalCelda);

        // botón Eliminar
        const eliminarCelda = document.createElement('td');
        const eliminarBoton = document.createElement('button');
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.addEventListener('click', () => {
            removeFromCart(index);
        });
        eliminarCelda.appendChild(eliminarBoton);
        row.appendChild(eliminarCelda);

        carritoTableBody.appendChild(row);

        total += subtotal;
    });

    totalGeneral.textContent = `$${total.toFixed(2)}`;

    btnLimpiarCarrito.addEventListener('click', () => {
        localStorage.removeItem('cart');
        location.reload();
    });

    btnFinalizarCompra.addEventListener('click', () => {
        if (carritoItemsStorage.length === 0) {
            Swal.fire({
                title: 'Ooops!',
                text: 'Agregá más productos antes de finalizar la compra',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            }).then(() => {
                window.location.href = 'index.html';
            });
        } else {
            Swal.fire({
                title: '¡Listo!',
                text: 'Enviaremos tu producto',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            }).then(() => {
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            });
        }
    });

    function removeFromCart(index) {
        carritoItemsStorage.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(carritoItemsStorage)); 
        location.reload();
    }
});
