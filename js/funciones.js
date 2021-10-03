

// INTERFAZ DE PRODUCTOS

function productosUI(productos, id){
	$(id).empty();

	for(const producto of productos){
		$(id).append((` <div class="card" style="width: 18rem;">
						<h5> ${producto.nombre}</h5>
						<img src="${producto.imagen}" alt="pc 1">
						<div class="card-body">
							<h5> ${producto.precio} </h5>
							<a href="" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
							<a href="#" class="btn btn-primary btn-compra">Mas Info</a>		
						</div>
						</div>
					`))
					}
				$('.btn-compra').on("click",comprarProducto);
				}

// SELECCIONAR BOTONES GENERADOS


const botones = $(".btnCompra");
console.log(botones);




// LOGICA CARRITO

function comprarProducto(e){
	e.preventDefault();
	const idProduto = e.target.id;
	const seleccionado = carrito.find(p => p.id == idProduto);
	
	//si no se encontro el id, buscar en array de productos
	if(seleccionado == undefined){
		carrito.push(productos.find(p => p.id == idProduto));
	}else{
		seleccionado.agregarCantidad(1);
	}


// GUARDAR EN STORAGE
localStorage.setItem("carrito",JSON.stringify(carrito));

// SALIDA PRODUCTO
carritoUI(carrito);
}

/*
// RENDERIZAR LA INTERFAZ DEL CARRITO
function carritoUI(productos){
//$('#carritoCantidad').html(productos.length);

$('#carritoCantidad').empty();
$('#carritoCantidad').append(`<h3 id="contadorCarrito">${productos.length} --> </h3>
<a href="#"><img src="Imagenes/carrito.png" alt="carrito de compras"></a>`);

$('#carritoProductos').empty();

for(const producto of productos){
	$('#carritoProductos').append(registroCarrito(producto));
}

 //Asociar evento a la interfaz generada
 $(".btn-add").click(addCantidad);
 //$(".btn-delete").click(eliminarCarrito);

}

*/
/*
//MANEJADOR PARA AGREGAR CANTIDAD
function addCantidad(){
    let producto = carrito.find(p=> p.id == this.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;

    //Guardar en storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

*/
/*
// GENERAR ESTRUCTURA PRODUCTOS COMPRADOS
function registroCarrito(producto){
	return `<p> ${producto.nombre} 
	<span class="badge bg-warning">$ ${producto.precio} </span>
	<span class="badge bg-dark">${producto.cantidad}</span>
	
	</p>`
}
*/

// FUNCION PARA RENDERIZAR EL MENU 
function menuUI(lista,selector){
	$(selector).empty();

	// recorrer lista
	lista.forEach(element => {
        $(selector).append(`<option value"${element}">${element}</option>`)
		
	});
}

