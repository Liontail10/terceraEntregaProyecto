//Manipulación del DOM
const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const titulo = document.getElementById("titulo")
const divProductos = document.getElementById("divProductos")

//guardando información en el storage
formulario.onsubmit=(e)=>{
    e.preventDefault()
    const infoUsuario = {
        nombre:inputNombre.value,
        apellido:inputApellido.value
}
localStorage.setItem("infoUsuario",JSON.stringify(infoUsuario))
formulario.remove()
titulo.innerText = `Bienvenido ${infoUsuario.nombre} ${infoUsuario.apellido}`
}

const infoUsuario = localStorage.getItem("infoUsuario")
const infoUsuarioJS = JSON.parse(infoUsuario)
if(infoUsuario){
    formulario.remove()
    titulo.innerText = `Bienvenido ${infoUsuarioJS.nombre} ${infoUsuarioJS.apellido}`
}
//clase de productos
class Producto {
    constructor(nombre, id, precio,image) {
        this.nombre = nombre
        this.id = id
        this.precio = precio
        this.image = image
    }
};
// Guardar productos en un arreglo
const playeras = new Producto("playeras", 1, 300);
const figuras = new Producto("figuras", 2, 800);
const accesorios = new Producto("accesorios", 3, 500);
const tazas = new Producto("tazas", 4, 50);

const Productos = [playeras,figuras,accesorios,tazas]
Productos.forEach(prod=>{
divProductos.innerHTML += `<div class="card cardProduct">
<div class="card-body">
  <h5 class="card-title">${prod.nombre}</h5>
  <p class="card-text">${prod.precio}</p>
  <button id=${prod.id} class="btn btn-primary">Agregar</button>
</div>
</div>`
})

// creación del carrito usando información del storage
const carrito = []
const botonesAgregar = document.querySelectorAll(".btn-primary")
botonesAgregar.forEach(boton=>{
    boton.onclick = ()=>{
        const producto = Productos.find(p=>p.id===parseInt(boton.id))
        const productoCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        }

        const prodEnCarrito = carrito.find(prod=>prod.id===productoCarrito.id)
        if (!prodEnCarrito){
            carrito.push(productoCarrito)
        } else{
            prodEnCarrito.cantidad++
        }
         
        
        console.log(carrito)
    }
})
//creacion del botón finalizar con manejo del DOM y el cálculo del total de la compra con tabla 
const botonFinalizar = document.querySelector("#finalizar")
const thead = document.querySelector("#thead")
const tbody = document.querySelector("#tbody")
const parrafoTotal = document.querySelector("#total")
botonFinalizar.onclick = ()=>{
divProductos.remove()
botonFinalizar.remove()
thead.innerHTML = `^<tr>
<th scope="col">Producto</th>
<th scope="col">Cantidad</th>
<th scope="col">Total</th>
</tr>`
let totalCompra = 0
carrito.forEach(prod=>{
    totalCompra+= prod.cantidad*prod.precio
    tbody.innerHTML+= `
    <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.cantidad*prod.precio}</td>
   <tr>
  `
})
    parrafoTotal.innerText = `el total de tu compra es ${totalCompra}`
}