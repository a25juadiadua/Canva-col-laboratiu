const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const PORT = 3378;
const app = express();

app.use(express.static('../public'));

const server = createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
    console.log("Conexión Exitosa!!");

    socket.on('envio:nombre', nombre => {
        console.log(`Un usuario se ha puesto de nombre: ${nombre}`);
    });
})

server.listen(3378, () => {
    console.log(`Servidor en marcha en el puerto ${PORT}`);
})