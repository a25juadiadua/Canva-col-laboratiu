const socket = io();
let posicionX = 0;
let posicionY = 0;
let nombre = "";
let nombreValido = false;
let color = `hsl(${Math.random() * 360}, 70%, 50%)`;
let usuarios = {};

function pedirNombre() {
    Swal.fire({
        title: "Benvingut!",
        text: "Introdueix el teu nom per entrar",
        input: "text",
        inputPlaceholder: "Mínim 3 caràcters",
        confirmButtonText: "Entrar",
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(resultado => {
        socket.emit('envio:nombre', resultado.value);
    });
}

socket.on("nombre:ok", nombreOk => {
    nombre = nombreOk;
    nombreValido = true;
});

socket.on("nombre:error", () => {
    Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Nom no vàlid o ja en ús (mínim 3 caràcters)",
        confirmButtonText: "Tornar-ho a provar"
    }).then(pedirNombre);
});

pedirNombre();

// -------------------------- CANVAS -----------------------


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function ajustarCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

ajustarCanvas();
window.addEventListener("resize", ajustarCanvas);


//QUE SE MUEVA CON EL RATON
canvas.addEventListener('mousemove', (e) => {
    posicionX = e.offsetX;
    posicionY = e.offsetY;
});


setInterval(() => {
    if (nombreValido) {
        let datosUsuario = {
            nom: nombre,
            X: posicionX,
            Y: posicionY,
            color: color
        };

        usuarios[nombre] = datosUsuario;
        socket.emit('envio:canva', datosUsuario);
    }

    dibujarUsuarios();
}, 20);


socket.on('envio:canva', datosUsuario => {
    usuarios[datosUsuario.nom] = datosUsuario;

    dibujarUsuarios();
});

socket.on('usuario:desconectado', nom => {
    delete usuarios[nom];
    dibujarUsuarios();
});


function dibujarUsuarios() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let usuario in usuarios) {
    let datosUsuario = usuarios[usuario];
    let text = ctx.measureText(datosUsuario.nom).width;

    ctx.fillStyle = datosUsuario.color;
    ctx.strokeStyle = datosUsuario.color;

    ctx.beginPath();
    ctx.arc(datosUsuario.X, datosUsuario.Y, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeRect(datosUsuario.X, datosUsuario.Y + 20, text + 10, 15);
    ctx.fillText(datosUsuario.nom, datosUsuario.X + 5, datosUsuario.Y + 30);
}
}