function formatData(username, message) {
    var currentTime = new Date()
    return {
        time: currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds(),
        username,
        message,
    }
}

module.exports = formatData