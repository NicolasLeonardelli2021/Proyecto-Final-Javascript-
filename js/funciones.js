

// INTERFAZ DE PRODUCTOS

function productosUI(productos, id){
	$(id).empty();

	for(const producto of productos){
		$(id).append((` <div class="card" style="width: 18rem;">
						<h5> ${producto.nombre}</h5>
						<img src="${producto.imagen}" alt="${producto.nombre}">
						<div class="card-body">
							<h5>$ ${producto.precio} </h5>
							<a href="" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
							<span class="badge bg-warning">Disponibles: ${producto.cantidad}</span>
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
contadorCarrito(carrito);
}


// CONTAR PRODUCTOS COMPRADOS
function contadorCarrito(productos){
$('#carritoCantidad').empty();
$('#carritoCantidad').append(`<h3 id="contadorCarrito">${productos.length} --> </h3>
<a href="#insumos2" id="productosComprados"><img src="Imagenes/carrito.png" alt="carrito de compras"></a>
`);
}

function totalesUI(){
	$('#notificaciones').empty();
	$('#notificaciones').append(`<div class="d-inline" id="divtotal">
	<h5 id="total"> TOTAL ${totalCarrito(carrito)} </h5>
	<a type="button" id="btnConfirmar" class="btn btn-primary">CONFIRMAR</a></div>`)

	$("#btnConfirmar").click(confirmarCompra);
}

// RENDERIZAR INTERFAZ CARRITO
function carritoUI(productos, id){
	$(id).empty();

	for(const producto of productos){
		$(id).append((` <div class="card" style="width: 18rem;">
						<h5> ${producto.nombre}</h5>
						<img src="${producto.imagen}" alt="${producto.nombre}">
						<div class="card-body">
							<h5>$ ${producto.precio} </h5>
							<span class="badge bg-dark">${producto.cantidad}</span>
            				<span class="badge bg-success"> $ ${producto.subtotal()}</span>
            				<a id="${producto.id}" class="btn btn-info btn-add">+</a>
            				<a id="${producto.id}" class="btn btn-warning btn-sub">-</a>
            				<a id="${producto.id}" class="btn btn-danger btn-delete">X</a>
							
						</div>
						</div>
					`))
					}
					$(".btn-add").click(addCantidad);
    				$(".btn-delete").click(eliminarCarrito);
    				$(".btn-sub").click(subCantidad);
    				
				}
	
	
//MANEJADOR PARA ELIMINAR PRODUCTO
function eliminarCarrito(e){
    //console.log(e.target.id);
    let posicion = carrito.findIndex(p => p.id == e.target.id);
    carrito.splice(posicion,1);

    carritoUI(carrito, '#carritoProductos');

    localStorage.setItem("carrito",JSON.stringify(carrito));
	contadorCarrito(carrito);
	totalesUI();
}

//MANEJADOR PARA AGREGAR CANTIDAD
function addCantidad(){
    let producto = carrito.find(p=> p.id == this.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML =  producto.cantidad;
    $(this).parent().children()[2].innerHTML = "$ " + producto.subtotal();


    //Guardar en storage
    localStorage.setItem("carrito",JSON.stringify(carrito));
	totalesUI();
}

//MANEJADOR PARA RESTAR CANTIDAD
function subCantidad(){
    let producto = carrito.find(p=> p.id == this.id);

    if(producto.cantidad > 1){
        producto.agregarCantidad(-1);

        let registroUI = $(this).parent().children();
        registroUI[1].innerHTML = producto.cantidad;
        registroUI[2].innerHTML = "$ " + producto.subtotal();
		totalesUI();
    //Guardar EN STORAGE 
    localStorage.setItem("carrito",JSON.stringify(carrito));
	
    }
}

// FUNCION PARA RENDERIZAR EL MENU 
function menuUI(lista,selector){
	$(selector).empty();

	// recorrer lista
	lista.forEach(element => {
        $(selector).append(`<option value"${element}">${element}</option>`)
		
	});
	$(selector).prepend(`<option value="TODOS" selected>TODOS</option>`);
}

// FUNCION TOTAL CARRITO
function totalCarrito(carrito){
    console.log(carrito);
    let total = 0;
    carrito.forEach(p=>total += p.subtotal());
    return total.toFixed(2);
}

// FUNCION PARA ENVIAR EL BACKEND
function confirmarCompra(){
	const URLPOST = "http://jsonplaceholder.typicode.com/posts";

	// info a enviar
	const DATA = {productos: JSON.stringify(carrito), total: totalCarrito(carrito)}

	// Peticion post con ajax
	$.post(URLPOST,DATA, function(respuesta,estado){
		if(estado == 'success'){
			$("#notificaciones").html(`<div class="alert alert-sucess alert-dismissible fade show" role="alert">
			<strong id="confirmar"> COMPRA CONFIRMADA! </strong>
			</div>
			`).fadeIn().delay(2000);

			// Vaciar carrito

			carrito.splice(0,carrito.length);

			localStorage.setItem("carrito",'[]');

			$('#carritoProductos').empty();

			contadorCarrito(carrito);
			
		}
	})
}