/*cuando se cargue el contenido ejecuto desde las llaves  */
document.addEventListener("DOMContentLoaded",() => 
    {
        /*query selector porq devuelve un solo elemento*/ 
        var productosContainer=document.querySelector("#productos-container");
    
        /*fetch para obtener la data de la API*/
        fetch("https://dummyjson.com/products?limit=20") /*primeros 20 elementos*/
        .then(response=>response.json())
        .then((data)=>{
            /*todo el elemento products los 20 seleccionados */
            var productos= data.products;
            /*pongo en 0 el producto container */
            productosContainer.innerHTML=""
          
    productos.forEach((product) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-md-4";

    //agrega una card por cada elemento del json obtenido en la petición  
    cardDiv.innerHTML = `
    <div class="card mt-3">
        <img src="${product.images}" class="card-img-top" alt="${product.title}" style="height: 200px;">
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text fw-bold">$${product.price}</p>
        <button class="btn btn-success mt-auto">Agregar</button>
            </div>
        </div>
    `;
    // selecciono el boton agregar de la card div
    const botonAgregar=cardDiv.querySelector("button")

    botonAgregar.addEventListener("click", () =>{
        agregarAlCarrito(product);
//agrega los productos al carrito 
    });
    //añao la card al contenedor
    productosContainer.appendChild(cardDiv);
});
        })
        .catch((error)=>console.log("error de conexión"));

        function agregarAlCarrito(product){
            //va a obtener el elemento cart 
            let cart =JSON.parse(localStorage.getItem("cart")) ||[];
            //agrego elemento nuevo
            cart.push(product);
            localStorage.setItem("cart",JSON.stringify(cart));
            //alerta 
            Swal.fire({
                title: 'Producto agregado',
                text: `${product.title} ha sido agregado al carrito.`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
        }
        //carga inicial de productos 
        fetchProductos();
    });               