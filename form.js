const nombre = document.getElementById("name");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const infoServicio = document.getElementById("dropdown");
const formulario = document.getElementById('survey-form');


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
        title:`Solicito informacion para "${infoServicio.value}"`,
        text:`En pocos momentos nos pondremos en contacto a: ${email.value}`,
        icon: "info",
        timer: 4000
    })
    
})