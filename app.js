var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    routes = require('./routes'),

    users = [],
    rooms = ["default_room"];




//----------------------------------
//        Socket Configuration
//----------------------------------
	io.set('log level', 3);
    io.set('origins', '*:*');

//----------------------------------
//        Express Configuration
//----------------------------------
    app.set('views', __dirname + '/views');
    app.set('view engine', "jade");
    app.engine('jade', require('jade').__express);
    app.use(express.static(__dirname + '/public'));
    app.use(express.json());
    app.use(express.urlencoded());

        // Add headers
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        next();
    });


//----------------------------------
//        Routing
//----------------------------------
    app.get("/", routes.index);

//----------------------------------
//        Socket Handler
//----------------------------------
    io.sockets.on('connection', function (socket) {

        socket.join('default_room');
        socket.x = 0;
        socket.y = 0;
        socket.room = 'default_room';
        socket.broadcast.to(socket.room).emit('createPlayer', createPlayer(socket));

        socket.on('switchRoom', function(newRoom) 
        {
            leaveRoom(socket);
            joinRoom(socket, newRoom);
        });

        socket.on('disconnect', function() 
        {
            leaveRoom(socket);
        });

        socket.on('sendchat', function(message) 
        {
            io.sockets.in(socket.room).emit('updatechat', socket.id, message);
        });
    });

//----------------------------------
//        Socket Handlers
//----------------------------------

function createPlayer(socket) 
{
    return 

}

function joinRoom(socket, newRoom)
{
    socket.room = newRoom;
    socket.join(socket.room);
    socket.broadcast.to(socket.room).emit('createPlayer',
    { 
        id: socket.id,
        x: socket.x,
        y: socket.y
    });
}

function leaveRoom(socket)
{
    socket.broadcast.to(socket.room).emit('destroyPlayer', socket.id);
    socket.leave(socket.room);
}