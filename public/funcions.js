const socket = io();
let posicionX = 0;
let posicionY = 0;
let nombre = prompt('Introduce tu nombre');
let color = `hsl(${Math.random() * 360}, 70%, 50%)`;




while (nombre === null || nombre.length < 3 ){

    nombre = prompt('El nom ha de tenir minim 3 caracters');
}
console.log("Nombre de usuario" , nombre);

socket.emit('envio:nombre', nombre);

// -------------------------- CANVAS -----------------------


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let usuarios = {};


//QUE SE MUEVA CON EL RATON
canvas.addEventListener('mousemove', (e) => {
    posicionX = e.offsetX;
    posicionY = e.offsetY;
});


setInterval(() => {
    let datosUsuario = {
        nom: nombre,
        X: posicionX,
        Y: posicionY,
        color : color
    };

    usuarios[nombre] = datosUsuario;

    socket.emit('envio:canva', datosUsuario);

    dibujarUsuarios();
}, 20);


socket.on('envio:canva', datosUsuario => {
    usuarios[datosUsuario.nom] = datosUsuario;

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