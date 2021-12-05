const express = require('express')
const app = express()
const http = require('http')
const path = require('path')
const io = require('socket.io')
const _ = require('underscore')
const fs = require('fs')

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

        // var chat_data = fs.readFileSync('chat_data.json')
        // var chat_data_obj = JSON.parse(chat_data)

        client.emit('data', formatData(sysName, "welcome to chatroom!"))
        client.broadcast.to(chatroom).emit('data', formatData(sysName, `${username} has joined chatroom!`))
    })

    // client.emit('data', formatData(sysName, "welcome to chatroom!"))
    // client.broadcast.emit('data', formatData(sysName, 'New user has joined chatroom!'))
    
    client.on('disconnect', () => {
        const currentUser = getUser(client.id)
        removeUser(client.id)
        socket.to(currentUser.chatroom).emit('data', formatData(sysName, `${currentUser.username} has left chatroom`, currentUser.chatroom))
    })


    client.on('msg', (message) => {
        const currentUser = getUser(client.id)

        var chat_data = fs.readFileSync('chat_data.json')
        var chat_data_obj = JSON.parse(chat_data)
        var msgData = formatData(`${currentUser.username}`, message, currentUser.chatroom)
        chat_data_obj.push(msgData)
        fs.writeFileSync('chat_data.json', JSON.stringify(chat_data_obj), (err) =>{
            if (err) throw err;
            console.log("Message saved")
        })
        
        socket.to(currentUser.chatroom).emit('data', formatData(`${currentUser.username}`, message, currentUser.chatroom))
    })
})

if(server.listen(PORT)) {
    console.log(`server running on ${PORT}`)
}