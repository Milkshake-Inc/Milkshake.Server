(function () { "use strict";
var $estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var IMap = function() { }
IMap.__name__ = ["IMap"];
var Playground = function() {
	Playground.boot();
};
$hxExpose(Playground, "Playground");
Playground.__name__ = ["Playground"];
Playground.main = function() {
}
Playground.boot = function() {
	new PlaygroundGame().boot(1280,720);
}
Playground.prototype = {
	__class__: Playground
}
var milkshake = {}
milkshake.IGame = function() { }
milkshake.IGame.__name__ = ["milkshake","IGame"];
milkshake.IGame.prototype = {
	__class__: milkshake.IGame
}
milkshake.Milkshake = function() {
};
milkshake.Milkshake.__name__ = ["milkshake","Milkshake"];
milkshake.Milkshake.__interfaces__ = [milkshake.IGame];
milkshake.Milkshake.prototype = {
	update: function(delta) {
	}
	,setStage: function(stage) {
		this.stage = stage;
	}
	,boot: function(width,height) {
		this.core = new milkshake.pixi.PixiGame();
		this.core.create(this,width,height,16773120);
	}
	,__class__: milkshake.Milkshake
}
milkshake.game = {}
milkshake.game.MilkshakeGame = function() {
	milkshake.Milkshake.call(this);
	this.sceneManager = new milkshake.game.scene.SceneManager();
};
milkshake.game.MilkshakeGame.__name__ = ["milkshake","game","MilkshakeGame"];
milkshake.game.MilkshakeGame.__super__ = milkshake.Milkshake;
milkshake.game.MilkshakeGame.prototype = $extend(milkshake.Milkshake.prototype,{
	update: function(delta) {
		milkshake.Milkshake.prototype.update.call(this,delta);
		this.sceneManager.update(delta);
	}
	,setStage: function(stage) {
		milkshake.Milkshake.prototype.setStage.call(this,stage);
		stage.addChild(this.sceneManager.get_currentScene().displayObject);
	}
	,__class__: milkshake.game.MilkshakeGame
});
var PlaygroundGame = function() {
	milkshake.game.MilkshakeGame.call(this);
	this.sceneManager = new minigame.MinigameManager();
	this.networkManager = new network.NetworkManager();
};
PlaygroundGame.__name__ = ["PlaygroundGame"];
PlaygroundGame.__super__ = milkshake.game.MilkshakeGame;
PlaygroundGame.prototype = $extend(milkshake.game.MilkshakeGame.prototype,{
	update: function(delta) {
		milkshake.game.MilkshakeGame.prototype.update.call(this,delta);
	}
	,__class__: PlaygroundGame
});
var Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
var Std = function() { }
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	__class__: StringBuf
}
var Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
var haxe = {}
haxe.StackItem = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
haxe.TypeTools = function() { }
haxe.TypeTools.__name__ = ["haxe","TypeTools"];
haxe.TypeTools.getClassNames = function(value) {
	var result = new List();
	var valueClass = js.Boot.__instanceof(value,Class)?value:Type.getClass(value);
	while(null != valueClass) {
		result.add(Type.getClassName(valueClass));
		valueClass = Type.getSuperClass(valueClass);
	}
	return result;
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.exception = {}
haxe.exception.Exception = function(message,innerException,numberOfStackTraceShifts) {
	this.message = null == message?"Unknown exception":message;
	this.innerException = innerException;
	this.generateStackTrace(numberOfStackTraceShifts);
	this.stackTrace = this.stackTraceArray;
};
haxe.exception.Exception.__name__ = ["haxe","exception","Exception"];
haxe.exception.Exception.prototype = {
	toString: function() {
		return this.message + haxe.CallStack.toString(this.stackTraceArray);
	}
	,get_baseException: function() {
		var result = this;
		while(null != result.innerException) result = result.innerException;
		return result;
	}
	,generateStackTrace: function(numberOfStackTraceShifts) {
		this.stackTraceArray = haxe.CallStack.callStack().slice(numberOfStackTraceShifts + 1);
		var exceptionClass = Type.getClass(this);
		while(haxe.exception.Exception != exceptionClass) {
			this.stackTraceArray.shift();
			exceptionClass = Type.getSuperClass(exceptionClass);
		}
	}
	,__class__: haxe.exception.Exception
}
haxe.exception.ArgumentNullException = function(argumentName,numberOfStackTraceShifts) {
	haxe.exception.Exception.call(this,"Argument " + argumentName + " must be non-null",null,numberOfStackTraceShifts);
};
haxe.exception.ArgumentNullException.__name__ = ["haxe","exception","ArgumentNullException"];
haxe.exception.ArgumentNullException.__super__ = haxe.exception.Exception;
haxe.exception.ArgumentNullException.prototype = $extend(haxe.exception.Exception.prototype,{
	__class__: haxe.exception.ArgumentNullException
});
var hsl = {}
hsl.haxe = {}
hsl.haxe.Bond = function() {
	this.halted = false;
};
hsl.haxe.Bond.__name__ = ["hsl","haxe","Bond"];
hsl.haxe.Bond.prototype = {
	resume: function() {
		this.halted = false;
	}
	,halt: function() {
		this.halted = true;
	}
	,destroyOnUse: function() {
		this.willDestroyOnUse = true;
		return this;
	}
	,destroy: function() {
	}
	,__class__: hsl.haxe.Bond
}
hsl.haxe.Signaler = function() { }
hsl.haxe.Signaler.__name__ = ["hsl","haxe","Signaler"];
hsl.haxe.Signaler.prototype = {
	__class__: hsl.haxe.Signaler
}
hsl.haxe.DirectSignaler = function(subject,rejectNullData) {
	if(null == subject) throw new haxe.exception.ArgumentNullException("subject",1);
	this.subject = subject;
	this.rejectNullData = rejectNullData;
	this.sentinel = new hsl.haxe._DirectSignaler.SentinelBond();
};
hsl.haxe.DirectSignaler.__name__ = ["hsl","haxe","DirectSignaler"];
hsl.haxe.DirectSignaler.__interfaces__ = [hsl.haxe.Signaler];
hsl.haxe.DirectSignaler.prototype = {
	unbindVoid: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,unbindAdvanced: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,unbind: function(listener) {
		this.sentinel.remove(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,removeNotificationTarget: function(value) {
		if(null != this.notificationTargets) this.notificationTargets.remove(value);
	}
	,removeBubblingTarget: function(value) {
		if(null != this.bubblingTargets) this.bubblingTargets.remove(value);
	}
	,verifyCaller: function(positionInformation) {
		if(null == this.subjectClassNames) this.subjectClassNames = haxe.TypeTools.getClassNames(this.subject);
		var $it0 = this.subjectClassNames.iterator();
		while( $it0.hasNext() ) {
			var subjectClassName = $it0.next();
			if(subjectClassName == positionInformation.className) return;
		}
		throw new haxe.exception.Exception("This method may only be called by the subject of the signaler.",null,2);
	}
	,getOrigin: function(origin) {
		return null == origin?this.subject:origin;
	}
	,get_isListenedTo: function() {
		return this.sentinel.get_isConnected();
	}
	,dispatch: function(data,origin,positionInformation) {
		if("dispatchNative" != positionInformation.methodName && "bubble" != positionInformation.methodName) this.verifyCaller(positionInformation);
		if(this.rejectNullData && null == data) throw new haxe.exception.Exception("Some data that was passed is null, but this signaler has been set to reject null data.",null,1);
		origin = null == origin?this.subject:origin;
		if(this.mostRecentPropagationUndisturbed = 3 == this.sentinel.callListener(data,this.subject,origin,3)) {
			if(null != this.bubblingTargets) {
				var $it0 = this.bubblingTargets.iterator();
				while( $it0.hasNext() ) {
					var bubblingTarget = $it0.next();
					bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
			if(null != this.notificationTargets) {
				var $it1 = this.notificationTargets.iterator();
				while( $it1.hasNext() ) {
					var notificationTarget = $it1.next();
					notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
				}
			}
		}
	}
	,bubble: function(data,origin) {
		if(null != this.bubblingTargets) {
			var $it0 = this.bubblingTargets.iterator();
			while( $it0.hasNext() ) {
				var bubblingTarget = $it0.next();
				bubblingTarget.dispatch(data,origin,{ fileName : "DirectSignaler.hx", lineNumber : 116, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
		if(null != this.notificationTargets) {
			var $it1 = this.notificationTargets.iterator();
			while( $it1.hasNext() ) {
				var notificationTarget = $it1.next();
				notificationTarget.dispatch(null,origin,{ fileName : "DirectSignaler.hx", lineNumber : 121, className : "hsl.haxe.DirectSignaler", methodName : "bubble"});
			}
		}
	}
	,bindVoid: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.NiladicBond(listener));
	}
	,bindAdvanced: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.AdvancedBond(listener));
	}
	,bind: function(listener) {
		if(null == listener) throw new haxe.exception.ArgumentNullException("listener",1);
		return this.sentinel.add(new hsl.haxe._DirectSignaler.RegularBond(listener));
	}
	,addNotificationTarget: function(value) {
		if(null == this.notificationTargets) this.notificationTargets = new List();
		this.notificationTargets.add(value);
	}
	,addBubblingTarget: function(value) {
		if(null == this.bubblingTargets) this.bubblingTargets = new List();
		this.bubblingTargets.add(value);
	}
	,__class__: hsl.haxe.DirectSignaler
}
hsl.haxe._DirectSignaler = {}
hsl.haxe._DirectSignaler.LinkedBond = function() {
	hsl.haxe.Bond.call(this);
	this.destroyed = false;
};
hsl.haxe._DirectSignaler.LinkedBond.__name__ = ["hsl","haxe","_DirectSignaler","LinkedBond"];
hsl.haxe._DirectSignaler.LinkedBond.__super__ = hsl.haxe.Bond;
hsl.haxe._DirectSignaler.LinkedBond.prototype = $extend(hsl.haxe.Bond.prototype,{
	unlink: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,destroy: function() {
		if(false == this.destroyed) {
			this.previous.next = this.next;
			this.next.previous = this.previous;
			this.destroyed = true;
		}
	}
	,determineEquals: function(value) {
		return false;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		return 0;
	}
	,__class__: hsl.haxe._DirectSignaler.LinkedBond
});
hsl.haxe._DirectSignaler.SentinelBond = function() {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.next = this.previous = this;
};
hsl.haxe._DirectSignaler.SentinelBond.__name__ = ["hsl","haxe","_DirectSignaler","SentinelBond"];
hsl.haxe._DirectSignaler.SentinelBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.SentinelBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	remove: function(value) {
		var node = this.next;
		while(node != this) {
			if(node.determineEquals(value)) {
				if(false == node.destroyed) {
					node.previous.next = node.next;
					node.next.previous = node.previous;
					node.destroyed = true;
				}
				break;
			}
			node = node.next;
		}
	}
	,get_isConnected: function() {
		return this.next != this;
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		var node = this.next;
		while(node != this && 1 != propagationStatus) {
			propagationStatus = node.callListener(data,currentTarget,origin,propagationStatus);
			node = node.next;
		}
		return propagationStatus;
	}
	,add: function(value) {
		value.next = this;
		value.previous = this.previous;
		return this.previous = this.previous.next = value;
	}
	,__class__: hsl.haxe._DirectSignaler.SentinelBond
});
hsl.haxe._DirectSignaler.RegularBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.RegularBond.__name__ = ["hsl","haxe","_DirectSignaler","RegularBond"];
hsl.haxe._DirectSignaler.RegularBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.RegularBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.RegularBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener(data);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,__class__: hsl.haxe._DirectSignaler.RegularBond
});
hsl.haxe._DirectSignaler.NiladicBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.NiladicBond.__name__ = ["hsl","haxe","_DirectSignaler","NiladicBond"];
hsl.haxe._DirectSignaler.NiladicBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.NiladicBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.NiladicBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(false == this.halted) {
			this.listener();
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
		}
		return propagationStatus;
	}
	,__class__: hsl.haxe._DirectSignaler.NiladicBond
});
hsl.haxe._DirectSignaler.AdvancedBond = function(listener) {
	hsl.haxe._DirectSignaler.LinkedBond.call(this);
	this.listener = listener;
};
hsl.haxe._DirectSignaler.AdvancedBond.__name__ = ["hsl","haxe","_DirectSignaler","AdvancedBond"];
hsl.haxe._DirectSignaler.AdvancedBond.__super__ = hsl.haxe._DirectSignaler.LinkedBond;
hsl.haxe._DirectSignaler.AdvancedBond.prototype = $extend(hsl.haxe._DirectSignaler.LinkedBond.prototype,{
	determineEquals: function(value) {
		return js.Boot.__instanceof(value,hsl.haxe._DirectSignaler.AdvancedBond) && Reflect.compareMethods(value.listener,this.listener);
	}
	,callListener: function(data,currentTarget,origin,propagationStatus) {
		if(this.halted == false) {
			var signal = new hsl.haxe.Signal(data,this,currentTarget,origin);
			this.listener(signal);
			if(this.willDestroyOnUse) {
				if(false == this.destroyed) {
					this.previous.next = this.next;
					this.next.previous = this.previous;
					this.destroyed = true;
				}
			}
			if(signal.immediatePropagationStopped) return 1; else if(signal.propagationStopped) return 2;
		}
		return propagationStatus;
	}
	,__class__: hsl.haxe._DirectSignaler.AdvancedBond
});
hsl.haxe.PropagationStatus = function() { }
hsl.haxe.PropagationStatus.__name__ = ["hsl","haxe","PropagationStatus"];
hsl.haxe.Signal = function(data,currentBond,currentTarget,origin) {
	this.data = data;
	this.currentBond = currentBond;
	this.currentTarget = currentTarget;
	this.origin = origin;
	this.immediatePropagationStopped = false;
	this.propagationStopped = false;
};
hsl.haxe.Signal.__name__ = ["hsl","haxe","Signal"];
hsl.haxe.Signal.prototype = {
	stopPropagation: function() {
		this.propagationStopped = true;
	}
	,stopImmediatePropagation: function() {
		this.immediatePropagationStopped = true;
	}
	,get_data1: function() {
		return this.data;
	}
	,__class__: hsl.haxe.Signal
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
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
js.Browser = function() { }
js.Browser.__name__ = ["js","Browser"];
milkshake.IGameCore = function() { }
milkshake.IGameCore.__name__ = ["milkshake","IGameCore"];
milkshake.IGameCore.prototype = {
	__class__: milkshake.IGameCore
}
milkshake.core = {}
milkshake.core.Node = function(id) {
	if(id == null) id = "undefined-node";
	this.id = id;
	this.nodes = [];
	this.onNodeAdded = new hsl.haxe.DirectSignaler(this);
};
milkshake.core.Node.__name__ = ["milkshake","core","Node"];
milkshake.core.Node.prototype = {
	dispatchOnNodeAdded: function(node) {
		if(this.parent != null) this.parent.dispatchOnNodeAdded(node);
		this.onNodeAdded.dispatch(node,null,{ fileName : "Node.hx", lineNumber : 52, className : "milkshake.core.Node", methodName : "dispatchOnNodeAdded"});
	}
	,getNodeById: function(id) {
		return this.nodes.filter(function(node) {
			return node.id == id;
		})[0];
	}
	,removeNode: function(node) {
		HxOverrides.remove(this.nodes,node);
	}
	,addNode: function(node) {
		this.nodes.push(node);
	}
	,setParent: function(parent) {
		this.parent = parent;
	}
	,__class__: milkshake.core.Node
}
milkshake.core.Entity = function(id) {
	if(id == null) id = "undefined-entity";
	milkshake.core.Node.call(this,id);
};
milkshake.core.Entity.__name__ = ["milkshake","core","Entity"];
milkshake.core.Entity.__super__ = milkshake.core.Node;
milkshake.core.Entity.prototype = $extend(milkshake.core.Node.prototype,{
	set_y: function(value) {
		return this.y = value;
	}
	,get_y: function() {
		return this.y;
	}
	,set_x: function(value) {
		return this.x = value;
	}
	,get_x: function() {
		return this.x;
	}
	,update: function(deltaTime) {
	}
	,addNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.core.Entity)) {
			var entity = node;
			entity.setScene(this.scene);
			this.scene.onNodeAdded.dispatch(node,null,{ fileName : "Entity.hx", lineNumber : 31, className : "milkshake.core.Entity", methodName : "addNode"});
		}
		milkshake.core.Node.prototype.addNode.call(this,node);
	}
	,setScene: function(scene) {
		this.scene = scene;
	}
	,__class__: milkshake.core.Entity
});
milkshake.core.GameObject = function(id) {
	if(id == null) id = "undefined-gameobject";
	milkshake.core.Entity.call(this,id);
	this.displayObject = new PIXI.DisplayObjectContainer();
};
milkshake.core.GameObject.__name__ = ["milkshake","core","GameObject"];
milkshake.core.GameObject.__super__ = milkshake.core.Entity;
milkshake.core.GameObject.prototype = $extend(milkshake.core.Entity.prototype,{
	set_visible: function(value) {
		return this.displayObject.visible = value;
	}
	,get_visible: function() {
		return this.displayObject.visible;
	}
	,set_pivotY: function(value) {
		return this.displayObject.pivot.y = value;
	}
	,get_pivotY: function() {
		return this.displayObject.pivot.y;
	}
	,set_pivotX: function(value) {
		return this.displayObject.pivot.x = value;
	}
	,get_pivotX: function() {
		return this.displayObject.pivot.x;
	}
	,set_rotation: function(value) {
		return this.displayObject.rotation = value;
	}
	,get_rotation: function() {
		return this.displayObject.rotation;
	}
	,set_scaleY: function(value) {
		return this.displayObject.scale.y = value;
	}
	,get_scaleY: function() {
		return this.displayObject.scale.y;
	}
	,set_scaleX: function(value) {
		return this.displayObject.scale.x = value;
	}
	,get_scaleX: function() {
		return this.displayObject.scale.x;
	}
	,set_y: function(value) {
		this.displayObject.position.y = value;
		return milkshake.core.Entity.prototype.set_y.call(this,value);
	}
	,set_x: function(value) {
		this.displayObject.position.x = value;
		return milkshake.core.Entity.prototype.set_x.call(this,value);
	}
	,removeNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.core.GameObject)) {
			var gameObject = node;
			this.displayObject.removeChild(gameObject.displayObject);
		}
		milkshake.core.Entity.prototype.removeNode.call(this,node);
	}
	,addNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.core.GameObject)) {
			var gameObject = node;
			this.displayObject.addChild(gameObject.displayObject);
		}
		milkshake.core.Entity.prototype.addNode.call(this,node);
	}
	,__class__: milkshake.core.GameObject
});
milkshake.game.scene = {}
milkshake.game.scene.Scene = function(id) {
	if(id == null) id = "undefined-scene";
	milkshake.core.GameObject.call(this,id);
	this.setScene(this);
	this.addNode(this.componentManager = new milkshake.game.scene.component.SceneComponentManager());
};
milkshake.game.scene.Scene.__name__ = ["milkshake","game","scene","Scene"];
milkshake.game.scene.Scene.__super__ = milkshake.core.GameObject;
milkshake.game.scene.Scene.prototype = $extend(milkshake.core.GameObject.prototype,{
	__class__: milkshake.game.scene.Scene
});
milkshake.game.scene.SceneManager = function() {
	this.scenes = new haxe.ds.StringMap();
	this.currentSceneKey = null;
};
milkshake.game.scene.SceneManager.__name__ = ["milkshake","game","scene","SceneManager"];
milkshake.game.scene.SceneManager.prototype = {
	update: function(delta) {
		this.get_currentScene().update(delta);
	}
	,set_currentScene: function(scene) {
		return null;
	}
	,get_currentScene: function() {
		return this.scenes.get(this.currentSceneKey);
	}
	,changeScene: function(key) {
		this.currentSceneKey = key;
	}
	,removeScene: function(key) {
		this.scenes.remove(key);
	}
	,addScene: function(key,scene) {
		this.scenes.set(key,scene);
		if(this.currentSceneKey == null) this.changeScene(key);
	}
	,__class__: milkshake.game.scene.SceneManager
}
milkshake.game.scene.component = {}
milkshake.game.scene.component.SceneComponent = function(id) {
	if(id == null) id = "undefined-entity";
	milkshake.core.Entity.call(this,id);
};
milkshake.game.scene.component.SceneComponent.__name__ = ["milkshake","game","scene","component","SceneComponent"];
milkshake.game.scene.component.SceneComponent.__super__ = milkshake.core.Entity;
milkshake.game.scene.component.SceneComponent.prototype = $extend(milkshake.core.Entity.prototype,{
	setup: function(scene) {
		this.scene = scene;
	}
	,nodeAdded: function(node) {
	}
	,setScene: function(scene) {
		milkshake.core.Entity.prototype.setScene.call(this,scene);
		scene.onNodeAdded.bind($bind(this,this.nodeAdded));
	}
	,__class__: milkshake.game.scene.component.SceneComponent
});
milkshake.game.scene.component.SceneComponentManager = function() {
	milkshake.core.Entity.call(this,"SceneComponentManager");
};
milkshake.game.scene.component.SceneComponentManager.__name__ = ["milkshake","game","scene","component","SceneComponentManager"];
milkshake.game.scene.component.SceneComponentManager.__super__ = milkshake.core.Entity;
milkshake.game.scene.component.SceneComponentManager.prototype = $extend(milkshake.core.Entity.prototype,{
	addNode: function(node) {
		if(js.Boot.__instanceof(node,milkshake.game.scene.component.SceneComponent)) {
			var component = node;
			console.log("Adding nodscene");
			milkshake.core.Entity.prototype.addNode.call(this,node);
		} else throw "Only scene components";
	}
	,__class__: milkshake.game.scene.component.SceneComponentManager
});
milkshake.input = {}
milkshake.input.IKeyboardInput = function() { }
milkshake.input.IKeyboardInput.__name__ = ["milkshake","input","IKeyboardInput"];
milkshake.input.IKeyboardInput.prototype = {
	__class__: milkshake.input.IKeyboardInput
}
milkshake.input.PixiInput = function() {
	this.keyHandlersPress = new haxe.ds.IntMap();
	this.keyHandlersDown = new haxe.ds.IntMap();
	this.keyHandlersUp = new haxe.ds.IntMap();
	this.keyDownMap = [];
	js.Browser.document.onkeydown = $bind(this,this.onKeyPress);
	js.Browser.document.onkeyup = $bind(this,this.onKeyUp);
};
milkshake.input.PixiInput.__name__ = ["milkshake","input","PixiInput"];
milkshake.input.PixiInput.__interfaces__ = [milkshake.input.IKeyboardInput];
milkshake.input.PixiInput.prototype = {
	update: function() {
		var _g = 0, _g1 = this.keyDownMap;
		while(_g < _g1.length) {
			var key = _g1[_g];
			++_g;
			if(this.keyHandlersDown.exists(key)) (this.keyHandlersDown.get(key))();
		}
	}
	,removeKeyUpHandler: function(keyCode) {
		this.keyHandlersUp.remove(keyCode);
	}
	,addKeyUpHandler: function(keyCode,callback) {
		this.keyHandlersUp.set(keyCode,callback);
	}
	,removeKeyDownHandler: function(keyCode) {
		this.keyHandlersDown.remove(keyCode);
	}
	,addKeyDownHandler: function(keyCode,callback) {
		this.keyHandlersDown.set(keyCode,callback);
	}
	,removeKeyPressHandler: function(keyCode) {
		this.keyHandlersPress.remove(keyCode);
	}
	,addKeyPressHandler: function(keyCode,callback) {
		this.keyHandlersPress.set(keyCode,callback);
	}
	,onKeyUp: function(e) {
		HxOverrides.remove(this.keyDownMap,e.keyCode);
		if(this.keyHandlersUp.exists(e.keyCode)) (this.keyHandlersUp.get(e.keyCode))();
	}
	,onKeyPress: function(e) {
		if(Lambda.indexOf(this.keyDownMap,e.keyCode) == -1) {
			console.log("Press");
			this.keyDownMap.push(e.keyCode);
			if(this.keyHandlersPress.exists(e.keyCode)) (this.keyHandlersPress.get(e.keyCode))();
		}
	}
	,__class__: milkshake.input.PixiInput
}
milkshake.pixi = {}
milkshake.pixi.PixiGame = function() {
	this.canvas = js.Browser.document.getElementById("gameCanvas");
	this.input = new milkshake.input.PixiInput();
};
milkshake.pixi.PixiGame.__name__ = ["milkshake","pixi","PixiGame"];
milkshake.pixi.PixiGame.__interfaces__ = [milkshake.IGameCore];
milkshake.pixi.PixiGame.prototype = {
	render: function(deltaTime) {
		js.Browser.window.requestAnimationFrame($bind(this,this.render));
		this.game.update(deltaTime);
		this.input.update();
		this.renderer.render(this.stage);
		return true;
	}
	,create: function(game,width,height,color) {
		this.game = game;
		this.canvas.width = width;
		this.canvas.height = height;
		this.stage = new PIXI.Stage(color);
		game.setStage(this.stage);
		this.renderer = PIXI.autoDetectRenderer(width,height,this.canvas);
		js.Browser.window.requestAnimationFrame($bind(this,this.render));
	}
	,__class__: milkshake.pixi.PixiGame
}
var minigame = {}
minigame.MinigameManager = function() {
	milkshake.game.scene.SceneManager.call(this);
	var startMenu = new scenes.StartMenuScene();
	this.addScene(startMenu.id,startMenu);
};
minigame.MinigameManager.__name__ = ["minigame","MinigameManager"];
minigame.MinigameManager.__super__ = milkshake.game.scene.SceneManager;
minigame.MinigameManager.prototype = $extend(milkshake.game.scene.SceneManager.prototype,{
	__class__: minigame.MinigameManager
});
var network = {}
network.NetworkManager = function() {
	var socket = io.connect("127.0.0.1:8080");
	socket.on("createPlayer",function(data) {
		console.log("create: " + data.id + " " + data.x + " " + data.y);
	});
	socket.on("destroyPlayer",function(data) {
		console.log("destroy: " + data.id);
	});
};
network.NetworkManager.__name__ = ["network","NetworkManager"];
network.NetworkManager.prototype = {
	__class__: network.NetworkManager
}
var pixi = {}
pixi.Event = function() { }
pixi.Event.__name__ = ["pixi","Event"];
pixi.Event.prototype = {
	__class__: pixi.Event
}
pixi.IRenderer = function() { }
pixi.IRenderer.__name__ = ["pixi","IRenderer"];
pixi.IRenderer.prototype = {
	__class__: pixi.IRenderer
}
var scenes = {}
scenes.StartMenuScene = function() {
	milkshake.game.scene.Scene.call(this,"StartMenuScene");
};
scenes.StartMenuScene.__name__ = ["scenes","StartMenuScene"];
scenes.StartMenuScene.__super__ = milkshake.game.scene.Scene;
scenes.StartMenuScene.prototype = $extend(milkshake.game.scene.Scene.prototype,{
	update: function(delta) {
		milkshake.game.scene.Scene.prototype.update.call(this,delta);
	}
	,__class__: scenes.StartMenuScene
});
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.prototype.__class__ = Array;
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
hsl.haxe.PropagationStatus.IMMEDIATELY_STOPPED = 1;
hsl.haxe.PropagationStatus.STOPPED = 2;
hsl.haxe.PropagationStatus.UNDISTURBED = 3;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
Playground.main();
function $hxExpose(src, path) {
	var o = typeof window != "undefined" ? window : exports;
	var parts = path.split(".");
	for(var ii = 0; ii < parts.length-1; ++ii) {
		var p = parts[ii];
		if(typeof o[p] == "undefined") o[p] = {};
		o = o[p];
	}
	o[parts[parts.length-1]] = src;
}
})();
