var chatForm = document.getElementById('chat-entry')
var chatBox = document.querySelector('.message-container')

const socket = io();

socket.on('data', data => {
    console.log(data)
    showMessage(data)
    // chatBox.scrollTop = chatBox.scrollHeight
})


function showMessage(string) {
    var messageContainer = document.createElement('div')
    messageContainer.classList.add('message')
    messageContainer.innerHTML = `<b><p>Username <span>time pm</span></p></b>
    <p class="msg">
        ${string}
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

