"use strict";

const chat = document.querySelector(".chat"),
  messagesContent = chat.querySelector(".messages-content"),
  messageSubmit = chat.querySelector(".message-submit"),
  messagesTemplates = chat.querySelector(".messages-templates"),
  messageStatus = messagesTemplates.querySelector(".message-status"),
  messageText = messageStatus.querySelector(".message-text"),
  chatStatus = chat.querySelector(".chat-status"),
  connection = new WebSocket("wss://neto-api.herokuapp.com/chat");


connection.addEventListener("open", () => {
  chatStatus.textContent = chatStatus.dataset.online;
  messageSubmit.disabled = false;
  messagesContent.appendChild(messageStatus);
  messageText.textContent = "«Пользователь появился в сети»";
});


window.addEventListener("beforeunload", () => {
  connection.onclose = () => {
    chatStatus.textContent = chatStatus.dataset.offline;
    messageSubmit.disabled = true;
    messagesContent.appendChild(messageStatus);
    messageText.textContent = messageText.value;
  };
  connection.close();
});


connection.addEventListener("message", event => {
  const now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    divMessage = messagesTemplates.querySelectorAll(".message"),
    divClone = divMessage[1].cloneNode(true),
    text = divClone.querySelector(".message-text"),
    time = divClone.querySelector(".timestamp");
  time.textContent = `${hours}:${minutes}`;
  messagesContent.appendChild(divClone);
  if (!(event.data === "...")) {
    text.textContent = event.data;
    const remomeDiv = messagesContent.querySelectorAll(".loading");
    if (remomeDiv.length >= 1) {
      messagesContent.removeChild(divMessage[0]);
    }
  } else {
    messagesContent.appendChild(divMessage[0]);
    text.textContent = "собеседник сейчас печатает сообщение";
  }
});


const handleSubmitForm = evt => {
  evt.preventDefault();
  const now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    messageInput = chat.querySelector(".message-input"),
    messagePersonal = messagesTemplates.querySelector(".message-personal"),
    messagText = messagePersonal.querySelector(".message-text"),
    time = messagePersonal.querySelector(".timestamp");
  connection.send(messageInput.value);
  time.textContent = `${hours}:${minutes}`;
  messagText.textContent = messageInput.value;
  const div = messagePersonal.cloneNode(true);
  messagesContent.appendChild(div);
  messageInput.value = "";
};


const messageBox = chat.querySelectorAll(".message-box");
for (let form of messageBox) {
  form.addEventListener("submit", handleSubmitForm);
}
