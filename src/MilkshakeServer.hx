import js.npm.Mongoose;
import js.npm.socketio.Manager;
import js.npm.connect.CookieParser;
import js.npm.connect.Static;
import js.npm.Express;
import js.npm.express.*;
import js.npm.Jade;
import js.Node.*;
import js.node.*;
using js.npm.connect.Session;

/**
 * ...
 * @author Milkshake-Inc
 */

class MilkshakeServer 
{
	var app:Express;
	var io:Manager;
	
	var socketServer:SocketServer;
	
	public function new():Void 
	{
		Mongoose.mongoose.connect( process.env.MONGOHQ_URL );
		app = new Express();
		
		configureExpress(app);
		
		new Router(app);
		
		var server = Http.createServer(app);
		server.listen(3000);
		
		new SocketServer();
	}
	
	function configureExpress(app:Express) 
	{
		app.use( new CookieParser('milkshake') );
		app.use( new Session( { secret : 'milkshake' } ) );
		app.set("views" , __dirname + "/views" );
		app.set("view engine" , "jade" );
		app.use( new Static( __dirname + "/public" ) );
	}

	static function main()
	{
		new MilkshakeServer();
	}
	
}