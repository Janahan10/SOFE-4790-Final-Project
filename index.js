const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const io = require('socket.io')

const formatData = require('./data')
const {joinChatroom, getUser, removeUser} = require('./user')

const PORT = 5000 || process.env.PORT
const server = http.createServer(app)
const socket = io(server)
const sysName = "System"

app.use(express.static(path.join(__dirname, 'frontend')))

socket.on('connection', client => {
    console.log("new connections")

    client.on('join', ({username, chatroom}) => {
        joinChatroom(client.id, username, chatroom)
        client.join(chatroom)

        client.emit('data', formatData(sysName, "welcome to chatroom!"))
        client.broadcast.to(chatroom).emit('data', formatData(sysName, `${username} has joined chatroom!`))
    })

    // client.emit('data', formatData(sysName, "welcome to chatroom!"))
    // client.broadcast.emit('data', formatData(sysName, 'New user has joined chatroom!'))
    
    client.on('disconnect', () => {
        const currentUser = getUser(client.id)
        removeUser(client.id)
        socket.to(currentUser.chatroom).emit('data', formatData(sysName, `${currentUser.username} has left chatroom`))
    })


    client.on('msg', (message) => {
        const currentUser = getUser(client.id)
        socket.to(currentUser.chatroom).emit('data', formatData(`${currentUser.username}`, message))
    })
})

if(server.listen(PORT)) {
    console.log(`server running on ${PORT}`)
}