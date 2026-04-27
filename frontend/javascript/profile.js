// script.js
const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");
const form = document.getElementById("settingsForm");
const formMessage = document.getElementById("formMessage");
const changeImageBtn = document.getElementById("changeImageBtn");
const cancelBtn = document.getElementById("cancelBtn");

const initialValues = {
  firstName: document.getElementById("firstName").value,
  lastName: document.getElementById("lastName").value,
  countryCode: document.getElementById("countryCode").value,
  phone: document.getElementById("phone").value
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

changeImageBtn.addEventListener("click", () => {
  formMessage.textContent = "Image upload opened.";
  formMessage.style.color = "#7b61ff";
});

cancelBtn.addEventListener("click", () => {
  document.getElementById("firstName").value = initialValues.firstName;
  document.getElementById("lastName").value = initialValues.lastName;
  document.getElementById("countryCode").value = initialValues.countryCode;
  document.getElementById("phone").value = initialValues.phone;

  formMessage.textContent = "Changes were cancelled.";
  formMessage.style.color = "#8c94a6";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!firstName || !lastName || !phone) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "#d9534f";
    return;
  }

  formMessage.textContent = "Settings saved successfully.";
  formMessage.style.color = "#40b154";
});
