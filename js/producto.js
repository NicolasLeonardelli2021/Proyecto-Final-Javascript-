

// CLASE PRODUCTO
class Producto{
	constructor(id,nombre,precio,categoria,descripcion,imagen,cantidad){
		this.id = parseInt(id);
		this.nombre = nombre;
		this.precio = parseFloat(precio);
		this.categoria = categoria;
        this.cantidad = cantidad || 1;
		//this.descripcion = descripcion;
		this.imagen = imagen;
		
	}
	agregarCantidad(valor){
        this.cantidad +=valor;
    }

    subtotal(){
        return this.cantidad*this.precio;
    }

}