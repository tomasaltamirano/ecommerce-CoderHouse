//productos
const producto1 = [{ nombre: 'Tablet', precio: 600 }];
const producto2 = [{ nombre: 'Smartphone', precio: 900 }];
const producto3 = [{ nombre: 'Teclado', precio: 200 }];

//le solicita el ingreso al usuario
const ingresar = prompt('Para entrar a la tienda ingrese "Y"');

//valida el ingreso
function accesoTienda() {
	if (ingresar == 'Y' || ingresar == 'y') {
		seleccionarCompra();
	} else {
		alert('Gracias por visitarnos');
	}
}

accesoTienda();

//consulta al usuario
function seleccionarCompra() {
	alert(
		'Tenemos stock de los siguientes productos: \n1: Tablet \n2: Smartphone \n3: Teclado'
	);

	const seleccionar = prompt(
		'Ingrese "1" para comprar la tablet \n ingrese "2" para comprar el Smartphone \n ingrese "3" para comprar el teclado'
	);

	//itera sobre cada seleccion de producto y completa la compra
	switch (seleccionar) {
		case '1':
			for (let producto of producto1) {
				alert(
					`el producto que seleccionó es: ${producto.nombre} y tiene un valor de ${producto.precio}`
				);
			}
			break;
		case '2':
			for (let producto of producto2) {
				alert(
					`el producto que seleccionó es: ${producto.nombre} y tiene un valor de ${producto.precio}`
				);
			}
			break;
		case '3':
			for (let producto of producto3) {
				alert(
					`el producto que seleccionó es: ${producto.nombre} y tiene un valor de ${producto.precio}`
				);
			}
			break;

		default:
			alert('Gracias por visitarnos');
			break;
	}
}
