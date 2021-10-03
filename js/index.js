

$(document).ready(function(){
    /*if("carrito" in localStorage){
        
        const arrayLiterales = JSON.parse(localStorage.getItem("carrito"));
        for(const literal of arrayLiterales){
            carrito.push(new Producto(literal.id, literal.nombre, literal.precio,literal.categoria,literal.cantidad,literal.imagen));
        }
        console.log(carrito);
        
    }
    */
    carritoUI(carrito);
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
    });
/*
// CREACION DE PRODUCTOS
productos.push(new Producto(1,"PC1",50000,categorias[0],"MOTHER: am4 biostar - MICRO: amd A6-9500 3.8ghz - RAM: ddr4 8gb - DISCO: ssd 240gb","imagenes/pc1.jpg"));
productos.push(new Producto(2,"PC2",65000,categorias[0],"MOTHER: am4 biostar - MICRO: amd athlon 3.5ghz - RAM: ddr4 16gb - DISCO: ssd 240gb","imagenes/pc2.jpg"));
productos.push(new Producto(3,"PC3",70000,categorias[0],"MOTHER: am4 biostar - MICRO: amd athlon 3.5ghz - RAM: ddr4 16gb - DISCO: ssd 500gb","imagenes/pc3.jpg"));
productos.push(new Producto(4,"NOTEBOOK1",70000,categorias[0],"MICRO: amd athlon 3.5ghz - RAM: ddr4 8gb - DISCO: ssd 240gb","imagenes/pc4.jpg"));
productos.push(new Producto(5,"NOTEBOOK2",80000,categorias[0],"MICRO: amd athlon 4ghz - RAM: ddr4 8gb - DISCO: ssd 500gb","imagenes/pc5.jpg"));
productos.push(new Producto(6,"NOTEBOOK3",90000,categorias[0],"MICRO: amd athlon 4ghz - RAM: ddr4 16gb - DISCO: ssd 500gb","imagenes/pc6.jpg"));

console.log(productos);

productosUI(productos,"#contenedorProductos");

*/

menuUI(categorias, "#filtroCategorias");

$('#filtroCategorias').change(function(e) {
    const value = this.value;

    $('#contenedorProductos').fadeOut(600, function(){
            const filtrados = productos.filter(producto => producto.categoria == value);
            productosUI(filtrados, '#contenedorProductos');
        
        $("#contenedorProductos").fadeIn();
    })
});

