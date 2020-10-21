const loginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

const socket = io();

socket.on('message', ({ author, content }) => addMessage(author, content));

socket.on('join', ({ name }) =>
  addMessage('Chat Bot', `${name} has joined the chat`)
);
socket.on('removeUser', ({ name }) =>
  addMessage('Chat Bot', `${name} has left the chat`)
);

let userName = '';

loginForm.addEventListener('submit', (event) => {
    login(event);
});

addMessageForm.addEventListener('submit', (event) => {
    sendMessage(event);
});

const login = event => {
    event.preventDefault();

    if (userNameInput.value == '')  {
        alert('Type your name');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
        socket.emit('join', {
            name: userName,
            id: socket.id
        });
    }
};

const sendMessage = event => {
    event.preventDefault();

    if (messageContentInput.value == '') {
        alert('Type your message, please');
      }
      else {
        addMessage(userName, messageContentInput.value);
        socket.emit('message', { 
            author: userName, 
            content: messageContentInput.value 
        });
        messageContentInput.value = '';
      }
    };
    
    const addMessage = (author, content) => {
      const message = document.createElement('li');
      message.classList.add('message', 'message--received');
      if (author == userName) { 
          message.classList.add('message--self');
      } else if (author == 'Chat Bot') {
        message.classList.add('message--info');
    }
      message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
          ${content}
        </div>
      `;
      messagesList.appendChild(message);    

}