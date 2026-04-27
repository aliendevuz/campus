// script.js
const form = document.getElementById("settingsForm");
const formMessage = document.getElementById("formMessage");
const marketingToggle = document.getElementById("marketingToggle");
const changeAvatarBtn = document.getElementById("changeAvatarBtn");
const removeAvatarBtn = document.getElementById("removeAvatarBtn");
const avatarPreview = document.getElementById("avatarPreview");
const cardAvatar = document.getElementById("cardAvatar");
const tabButtons = document.querySelectorAll(".tab-btn");

marketingToggle.addEventListener("click", () => {
  marketingToggle.classList.toggle("active");
});

changeAvatarBtn.addEventListener("click", () => {
  avatarPreview.innerHTML = "K";
  cardAvatar.innerHTML = "K";
  avatarPreview.style.fontWeight = "700";
  cardAvatar.style.fontWeight = "700";
  avatarPreview.style.background = "linear-gradient(135deg, #7d3ceb, #a84fff)";
  cardAvatar.style.background = "linear-gradient(135deg, #7d3ceb, #a84fff)";
  cardAvatar.style.color = "#fff";
  formMessage.textContent = "Avatar changed successfully.";
});

removeAvatarBtn.addEventListener("click", () => {
  avatarPreview.innerHTML = '<i class="fa-regular fa-user"></i>';
  cardAvatar.innerHTML = '<i class="fa-regular fa-image"></i>';
  avatarPreview.style.fontWeight = "400";
  cardAvatar.style.fontWeight = "400";
  avatarPreview.style.background = "linear-gradient(135deg, #7d3ceb, #a84fff)";
  cardAvatar.style.background = "#d8d8db";
  cardAvatar.style.color = "#363636";
  formMessage.textContent = "Avatar removed.";
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const country = document.getElementById("country").value;

  if (!firstName || !lastName || !phone || !country) {
    formMessage.textContent = "Please fill in all required fields.";
    formMessage.style.color = "#e15a5a";
    return;
  }

  formMessage.textContent = "Profile settings saved successfully.";
  formMessage.style.color = "#7d3ceb";
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
