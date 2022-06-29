 class Servicio{
    constructor(id, nombre, descripcion, precio, img){
        this.id = Number(id),
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.precio = precio,
        this.img = img
    }
}

const arrayServicios = [];
let carritoServicios = [];

arrayServicios.push(new Servicio(1,"Digital Transforme", "Construccion de negocios digitales, agiles, dinamicos y rentables.", 400,'imagenes/digitaltransform.png'));
arrayServicios.push(new Servicio(2, "Digital Strategy", "Potencie exponencialmente su negocio y obtenga resultados concretos.", 400, 'imagenes/digitalcomunication.png'));
arrayServicios.push(new Servicio(3, "Business Model", "Descubrimiento de oportunidades y diseño de una estrategia integral de negocio." , 300 , 'imagenes/bg_quienes.png'));
arrayServicios.push(new Servicio(4, "Customer experience", "Fidelización del cliente a través de experiencias hechas a medida." , 200 , 'imagenes/ecommerce_1.png'));

const contenedorServicios = document.getElementById('contenedor-servicios');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonTerminar = document.getElementById('terminar');
const finCompra = document.getElementById('fin-compra');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioFinal = document.getElementById('precio-final');

const buscador = document.getElementById('search');



buscador.addEventListener('input', (e) => {
    let busqueda= arrayServicios.filter(elem => elem.nombre.toLowerCase().includes(e.target.value.toLowerCase()))
    mostrar(busqueda)
})

const ordenarMenorMayor = () => {
    arrayServicios.sort((a,b) => a.precio - b.precio);
    mostrar(arrayServicios);
}

// INICIO DEL Ecommerce
function mostrar(arr){
    contenedorServicios .innerHTML = ""
    arr.forEach(element => {
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


function mostrarCarrito (servicioAgregar){
    let div = document.createElement('div')
    div.classList.add('servicio-carrito')
    div.innerHTML= `<p>${servicioAgregar.nombre}</p>
                    <p>valor: $${servicioAgregar.precio}</p>
                    <button id="eliminar${servicioAgregar.id}" class="boton-eliminar">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${servicioAgregar.id}`)
    btnEliminar.addEventListener('click', () => {
        Swal.fire({
            title: "¿Estas seguro de eliminar este servicio?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: "Si"
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

function actualizar(){
    contadorCarrito.innerHTML = carritoServicios.length
    precioFinal.innerHTML = carritoServicios.reduce((acc,el) => acc + el.precio, 0)
}

function vaciarCarrito(){
    carritoServicios = []
    contenedorCarrito.innerHTML = ""
    actualizar()  
}

finCompra.addEventListener('click', vaciarCarrito);

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

ordenarMenorMayor(); 
recuperacion();