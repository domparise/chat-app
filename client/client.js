/*
    Dom Parise - 6/17/14 - chat app 
    client/client.js

    Client-side javascript
    I chose raw javascript rather than jquery just for code brevity and minimal dependencies
*/
// aliases to referenced DOM elements
var usr = document.getElementById('usr').innerText,
    txt = document.getElementById('txt'),
    users = document.getElementById('users'),
    to = document.getElementById('other');

///// private message initialization /////
// clicking on a user in the list will let you send them a private message

// div element that has been clicked, which we keep track of so only a single user can be selected at a time
var clickedDiv = { className: '' }; // initialized with className property so v8 doesnt have to do more work later
function userClick (e) { // written as a function rather than inline so it can be added to users who join
    var div = e.target;
    clickedDiv.className = '';
    if (div.className == 'userClicked' || div == clickedDiv) { // if clicking the clicked, unclick
        to.innerText = '';
        div.className = '';
        clickedDiv = { className: '' };
    } else {
        to.innerText = div.innerText;
        div.className = 'userClicked'; // keep track of the clicked div by checking the class
        clickedDiv = div;
    }
}

// apply the toggle-click functionality to all initial user elements
var userDivs = users.childNodes;
for (var i=0;i<userDivs.length;i++) {
    userDivs[i].addEventListener('click', userClick);
}

///// socket.io event handling /////

// io variable created by including '/socket.io/socket.io.js' script
var socket = io('http://localhost');

// send a join event when connected, so we can associate username to socket
socket.on('connect', function () {
    socket.emit('join', { user:usr });
});

// join notification and append the users list when a user joins
socket.on('join', function (data) {
    var div = document.createElement('div');
    div.innerText = data.user;
    div.addEventListener('click',userClick); // also bind the click handler
    users.appendChild(div);
    alert(data.user + ' joined');
});

// leave notification and remove user from list
socket.on('leave', function (data) {
    var userDivs = users.childNodes;
    for (var i=0;i<userDivs.length;i++) {
        if(userDivs[i].innerText === data.user) {
            users.removeChild(userDivs[i]);
            alert(data.user + ' left');
        }
    }
});

// set the button to send the message on click
document.getElementById('btn').addEventListener('click', function() {
    var other = to.innerText; // possible other user, for private message
    if(other === '') socket.emit('msg', { user:usr, msg:txt.value }); // send regular message to all
    else socket.emit('msgTo', { user:usr, msg:txt.value, to:other }); // send private message to selected user
    addMessage({ user:usr, msg:txt.value }); // and display the message to the chat window
});

// function to add the message to the chat window
function addMessage (data) {
    var div = document.createElement('div');
    div.innerText = data.user + ': ' + data.msg;
    document.getElementById('msgs').appendChild(div);
}

socket.on('msg', addMessage); // on typical broadcasted message, just add to display

socket.on('msgFrom', function (data) { // when send a private message, add this to indicate it
    data.user = 'Private Message from ' + data.user;
    addMessage(data);
});