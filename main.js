

import { getData } from "./getData.js";



let carritoServicios = [];
const arrayServicios = await getData();



const contenedorServicios = document.getElementById('contenedor-servicios');
const contenedorCarrito = document.getElementById('carrito-contenedor');


const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioFinal = document.getElementById('precio-final');

const buscador = document.getElementById('search');


// -----------Funcion de buscador--------------//

buscador.addEventListener('input', (e) => {
    let busqueda= arrayServicios.filter(elem => elem.nombre.toLowerCase().includes(e.target.value.toLowerCase()));
    mostrar(busqueda);
})

// -----------Ordenamos segundo el precio del producto/servicio--------------//

const ordenarMenorMayor =  () => {
    arrayServicios.sort((a,b) => a.precio - b.precio);
    mostrar(arrayServicios);
} 

// INICIO DEL Ecommerce

// -----------Funcion para mostrar los servicios--------------//

async function mostrar(array){
    contenedorServicios .innerHTML = ""
    array.forEach(element => {
        let div = document.createElement('div')
        div.className = 'servicio'
        div.innerHTML = `<div class="card">
                            <div class="card-img">
                                <img src="${element.img}">  
                            </div>
                            <div class="contenido">
                                <span class="card-title">${element.nombre}</span>
                                <a id="boton${element.id}" class="btn-añadir"><i class="fa-solid fa-cart-plus"></i></a>
                                <p class= "descrip">${element.descripcion}</p>
                                <p>$${element.precio}</p>
                            </div>`

        contenedorServicios.appendChild(div)

        let btnAgregar = document.getElementById(`boton${element.id}`)
        btnAgregar.addEventListener('click', () => {
            agregarAlCarrito(element.id)
        })
    });
}

// -----------Funcion para agregar al carrito--------------//

 function agregarAlCarrito (id){
    let servicioAgregar = arrayServicios.find(item => item.id === id)
    let existe = carritoServicios.find(item => item.id === id)
    if(!existe){
        carritoServicios.push(servicioAgregar)
        mostrarCarrito(servicioAgregar)
        Swal.fire({
            title: "Genial",
            text: "El servicio ya a sido añadido al carrito",
            icon: "success",
            timer: 3000
        })
    } else{
        Swal.fire({
            title: "Error",
            text: "Ya a seleccionado ese servicio.",
            icon: "error",
            timer: 3000
        })
    }
    actualizar()

    localStorage.setItem('carrito', JSON.stringify(carritoServicios))
}

// -----------Funcion para mostrar el carrito--------------//

function mostrarCarrito (servicioAgregar){
    let div = document.createElement('div')
    div.classList.add('servicio-carrito')
    div.innerHTML= `<p>${servicioAgregar.nombre}</p>
                    <p>valor: $${servicioAgregar.precio}</p>
                    <button id="eliminar${servicioAgregar.id}" class="boton-eliminar">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>`
    contenedorCarrito.appendChild(div)
    //------Añadimos dentro la opcion para eliminar un producto-------//
    let btnEliminar = document.getElementById(`eliminar${servicioAgregar.id}`)
    btnEliminar.addEventListener('click', () => {
        Swal.fire({
            title: "¿Estas seguro de eliminar este servicio?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "Si",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if(result.isConfirmed){
                btnEliminar.parentElement.remove()
                carritoServicios = carritoServicios.filter(ele => ele.id !== servicioAgregar.id)
                actualizar()
                Swal.fire({
                    title: "Eliminado",
                    icon: "success",
                    text: "Este servicio ha sido eliminado"
                })
            }
            localStorage.setItem('carrito', JSON.stringify(carritoServicios))
        })
        
        
    })
}

// -----------Actualizamos el carrito y su contador--------------//

function actualizar(){
    contadorCarrito.innerHTML = carritoServicios.length
    precioFinal.innerHTML = carritoServicios.reduce((acc,el) => acc + el.precio, 0)
}

// -----------Funcion fin de compra y limpiamos el carrito--------------//

function finalizarCompra(){
    let hayServicio = carritoServicios.some((el) => el)
    if (!hayServicio){
        Swal.fire({
            title: "Lo siento",
            text: "No ha seleccionado ninguno de nuestros servicios",
            icon: "warning",
            timer: 3000
        })
    } else {
        carritoServicios = []
        contenedorCarrito.innerHTML = ""
        actualizar()
        Swal.fire({
            title: "Genial",
            text: "Gracias por su compra",
            icon: "success",
            timer: 3000
        })
    }
    localStorage.setItem('carrito', JSON.stringify(carritoServicios))  
}

finCompra.addEventListener('click', finalizarCompra);

// -----------Funcion para recuperar el contenido del localStorage--------------//

function recuperacion(){
    let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
    if(recuperarLS){
         recuperarLS.forEach(el =>{
             mostrarCarrito(el)
             carritoServicios.push(el)
             actualizar()
         })
    }
}


// LLamada a la funcion

ordenarMenorMayor();
recuperacion();