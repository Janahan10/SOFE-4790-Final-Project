var users = []

function joinChatroom(id, username, chatroom) {
    var newUser = {id, username, chatroom}
    users.push(newUser)
    console.log(users)
}

function getUser(id) {
    return users.find(curUser => curUser.id === id)
}

function removeUser(id) {
    var loc = users.findIndex(u => users.id === id)
    users.splice(loc, 1)[0]
}

module.exports = {joinChatroom, getUser, removeUser}