

$(document).ready(function(){
    if("carrito" in localStorage){
        
        const arrayLiterales = JSON.parse(localStorage.getItem("carrito"));
        for(const literal of arrayLiterales){
            carrito.push(new Producto(literal.id, literal.nombre, literal.precio,literal.categoria,literal.cantidad,literal.imagen));
        }
        console.log(carrito);
        
    }
    
    
// CARGAR DATA DE ORIGEN LOCAL
$.get("data/productos.json",function(datos,estado){
	console.log(datos);
	console.log(estado);
	if(estado == "success"){
		for(const literal of datos){
			productos.push(new Producto(literal.id, literal.nombre, literal.precio,literal.categoria,literal.cant,literal.imagen));
		}
	}
	console.log(productos);
	productosUI(productos,'#contenedorProductos');
});


contadorCarrito(carrito);

// Ver CARRITO
$('#productosComprados').on('click', function(){
   
    $('#contenedorProductos').fadeOut();
    
    totalesUI();
    carritoUI(carrito, '#carritoProductos');
     
});

});

menuUI(categorias, "#filtroCategorias");

$('#filtroCategorias').change(function(e) {
    const value = this.value;
    $('#carritoProductos').hide();
    $('#contenedorProductos').fadeOut(600, function(){
        if(value == 'TODOS'){
            productosUI(productos, '#contenedorProductos');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#contenedorProductos');
        }
        $("#contenedorProductos").fadeIn();
    })
});



