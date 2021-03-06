var express = require('express'),
    app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    routes = require('./routes'),

    updateSpeed = 128,

    users = [],
    rooms = [];

    rooms["Default Room"] =
        {
            currentPlayers: 0,
            maxPlayers: 2,
            password: ""
        }

    rooms["Default Room 2"] =
        {
            currentPlayers: 0,
            maxPlayers: 4,
            password: ""
        }




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

        //joinRoom(socket, "Default Room 2", "");
        socket.position = { x: 0, y: 0 };
        socket.velocity = { x: 0, y: 0 };
        socket.rotation = 0;

        socket.on('createRoom', function(newRoom) 
        {
            if(rooms.indexOf(newRoom.name) == -1)
            {
                rooms[newRoom.name] = 
                {
                    maxPlayers: newRoom.maxPlayers,
                    password: newRoom.password,
                    currentPlayers: 0
                }
            }

            joinRoom(socket, newRoom.name, newRoom.password);
        });

        socket.on('getSocketID', function()
        {
            socket.emit('socketID', { socketID: socket.id });
        });

        socket.on('getRooms', function(newRoom) 
        {
            socket.emit('roomList', {rooms: getRoomList()});
        });

        socket.on('joinRoom', function(newRoom) 
        {
            if(!joinRoom(socket, newRoom.name, newRoom.password)) socket.emit('failedJoiningRoom');
        });

        socket.on('leaveRoom', function(newRoom) 
        {
            leaveRoom(socket);
        });

        socket.on('disconnect', function() 
        {
            if(socket.room != null) leaveRoom(socket);
        });

        socket.on('updatePosition', function(data) 
        {
            socket.position.x = data.position.x;
            socket.position.y = data.position.y;
            socket.velocity.x = data.velocity.x;
            socket.velocity.y = data.velocity.y;

            socket.rotation = data.rotation;
        });
    });

//----------------------------------
//        Functions
//----------------------------------

    var getRoomList = function()
    {
        var rList = [];
        for (var key in rooms) 
        {
            rList.push({
                name: key,
                currentPlayers: rooms[key]["currentPlayers"],
                maxPlayers: rooms[key]["maxPlayers"]
            });
        }
        return rList;
    }

    var joinRoom = function(socket, newRoom, password)
    {
        if(rooms[newRoom].password != password 
            || rooms[newRoom].maxPlayers - rooms[newRoom].currentPlayers <= 0) return false;

        socket.room = newRoom;
        socket.join(socket.room);
        rooms[socket.room].currentPlayers += 1;
        socket.broadcast.to(socket.room).emit('playerJoinedRoom', {id: socket.id});
        socket.emit('joinedRoom', {
                name: socket.room,
                currentPlayers: rooms[socket.room]["currentPlayers"],
                maxPlayers: rooms[socket.room]["maxPlayers"]
            });
        socket.broadcast.emit("refreshRoomList",  "test");

        if(rooms[socket.room].maxPlayers - rooms[socket.room].currentPlayers <= 0)
        {
            startGame(socket.room);
        }

        return true;
    }

    var leaveRoom = function(socket)
    {
        socket.broadcast.to(socket.room).emit('playerLeftRoom', {id: socket.id});
        socket.emit('leftRoom');
        socket.leave(socket.room);
        rooms[socket.room].currentPlayers -= 1;
        socket.room = null;
        socket.broadcast.emit("refreshRoomList");

        //reset x,y
        socket.position.x = socket.position.y = socket.velocity.x = socket.velocity.y = socket.rotation = 0;
    }

    var startGame = function(roomName)
    {
        io.sockets.in(roomName).emit('startGame');
        update(roomName);
        rooms[roomName].interval = setInterval(function() { update(roomName); }, 1000 / updateSpeed);
    }

    var endGame = function(roomName)
    {
        io.sockets.in(roomName).emit('endGame');
        clearInterval(rooms[roomName].interval);
    }

    var update = function(roomName)
    {
        io.sockets.in(roomName).emit('gameUpdate', { players: getPlayers() });
    }

    var getPlayers = function(roomName)
    {
        var players = [];
        var playersInRoom = io.sockets.clients(roomName);
        for (var p in playersInRoom) 
        {
            players.push({
                id: playersInRoom[p].id,
                rotation: playersInRoom[p].rotation,
                position:
                {
                    x: playersInRoom[p].position.x,
                    y: playersInRoom[p].position.y
                },
                velocity:
                {
                    x: playersInRoom[p].velocity.x,
                    y: playersInRoom[p].velocity.y
                }
            });
        }
        return players;
    }