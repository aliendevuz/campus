// script.js
const chatSearch = document.getElementById("chatSearch");
const chatItems = document.querySelectorAll(".chat-item");
const activeChatName = document.getElementById("activeChatName");
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messagesArea = document.getElementById("messagesArea");
const playButtons = document.querySelectorAll(".play-btn");

chatSearch.addEventListener("input", () => {
  const query = chatSearch.value.toLowerCase().trim();

  chatItems.forEach((item) => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(query) ? "grid" : "none";
  });
});

chatItems.forEach((item) => {
  item.addEventListener("click", () => {
    chatItems.forEach((chat) => chat.classList.remove("selected"));
    item.classList.add("selected");
    activeChatName.textContent = item.dataset.name;
  });
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  const message = document.createElement("div");
  message.className = "message outgoing";

  const bubble = document.createElement("div");
  bubble.className = "bubble purple";
  bubble.textContent = text;

  const time = document.createElement("span");
  time.className = "time";
  time.innerHTML = "Now <i class='fa-solid fa-check-double'></i>";

  message.appendChild(bubble);
  message.appendChild(time);
  messagesArea.appendChild(message);

  messageInput.value = "";
  messagesArea.scrollTop = messagesArea.scrollHeight;
});

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector("i");
    if (icon.classList.contains("fa-play")) {
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
    } else {
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
    }
  });
});

const userDropdown = document.getElementById("userDropdown");
const userTrigger = document.getElementById("userTrigger");
const userMenu = document.getElementById("userMenu");

userTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!userDropdown.contains(e.target)) {
    userDropdown.classList.remove("active");
  }
});
