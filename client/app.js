const LoginForm = document.getElementById("welcome-form");
const messagesSection = document.getElementById("messages-section");
const messagesList = document.getElementById("messages-list");
const addMessageForm = document.getElementById("add-messages-form");
const userNameInput = document.getElementById("username");
const messageContentInput = document.getElementById("message-content");

let userName = '';

loginForm.addEventListener('submit', (event) => {
    login(event);
});

addMessageForm.addEventListener('submit', (event) => {
    sendMessage(event);
});

const login = () => {
    event.preventDefault();

    if (userNameInput.value == '')  {
        alert('Type your name')
    }
    else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

const sendMessage = () => {
    event.preventDefault();

    if (messageContentInput.value == '') {
        alert('Type your message, please')
      }
      else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = '';
      }
    };
    
    const addMessage = (author, content) => {
      const message = document.createElement('li');
      message.classList.add('message', 'message--received');
      if (author == userName) message.classList.add('message--self');
      message.innerHTML = `
        <h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
          ${content}
        </div>
      `;
      messagesList.appendChild(message);    

}