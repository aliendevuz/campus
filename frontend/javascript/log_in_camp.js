const form = document.getElementById("loginForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const studentIdInput = document.getElementById("studentId");
const passwordInput = document.getElementById("password");
const message = document.getElementById("formMessage");

function toggleInvalidState(input, isInvalid) {
    input.parentElement.classList.toggle("is-invalid", isInvalid);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullNameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const studentIdValue = studentIdInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const fullNameInvalid = fullNameValue.length < 3;
    const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const studentIdInvalid = studentIdValue.length < 4;
    const passwordInvalid = passwordValue.length < 4;

    toggleInvalidState(fullNameInput, fullNameInvalid);
    toggleInvalidState(emailInput, emailInvalid);
    toggleInvalidState(studentIdInput, studentIdInvalid);
    toggleInvalidState(passwordInput, passwordInvalid);

    if (fullNameInvalid || emailInvalid || studentIdInvalid || passwordInvalid) {
        message.textContent = "Please fill in all fields with valid student details.";
        return;
    }

    message.textContent = `Welcome, ${fullNameValue}. Your student login is ready.`;
    form.reset();
});

[fullNameInput, emailInput, studentIdInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
        toggleInvalidState(input, false);
        message.textContent = "";
    });
});
