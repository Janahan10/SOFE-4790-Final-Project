function formatData(username, message, chatroom) {
    var currentTime = new Date()
    return {
        time: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds(),
        username,
        message,
        chatroom
    }
}

module.exports = formatData