
class UserList {
    constructor() {
        this.users = {}
        this.userId = 0;
        this.admins = ['rob', 'joe'];
    }

    add(user) {
        user.id = this.userId;
        if (this.admins.indexOf(user.username.toLowerCase()) >=0) {
            user.isAdmin = true;
        } else {
            user.isAdmin = false;
        }
        this.users[user.id] = user;
        this.userId++;
        return user;
    };

    remove(user) {
        delete this.users[user.id]
    }

    list() {
        let userArray = Object.keys(this.users).map((userId) => {
            return this.users[userId];
        })
        return userArray;
    }
}

class Trivia {
    constructor(socketServer, connectionName) {
        this.socketServer = socketServer;
        this.connectionName = connectionName;
        this.users = new UserList();
        this.sockets = {};
    }

    onConnect(socket) {
        console.log("New socket connection to " + this.connectionName);
        socket.on('signin', this.signIn.bind(this, socket));
        socket.on('disconnect', this.signOut.bind(this, socket));
    }

    signIn(socket, user) {
        let newUser = this.users.add(user);
        this.sockets[socket.id] = newUser;
        this.socketServer.emit('userlist', this.users.list())
        if (newUser.isAdmin) {
            this.adminSocket = socket;
            this.adminSocket.on('play', this.playGame);
        }
    }

    signOut(socket) {
        let user = this.sockets[socket.id];
        this.users.remove(user);
        delete this.sockets[socket.id]
        this.socketServer.emit('userlist', this.users.list());
    }

    playGame() {
        this.socketServer.emit('play');
        this.adminSocket.on('new-question', sendQuestion);
    }

    sendQuestion () {
        this.socketServer.emit('question', nextQuestion());
        this.socketServer.on('answer', this.checkAnswer);
        setTimeout(()=>{
            debugger
        })
    }

    nextQuestion () {
        this.currentQuestion++
        return this.questions[currentQuestion];
    }

    checkAnswer (socket, answer) {
        debugger
    }
}

module.exports = Trivia;
