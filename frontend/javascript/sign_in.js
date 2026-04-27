const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://campus-fmjd.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful!");
      window.location.href = "log_in.html";
    } else {
      alert(data.message);
    }

  } catch (error) {
    alert("Server error");
  }
});