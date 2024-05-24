document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrito desde localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoItemsContainer = document.querySelector('.carrito-items');
    const carritoTotal = document.querySelector('.carrito-total h3');
    const checkoutBtn = document.querySelector('.checkout-btn');

    function actualizarCarrito() {
        carritoItemsContainer.innerHTML = '';
        let total = 0;

        carrito.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'carrito-item';

            itemDiv.innerHTML = `
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="item-details">
                    <h3>${item.nombre}</h3>
                    <p>Precio: $${item.precio}</p>
                    <p>Cantidad: <input type="number" value="${item.cantidad}" min="1" data-nombre="${item.nombre}"></p>
                    <button class="remove-item" data-nombre="${item.nombre}">Eliminar</button>
                </div>
            `;

            carritoItemsContainer.appendChild(itemDiv);

            total += item.precio * item.cantidad;
        });

        carritoTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Actualizar carrito al cargar la página
    actualizarCarrito();

    // Añadir producto al carrito
    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const nombre = event.target.dataset.nombre;
            const precio = parseFloat(event.target.dataset.precio);
            const imagen = event.target.dataset.imagen;
            
            // Comprobar si el producto ya está en el carrito
            const productoExistente = carrito.find(item => item.nombre === nombre);
            if (productoExistente) {
                productoExistente.cantidad++;
            } else {
                carrito.push({ nombre, precio, imagen, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    });

    // Cambiar cantidad de producto en el carrito
    carritoItemsContainer.addEventListener('input', function(event) {
        if (event.target.type === 'number') {
            const nombre = event.target.dataset.nombre;
            const nuevaCantidad = parseInt(event.target.value);

            const producto = carrito.find(item => item.nombre === nombre);
            if (producto) {
                producto.cantidad = nuevaCantidad;
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCarrito();
            }
        }
    });

    // Eliminar producto del carrito
    carritoItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const nombre = event.target.dataset.nombre;
            carrito = carrito.filter(item => item.nombre !== nombre);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarCarrito();
        }
    });

    checkoutBtn.addEventListener('click', function() {
        alert('Procediendo al pago...');
        // Aquí podrías redirigir a una página de pago o similar
    });
});
