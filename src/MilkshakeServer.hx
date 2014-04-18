import js.Node;
import js.node.Http;
import js.node.http.Server;
import js.npm.connect.session.Session;
import js.npm.Mongoose;
import js.npm.connect.CookieParser;
import js.npm.connect.Static;
import js.npm.Express;
import js.npm.express.*;
import js.npm.Jade;
import js.Node.*;
using js.npm.connect.Session;

/**
 * ...
 * @author Milkshake-Inc
 */

class MilkshakeServer 
{
	var app:Express;

	var socketServer:SocketServer;
	
	public function new():Void 
	{
		//Mongoose.mongoose.connect( process.env.MONGOHQ_URL );
		app = new Express();
		
		configureExpress(app);
		
		new Router(app);
		
		var server:Server = Http.createServer(app);
		server.listen(3000);

		console.log("Express loaded");

		socketServer = new SocketServer(server);
	}
	
	function configureExpress(app:Express) 
	{
		app.use( new CookieParser('milkshake') );
		app.use( new Session( { secret : 'milkshake' } ) );
		app.set("views" , __dirname + "/views" );
		app.use( new Static( __dirname + "/public" ) );
	}

	static function main()
	{
		new MilkshakeServer();
	}
	
}