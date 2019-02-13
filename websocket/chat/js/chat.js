"use strict";

const chat = document.querySelector(".chat");
const messagesContent = chat.querySelector(".messages-content");
const messageSubmit = chat.querySelector(".message-submit");
const messagesTemplates = chat.querySelector(".messages-templates");
const messageStatus = messagesTemplates.querySelector(".message-status");
const messageText = messageStatus.querySelector(".message-text");
const chatStatus = chat.querySelector(".chat-status");

const connection = new WebSocket("wss://neto-api.herokuapp.com/chat");

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
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const divMessage = messagesTemplates.querySelectorAll(".message");
  const divClone = divMessage[1].cloneNode(true);
  const text = divClone.querySelector(".message-text");
  const time = divClone.querySelector(".timestamp");
  time.textContent = `${hours}:${minutes}`;
  messagesContent.appendChild(divClone);
  text.scrollIntoView(top);
  if (event.data === "...") {
    messagesContent.appendChild(divMessage[0]);
    text.textContent = "собеседник сейчас печатает сообщение";
  } else {
    const remomeDiv = messagesContent.querySelectorAll(".loading");
    if (remomeDiv.length >= 1) {
      messagesContent.removeChild(divMessage[0]);
    }
    text.textContent = event.data;
  }
});
const handleSubmitForm = evt => {
  evt.preventDefault();
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const messageInput = chat.querySelector(".message-input");
  const messagePersonal = messagesTemplates.querySelector(".message-personal");
  const messagText = messagePersonal.querySelector(".message-text");
  const time = messagePersonal.querySelector(".timestamp");
  connection.send(messageInput.value);
  time.textContent = `${hours}:${minutes}`;
  messagText.textContent = messageInput.value;
  const div = messagePersonal.cloneNode(true);
  messagesContent.appendChild(div);
  div.scrollIntoView(top);
  messageInput.value = "";
};

const messageBox = chat.querySelectorAll(".message-box");
for (let form of messageBox) {
  form.addEventListener("submit", handleSubmitForm);
}
