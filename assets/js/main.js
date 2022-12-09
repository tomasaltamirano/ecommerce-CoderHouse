//Variables
const carritoCompras = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('section.main-container');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

/*sweet alert*/
document.addEventListener('DOMContentLoaded', ()=>{
Swal.fire({
  icon: 'info',
  title: 'Hola!',
  text: 'En la tienda aceptamos dólares por el momento, disculpe las molestias.',
  footer: 'En el menu de navegacion encontrará la cotizacion actualizada.'
})

cargarApi()
}) 





//Event Listeners
cargarEventListeners();

function cargarEventListeners() {
	listaProductos.addEventListener('click', agregarProducto)

	document.addEventListener('DOMContentLoaded',()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carritoCompras')) || [];
        
        carrito()
    })

	//eliminar producto con un click
	carritoCompras.addEventListener('click', eliminarProducto)

	//vacia el carrito y elimina los productos del localStorage
	vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}



//Funciones

function cargarApi(){
	const url = 'https://api.bluelytics.com.ar/v2/latest'
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarDolar(resultado.blue))

}

function mostrarDolar({value_buy, value_sell}){
	const containerProductos = document.querySelector('.container-productos')

	/*div padre*/
	const parentDiv = document.createElement('div');
	parentDiv.innerHTML = '<h4>Cotizacion dolar</h4>'

	/*div hijo*/


	const childDiv = document.createElement('div');
	childDiv.classList.add('valor-dolar')
	childDiv.innerHTML = `
		 <p class="compra">Compra: <span>${value_buy}</span></p>
		<p class="venta">Venta: <span>${value_sell}</span></p>
	`
						

	parentDiv.appendChild(childDiv)
	containerProductos.appendChild(parentDiv)
}

//=====
function agregarProducto(e) {
	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		const item = e.target.parentElement.parentElement;
		
		
		// Envia el producto seleccionado para tomar sus datos
		leerDatos(item);
		
	}

	
}

function leerDatos(item) {
	const infoProductos = {
		//Lee los datos del producto seleccionado

		imagen: item.querySelector('img').src,
		titulo: item.querySelector('h4').textContent,
		precio: item.querySelector('.precio').textContent,
		id: item.querySelector('.columns .agregar-carrito').getAttribute('data-id'),
		cantidad: 1,
	}
	 console.log(infoProductos)

	//Itera sobre los datos del producto seleccionado y los guarda en el articulosCarrito
	const existe = articulosCarrito.some(item => item.id === infoProductos.id)
	console.log(existe)
	if(existe){
		const productos = articulosCarrito.map( item => {
			if (item.id === infoProductos.id) {
				item.cantidad++
				
				return item

			}if(item.precio === infoProductos.precio){
				item.precio++

				
			}else{
				return item
			}
			

			
			
			
			

		})
		
		articulosCarrito = [...productos]
	}else{
		articulosCarrito = [...articulosCarrito, infoProductos]
	}

	console.log(articulosCarrito)
	carrito()
}

function carrito(){

	vaciarCarrito()
	articulosCarrito.forEach(producto =>{
		const {imagen, titulo, precio, cantidad, id } = producto;
		const row = document.createElement('tr');
		row.innerHTML = `
                <td>
				<img src = "${imagen}" width="50">
				</td>
                <td>${titulo}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>
                <a href="#" class="borrar-elemento" data-id="${id}">X</a>
                </td>

        `;
		contenedorCarrito.appendChild(row);
	})

	//Agregar productos al storage
     sincronizarStorage();
}

function sincronizarStorage() {
	localStorage.setItem('carritoCompras', JSON.stringify(articulosCarrito))
}


function eliminarProducto(e){
	if (e.target.classList.contains ('borrar-elemento')) {
		console.log(e.target.classList)
		const productoId = e.target.getAttribute('data-id')

		articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoId)

		carrito()
	}

}


function vaciarCarrito() {
	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild)
		localStorage.clear();
		// location.reload();
	}
	
}

