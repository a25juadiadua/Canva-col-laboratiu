const socket = io();

let nombre = prompt('Introduce tu nombre');

while (nombre === null || nombre.length < 3 ){

    nombre = prompt('El nom ha de tenir minim 3 caracters');
}
console.log("Nombre de usuario" , nombre);

socket.emit('envio:nombre', nombre);

// -------------------------- CANVAS -----------------------
let posicionX = 0;
let posicionY = 0;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



//QUE SE MUEVA CON EL RATON
canvas.addEventListener('mousemove', (e) => {
    posicionX = e.offsetX;
    posicionY = e.offsetY;

    let text = ctx.measureText(nombre).width;

    ctx.clearRect(0, 0, 1500, 600);
    ctx.beginPath();
    ctx.arc(posicionX, posicionY,10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeRect(posicionX, posicionY + 20,  text + 10 , 15)
    ctx.fillText(nombre, posicionX + 5, posicionY + 30);

    socket.emit('envio:canva', ctx);
});