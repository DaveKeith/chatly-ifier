const request = new XMLHttpRequest();
const msgContainer = document.querySelector(".messages");
const conversationDate = document.querySelector(".top--date");

//'get' request to pull down our api data
request.open('GET', 'https://api.myjson.com/bins/18ce70', true)

//will either fill our page with the api data or show an error message
request.onload = function(){
    data = JSON.parse(this.response).data

    if (request.status >= 200 && request.status < 400) {
        //example of this date format: Saturday, October 13, 2018
        conversationDate.textContent = new Date(data.conversationDate).toLocaleString(
            'default',
            { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
            }
        );

        //the first messager will have his/her pic on the left in the createMessage function
        firstMessager = data.messages[0].username;

        //creates and fills all message elements and appends it to the messages element
        (data.messages).forEach((message, messages) => {
            msgElem = document.createElement('div');
            createMessage(message, msgElem, firstMessager);
            msgContainer.appendChild(msgElem);
        })
    } else {
        msgContainer.textContent = "Oops... something's wrong"
        msgContainer.style.color = "red";
    }
}

//sends the request, the final step in bringing in the api data
request.send();

//creates an img element with the user's pic and fills the cooresponding textbox with the content, username, and time (datetime object and clock svg)
createMessage = (message, elem, firstMessager) => {
    picSide = message.username === firstMessager ? "left" : "right"
    elem.className = `message ${picSide}`;
    addElem('img', elem, null, message.image)
    msgTextContainer = document.createElement('div');
    msgTextContainer.className = `message--textbox${message.focused ? " focused" : ""}`;
    elem.appendChild(msgTextContainer);
    addElem('div', msgTextContainer, `message--textbox__arrow arrow-${picSide}`, null);
    addElem('div', msgTextContainer, "message--textbox__content", message.message);
    addElem('div', msgTextContainer, `message--textbox__user ${picSide}--user`, message.username);
    msgTimeElem = document.createElement('div');
    msgTimeElem.className = "message--textbox__time";   
    addElem('img', msgTimeElem, null, "clock-regular.svg") 
    msgTime = new Date(message.timestamp).toLocaleTimeString(
        'default',
        { 
            hour: 'numeric', 
            minute: 'numeric' 
        }
    );
    addElem('span', msgTimeElem, null, msgTime);
    msgTextContainer.appendChild(msgTimeElem);
}

//Simple element creator.  Just needs an element type, className, content (textContent or img src), and an element to append to
addElem = (elemType, container, className, content) => {
    elem = document.createElement(elemType);
    elem.className = className;
    if(elemType === 'img'){
        elem.src = content;
    }else{
        elem.textContent = content;
    }
    container.appendChild(elem);
}