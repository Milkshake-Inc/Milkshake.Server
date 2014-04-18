package user;

class User
{
	public var id:String;

	public function new():Void
	{
		id = Uuid.uuid();
	}
}
