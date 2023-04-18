//Manejo y recuperación del DOM
const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const tituloPrincipal = document.getElementById("tituloPrincipal")
const titulo = document.getElementById("titulo")
const divProducts = document.getElementById("productos")
const finishButton = document.getElementById("finalizar")

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

//Función para ejecutar el fetch
const fetchProducts = async()=>{
    const productsApi = await fetch ('https://fakestoreapi.com/products')
    const productsJSON = await productsApi.json()
    //console.log(productsJSON);
    return productsJSON
}
const fetchOneProduct = async (id)=>{
    const productApi = await fetch (`https://fakestoreapi.com/products/${id}`)
    const productJSON = await productApi.json()
    //console.log(productsJSON);
    return productJSON
}


//función para renderizar productos

const renderProducts = async()=>{
    const products = await fetchProducts()
    products.forEach((prod)=>{
        const {id,title,price,category,image} = prod
        divProducts.innerHTML += `
        <div class="card cardProduct">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${price} ${category}</p>
          <button id=${id} onclick="addProduct(${id})">Add</button>
          <button id=${id} onclick="removeProduct(${id})">Remove</button>
        </div>
        </div>`
    })
}
renderProducts()
//diseño del carrito

let cart = []

const addProduct = async(id)=>{
    const product = await fetchOneProduct(id)
    const searchProductCart = cart.find((prod) => prod.id === product.id)
    if (!searchProductCart){
        cart.push({
            id:product.id,
            name:product.title,
            quantity:1,
            price:product.price
        })
    } else{
        searchProductCart.quantity++
    }
    messageAdd()
    console.log(cart)
} 

const removeProduct = (id)=>{
    const searchProductCart = cart.find((prod) => prod.id === id)
    if (!searchProductCart){
        messageNoProd()
    } else{
        if (searchProductCart.quantity===1){
            cart = cart.filter((prod) => prod.id !==id)
        } else {
        searchProductCart.quantity--
         }
         messageRemove()
    }
console.log(cart)
}

const messageAdd = ()=>{
    Swal.fire ({
        text: "Product added",
        timer: 1000
        }) 
}
const messageRemove = ()=>{
    Swal.fire ({
        text: "Product removed",
        timer: 1000
        }) 
}


const messageNoProd = ()=>{
    Swal.fire ({
        text: "Your cart is empty",
        timer: 1000
        }) 
}

//creacion del botón finalizar con manejo del DOM y el cálculo del total de la compra con tabla 
const botonFinalizar = document.querySelector("#finalizar")
const thead = document.querySelector("#thead")
const tbody = document.querySelector("#tbody")
const parrafoTotal = document.querySelector("#total")
botonFinalizar.onclick = ()=>{
divProducts.remove()
botonFinalizar.remove()
thead.innerHTML = `^<tr>
<th scope="col">Producto</th>
<th scope="col">Cantidad</th>
<th scope="col">Total</th>
</tr>`

let total = 0
cart.forEach(prod=>{
    total+= prod.quantity*prod.price
    tbody.innerHTML+= `
    <tr>
        <td>${prod.name}</td>
        <td>${prod.quantity}</td>
        <td>${prod.quantity*prod.price}</td>
   <tr>
  `
})
    parrafoTotal.innerText = `el total de tu compra es ${total}`
}
