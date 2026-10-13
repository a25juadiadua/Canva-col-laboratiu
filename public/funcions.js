const socket = io();

let nombre = prompt('Introduce tu nombre');

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

    ctx.clearRect(0, 0, 1000, 600);
    ctx.beginPath();
    ctx.arc(posicionX, posicionY,10, 0, Math.PI * 2);
    ctx.fill();
    console.log(`x: ${posicionX}  y: ${posicionY}`);

});