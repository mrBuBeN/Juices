'use strict';

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

var appState = {
    mainUrl : 'http://localhost:1555/chat',
    messList:[],
    token : 'TE11EN'
};

$(document).ready(function() {
    restore();
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
            addMessage(report(nickName, message));
            localStorage.clear();
        }
    })
    
    $('.HistoryOfMessages').on('click', 'button.removeButton',function(){
        for (var i = 0; i < messageList.length; i++)
        {
            if (messageList[i].id == this.parentElement.parentElement.id) {
                del(appState.mainUrl, JSON.stringify(messageList[i]));
                for (var j = i; j < messageList.length - 1; j++)
                    messageList[j] = messageList[j+1];
                messageList.length--;
                break;
            }
        }
        $(this).parent().parent().remove();
    })
    
    var statement = 0;
    var numOfMessage = 0;
    $('.HistoryOfMessages').on('click', 'button.editButton',function() {
        var nickName = $('.Name').val()+ " : "+'\n';
        var nickN = $(this).closest('.allMessages').find('.nick').html();
        if(nickName == nickN)
        {
            statement = $(this).closest('.allMessages').find('.msg');
            for (var i = 0; i < messageList.length; i++)
            {
                if(this.parentElement.parentElement.id == messageList[i].id)
                {
                    numOfMessage = i;
                    break;
                }
            }
            var tmp = statement.html();
            $('.Message').val(tmp);
        } else
            alert("You can't change message!!!");
        
    })
    
    $('.Edit').click(function() {
        var str = $('.Message').val();
        messageList[numOfMessage].mess = str;
        put(appState.mainUrl, JSON.stringify(messageList[numOfMessage]));
        statement.html(str);
    })
     
})

function addMessage (mess) {
    messageList.push(mess);
    createMessage(mess);
    post(appState.mainUrl, JSON.stringify(mess));
}

function createAllMessages(allMessages) {
    if (allMessages != null)
        for(var i = 0; i < allMessages.length; i++)
        {
            createMessage(allMessages[i]);
            messageList.push(allMessages[i]);
        }
}

function createItem(message){
	var temp = document.createElement('div');
	temp.innerHTML = message;
	return temp;
}

function createMessage(message) {
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

function restore(continueWith) {
    var url = appState.mainUrl + '?token=' + appState.token;
    get(url, function(responseText) {
    console.assert(responseText != null);
    var response = JSON.parse(responseText);
    appState.token = response.token;
    if (response.messages)
        createAllMessages(response.messages);
    continueWith && continueWith();
    });
}

function get(url, continueWith, continueWithError) {
    ajax('GET', url, null, continueWith, continueWithError);
}

function post(url, data, continueWith, continueWithError) {
    ajax('POST', url, data, continueWith, continueWithError);	
}

function put(url, data, continueWith, continueWithError) {
    ajax('PUT', url, data, continueWith, continueWithError);	
}

function del(url, data, continueWith, continueWithError) {
    ajax('DELETE', url, data, continueWith, continueWithError);	
}

function isError(text) {
    if(text == "")
	return false;
	
    try {
	var obj = JSON.parse(text);
    } catch(ex) {
	return true;
    }

    return !!obj.error;
}

function defaultErrorHandler(mess) {
    console.error(mess);
}

function ajax(method, url, data, continueWith, continueWithError) {
    var xhr = new XMLHttpRequest();

    continueWithError = continueWithError || defaultErrorHandler;
    xhr.open(method || 'GET', url, true);

    xhr.onload = function () {
	if (xhr.readyState !== 4)
	    return;
	if(xhr.status != 200) {
	    continueWithError('Error on the server side, response ' + xhr.status);
	    return;
	}

	if(isError(xhr.responseText)) {
	    continueWithError('Error on the server side, response ' + xhr.responseText);
	    return;
	}
	if(xhr.responseText) {
	    continueWith(xhr.responseText);
	}
    };

    xhr.onimeout = function () {
        continueWithError('Server timed out !');
    }

    xhr.onerror = function (e) {
	var errMsg = 'Server connection error !\n'+
	'\n' +
	'Check if \n' +
	'- server is active\n'+
	'- server sends header "Access-Control-Allow-Origin:*"';

	continueWithError(errMsg);
    };

    xhr.send(data);
}