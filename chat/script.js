$(document).ready(function(){
    $('.Button').click(function(){
        var nickName = $('.Name').val();
        var message = $('.Message').val();
        
        if( (nickName == "") || (message == "")) {
            if(nickName == "") {
                alert("There is no name");
            } else {
                alert("Ther is no message");
            }
        } else {
            var newSpanNick = document.createElement('span');
            newSpanNick.className = 'nickName';
            newSpanNick.innerHTML = nickName + ':' + '\t';
            var newSpanMessage = document.createElement('span');
            newSpanMessage.className = 'msg';
            newSpanMessage.innerHTML = message;
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
            
            $('.HistoryOfMessages').append(msgWrap);
            $('.Message').val('');
            
        }
    })
    
    $('.HistoryOfMessages').on('click', 'button.removeButton',function(){
        $(this).parent().parent().remove();
    })
    
    $message = null;
    
    $('.HistoryOfMessages').on('click', 'button.editButton',function(){
        $message = $(this).closest('.allMessages').find('.msg');
        $tmp = $message.html();
        $('.Message').val($tmp);
    })
    
    $('.Edit').click(function(){
        var str = $('.Message').val();
        $message.html(str);
    })
     
})

