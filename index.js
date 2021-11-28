const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const io = require('socket.io')

const PORT = 5000 || process.env.PORT;

const server = http.createServer(app);
const socket = io(server);

app.use(express.static(path.join(__dirname, 'frontend')));

socket.on('connection', client => {
    console.log("new connections")

    client.emit('data', "welcome to chatroom!")
    client.broadcast.emit('data', 'New user has joined chatroom!')

    client.on('msg', (message) => {
        client.emit('data', message)
    })
})

if(server.listen(PORT)) {
    console.log(`server running on ${PORT}`)
}