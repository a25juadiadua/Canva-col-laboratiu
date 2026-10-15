const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const PORT = 3378;
const app = express();

app.use(express.static('../public'));
app.use(express.static('node_modules/sweetalert2/dist'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("Usuario conectado");

    socket.on('envio:nombre', nombre => {
        console.log(`Un usuario se ha puesto de nombre: ${nombre}`);
    });

    socket.on('envio:canva', datosUsuario => {
        io.emit('envio:canva', datosUsuario);
    });
});

server.on('error', (error) => {
    console.log("Error de conexión:", error);
});

server.listen(PORT, () => {
    console.log(`Servidor en marcha en el puerto ${PORT}`);
});