var uniqueId = function() {
	var date = Date.now();
	var random = Math.random() * Math.random();
    
	return Math.floor(date * random).toString();
};
var report = function(name, message) {
	return {
		nick: name,
		mess: message,
		id: uniqueId()
	};
};

var messageList = new Array();

$(document).ready(function() {
    if (localStorage.getItem("Chat messageList") != null)
        messageList = restore();
    createAllMessages();
    $('.Button').click(function() {
        var nickName = $('.Name').val();
        var message = $('.Message').val();
        
        if((nickName == "") || (message == "")) {
            if(nickName == "") {
                alert("There is no name");
            } else {
                alert("There is no message");
            }
        } else {
            
            $('.Message').val('');
            addMess(report(nickName, message));
            localStorage.clear();
            store();
        }
    })
    
    $('.HistoryOfMessages').on('click', 'button.removeButton',function(){
        for (var i = 0; i < messageList.length; i++)
        {
            if (messageList[i].id == this.parentElement.parentElement.id) {
                for (var j = i; j < messageList.length - 1; j++)
                    messageList[j] = messageList[j+1];
                messageList.length--;
                break;
            }
        }
        $(this).parent().parent().remove();
        localStorage.clear();
        store();
    })
    
    $statement = null;
    $numOfMessage = 0;
    $('.HistoryOfMessages').on('click', 'button.editButton',function() {
        $nickName = $('.Name').val()+ " : "+'\n';
        $nickN = $(this).closest('.allMessages').find('.nick').html();
        if($nickName == $nickN)
        {
            $statement = $(this).closest('.allMessages').find('.msg');
            for (var i = 0; i < messageList.length; i++)
            {
                if(this.parentElement.parentElement.id == messageList[i].id)
                {
                    numOfMessage = i;
                    break;
                }
            }
            $tmp = $statement.html();
            $('.Message').val($tmp);
        } else
            alert("You can't change message!!!");
        
    })
    
    $('.Edit').click(function() {
        var str = $('.Message').val();
        messageList[numOfMessage].mess= str;
        $statement.html(str);
        localStorage.clear();
        store();
    })
     
})

function createAllMessages() {
    if(messageList.length != null) {
	   for(var i = 0; i < messageList.length; i++)
           output(messageList[i]);
    }
}

function addMess(message) {
    output(message);
    messageList.push(message);
}

function createItem(message){
	var temp = document.createElement('div');
	temp.innerHTML = message;
	return temp;
}

function store() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	localStorage.setItem("Chat messageList", JSON.stringify(messageList));
}

function output(message) {
    var nickName = message.nick;
    var messageText = message.mess;
    var newSpanNick = document.createElement('span');
    newSpanNick.className = 'nick';
    newSpanNick.innerHTML = nickName + " : "+'\n';
    var newSpanMessage = document.createElement('span');
    newSpanMessage.className = 'msg';
    newSpanMessage.innerHTML = messageText;
    var msgWrap = document.createElement('div');
    msgWrap.className = 'allMessages';
    var msgTop = document.createElement('div');
    msgTop.classList.add('float-container');
    newSpanNick.classList.add('left-float');
    var removeButton = document.createElement('button');
    removeButton.className = 'removeButton';
    var editButton = document.createElement('button');            
    editButton.className = 'editButton';
    msgTop.appendChild(newSpanNick);
    msgTop.appendChild(removeButton);
    msgTop.appendChild(editButton);
    msgWrap.appendChild(msgTop);
    msgWrap.appendChild(newSpanMessage);
    msgWrap.id = message.id;
    
    $('.HistoryOfMessages').append(msgWrap);
}

function restore() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}
    
	var item = localStorage.getItem("Chat messageList");
    return JSON.parse(item);
}
