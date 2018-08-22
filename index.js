const express = require('express');
const app = express();
const server = require('http').Server(app);
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blogs')(router);
const home = require('./routes/home')(router);
const bodyParser = require('body-parser');
const cors = require('cors');


const io = require('socket.io')(server);
const ClientManager = require('./routes/ClientManager');
const ChatroomManager = require('./routes/chatroomManager');
const clientManager = ClientManager();
const chatroomManager = ChatroomManager();
const makeHandlers = require('./routes/handlers');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});



app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);
app.use('/home', home);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Connection to server via io
io.on('connection', function (client) {
    const {
        handleRegister,
        handleJoin,
        handleLeave,
        handleMessage,
        handleGetChatrooms,
        handleDisconnect
    } = makeHandlers(client, clientManager, chatroomManager);
    console.log('client connected...', client.id)
    clientManager.addClient(client);
    client.on('register', handleRegister);
    client.on('join', handleJoin);
    client.on('leave', handleLeave);
    client.on('message', handleMessage);
    client.on('chatrooms', handleGetChatrooms);
    client.on('disconnect', function () {
        console.log('client disconnect...', client.id);
        handleDisconnect()
    });

    client.on('error', function (err) {
        console.log('received error from client:', client.id);
        console.log(err)
    })
});

server.listen(8080, () => {
    console.log('Listening on port 8080');
});