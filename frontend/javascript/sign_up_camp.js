const form = document.getElementById("loginForm");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const message = document.getElementById("formMessage");

function toggleInvalidState(input, isInvalid) {
    input.parentElement.classList.toggle("is-invalid", isInvalid);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const phoneValue = phoneInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const phoneInvalid = phoneValue.length < 7;
    const passwordInvalid = passwordValue.length < 4;

    toggleInvalidState(phoneInput, phoneInvalid);
    toggleInvalidState(passwordInput, passwordInvalid);

    if (phoneInvalid || passwordInvalid) {
        message.textContent = "Please enter a valid phone number and password.";
        return;
    }

    message.textContent = `Welcome to Campus App, ${phoneValue}.`;
    form.reset();
});

[phoneInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        toggleInvalidState(input, false);
        message.textContent = "";
    });
});
