var chatForm = document.getElementById('chat-entry')
var chatBox = document.querySelector('.message-container')

const socket = io();

const queryString = window.location.search
const params = new URLSearchParams(queryString)
const username = params.get('username')
const chatroom = params.get('chatroom')

socket.emit('join', {username, chatroom})

socket.on('data', data => {
    console.log(data)
    showMessage(data)
    // chatBox.scrollTop = chatBox.scrollHeight
})

socket.on('chat_history', history => {
    console.log(history)
    for (var msg of history){
        showMessage(msg)
    }
})

function showMessage(data) {
    var messageContainer = document.createElement('div')
    messageContainer.classList.add('message')
    messageContainer.innerHTML = `<p><b>${data.username}</b> <span>${data.time}</span></p>
    <p class="msg">
        ${data.message}
    </p>`
    document.querySelector('.messages-container').appendChild(messageContainer)

}

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    var message = event.target.elements.chat.value
    socket.emit('msg', message)

    event.target.elements.chat.value = '';
    event.target.elements.chat.focus();
})

document.getElementById('leave').addEventListener('click', () =>{
    var leaveConfirmation = confirm('Do you want to leave the chatroom?');

    if (leaveConfirmation == true) {
        window.location = './index.html'
    }
})

