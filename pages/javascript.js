document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.getElementById('cart-items');
    const clearCartButton = document.getElementById('clear-cart');

    function renderCart() {
        cartContainer.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('list-group-item');
            cartItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5>${item.name}</h5>
                        <p><strong>$${item.price}</strong></p>
                        <input type="number" value="${item.quantity}" min="1" class="form-control quantity-input" data-index="${index}">
                    </div>
                    <button class="btn btn-danger remove-item" data-index="${index}">Eliminar</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    function updateCart() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCart();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price')); // Error 1: Convertir el precio a número
            const existingItem = cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ id, name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.getAttribute('data-index');
            cartItems.splice(index, 1);
            updateCart();
        }
    });

    cartContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const index = event.target.getAttribute('data-index');
            const newQuantity = parseInt(event.target.value); // Error 2: Convertir la cantidad a número
            cartItems[index].quantity = newQuantity;
            updateCart();
        }
    });

    clearCartButton.addEventListener('click', () => {
        cartItems.length = 0;
        updateCart();
    });

    renderCart();
});

$(document).ready(function() {
    // Datos de los productos
    const productos = [
        {
            id: 1,
            nombre: "Café de especialidad de Brasil en grano o molido (250g)",
            precio: 15000,
            imagen: "./assets/img/brasil.webp"
        },
        {
            id: 2,
            nombre: "Combo café de especialidad Bolivia, Colombia, Brasil (750g)",
            precio: 42000,
            imagen: "./assets/img/combo.webp"
        },
        {
            id: 3,
            nombre: "Café de especialidad de Colombia en grano o molido (250g)",
            precio: 18000,
            imagen: "./assets/img/colombia.webp"
        }
    ];

    // Cargar productos en la sección "Comprar café"
    let productList = $('#product-list');
    productos.forEach(producto => {
        let productCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="border-radius: 15%;">
                    <div class="card-body">
                        <h3 class="card-title">${producto.nombre}</h3>
                        <p class="card-text"><strong>$${producto.precio}</strong></p>
                        <button class="btn btn-primary add-to-cart" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        `;
        productList.append(productCard);
    });
});
