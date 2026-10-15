const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const PORT = 3378;
const app = express();
let usuarios = {};
app.use(express.static('../public'));
app.use(express.static('node_modules/sweetalert2/dist'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("Usuario conectado");

    


socket.on('envio:nombre', nombre => {
    if (nombre === null || nombre.trim().length < 3 || Object.values(usuarios).includes(nombre.trim())) {
        socket.emit("nombre:error", nombre);
    } else {
        usuarios[socket.id] = nombre.trim();
        socket.emit("nombre:ok", nombre.trim());
    }
});

socket.on('envio:canva', datosUsuario => {
    if (usuarios[socket.id]) {
        io.emit('envio:canva', datosUsuario);
    }
});




socket.on('disconnect', () => {
    const nombre = usuarios[socket.id];
    delete usuarios[socket.id];

    if (nombre) {
        io.emit('usuario:desconectado', nombre);
    }
    console.log("Usuario desconectado");
});



    
});

server.on('error', (error) => {
    console.log("Error de conexión:", error);
});

server.listen(PORT, () => {
    console.log(`Servidor en marcha en el puerto ${PORT}`);
});