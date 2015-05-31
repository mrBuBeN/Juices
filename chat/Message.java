public class Message {
	String id;
	String nick;
	String mess;

public Message(String user, String messageText, String id) {
	this.id = id;
	this.nick = user;
	this.mess = messageText;
}

public String toString() {
	return "{\"id\":\"" + this.id + "\",\"nick\":\"" + this.nick + "\",\"mess\":\"" + this.mess + "\"}";
}

public boolean equals(Message mess) {
	if(!mess.id.equals (this.id))
		return false;
	if(!mess.nick.equals (this.nick))
		return false;
	if(!mess.mess.equals (this.mess))
		return false;
	return true;
}

};