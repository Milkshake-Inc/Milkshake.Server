(function () { "use strict";
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	__class__: EReg
}
var IMap = function() { }
IMap.__name__ = true;
var MilkshakeServer = function() {
	this.app = new (Express__7||require("express"))();
	this.configureExpress(this.app);
	new Router(this.app);
	var server = (Http__21||require("http")).createServer(this.app);
	server.listen(3000);
	js.Node.console.log("Express loaded");
	this.socketServer = new SocketServer(server);
};
MilkshakeServer.__name__ = true;
MilkshakeServer.main = function() {
	new MilkshakeServer();
}
MilkshakeServer.prototype = {
	configureExpress: function(app) {
		app["use"](new (CookieParser__10||require("connect").cookieParser)("milkshake"));
		app["use"](new (Session__1||require("connect").session)({ secret : "milkshake"}));
		app.set("views",js.Node.__dirname + "/views");
		app["use"](new (Static__9||require("connect").static)(js.Node.__dirname + "/public"));
	}
	,__class__: MilkshakeServer
}
var Router = function(app) {
};
Router.__name__ = true;
Router.prototype = {
	__class__: Router
}
var SocketServer = function(server) {
	var io = (SocketIo__0||require("socket.io")).listen(server);
	io.sockets.on("connection",$bind(this,this.onConnection));
};
SocketServer.__name__ = true;
SocketServer.prototype = {
	onConnection: function(socket) {
		var user1 = new user.User();
		this.users.set(user1.id,user1);
		socket.emit("Welcome",user1);
		js.Node.console.log("socket connected");
	}
	,__class__: SocketServer
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	__class__: StringBuf
}
var haxe = {}
haxe.ds = {}
haxe.ds.StringMap = function() { }
haxe.ds.StringMap.__name__ = true;
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Node = function() { }
js.Node.__name__ = true;
js.npm = {}
js.npm.connect = {}
js.npm.connect.support = {}
js.npm.connect.support._Middleware = {}
js.npm.connect.support._Middleware.Middleware_Impl_ = function() { }
js.npm.connect.support._Middleware.Middleware_Impl_.__name__ = true;
js.npm.connect.support._Middleware.Middleware_Impl_.fromMiddleware = function(middleware) {
	return middleware;
}
js.npm.connect.support._Middleware.Middleware_Impl_.fromAsync = function(method) {
	return method;
}
js.npm.connect.support._Middleware.Middleware_Impl_.fromSync = function(method) {
	return method;
}
js.npm.mongoose = {}
js.npm.mongoose.Promise = function() { }
js.npm.mongoose.Promise.__name__ = true;
js.support = {}
js.support._RegExp = {}
js.support._RegExp.RegExp_Impl_ = function() { }
js.support._RegExp.RegExp_Impl_.__name__ = true;
js.support._RegExp.RegExp_Impl_.fromEReg = function(r) {
	return r.r;
}
js.support._RegExp.RegExp_Impl_.toEReg = function(r) {
	return new EReg(r.source,(r.ignoreCase?"i":"") + (r.global?"g":"") + (r.multiline?"m":""));
}
var user = {}
user.User = function() {
	this.id = user.Uuid.uuid();
};
user.User.__name__ = true;
user.User.prototype = {
	__class__: user.User
}
user.Uuid = function() { }
user.Uuid.__name__ = true;
user.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
user.Uuid.uuid = function() {
	return user.Uuid.random(8) + "-" + user.Uuid.random(4) + "-" + user.Uuid.random(4) + "-" + user.Uuid.random(4) + "-" + user.Uuid.random(12);
}
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var Crypto__23 = require("crypto");
var EventEmitter__3 = require("events").EventEmitter;
var Http__21 = require("http");
var Net__26 = require("net");
var Url__24 = require("url");
var Agent__22 = require("http").Agent;
var ClientRequest__8 = require("http").ClientRequest;
var Server__20 = require("http").Server;
var Writable__4 = require("stream").Writable;
var ServerResponse__5 = require("http").ServerResponse;
var Server__27 = require("net").Server;
var Socket__25 = require("net").Socket;
var Readable__16 = require("stream").Readable;
var Connect__2 = require("connect");
var Express__7 = require("express");
var Jade__6 = require("jade");
var Mongoose__11 = require("mongoose");
(Mongoose__11||require("mongoose")).mongoose = (Mongoose__11||require("mongoose"));
var SocketIo__0 = require("socket.io");
var CookieParser__10 = require("connect").cookieParser;
var Session__1 = require("connect").session;
var Static__9 = require("connect")["static"];
var Connection__19 = require("mongoose").Connection;
var Document__17 = require("mongoose").Document;
var Model__18 = require("mongoose").Model;
var Mongoose__12 = require("mongoose").Mongoose;
var Schema__13 = require("mongoose").Schema;
var SchemaType__15 = require("mongoose").SchemaType;
var VirtualType__14 = require("mongoose").VirtualType;
js.Node.console = console;
js.Node.process = process;
js.Node.module = module;
js.Node.exports = exports;
js.Node.__filename = __filename;
js.Node.__dirname = __dirname;
js.Node.require = require;
js.Node.setTimeout = setTimeout;
js.Node.setInterval = setInterval;
js.Node.clearTimeout = clearTimeout;
js.Node.clearInterval = clearInterval;
user.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
MilkshakeServer.main();
})();
