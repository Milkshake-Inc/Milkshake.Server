package ;

import user.User;
import js.npm.socketio.Listener;
import js.npm.socketio.Manager;
import js.node.http.Server;
import js.npm.SocketIo;
import js.npm.socketio.Namespace;
import js.Node.console;

class SocketServer
{
	public var users(default, null):Map<String, User>;

	public function new(server:Server):Void
	{
		var io:Manager = SocketIo.listen(server);
		
		io.sockets.on("connection", onConnection);
	}
	
	function onConnection(socket:Namespace) 
	{
		var user = new User();
		users.set(user.id, user);
		socket.emit("Welcome", user);
		console.log("socket connected");
	}
}