const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "log_in.html";
}

async function loadDashboard() {
  try {
    const res = await fetch("https://campus-fmjd.onrender.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const user = await res.json();

    if (!res.ok) {
      localStorage.removeItem("token");
      window.location.href = "log_in.html";
      return;
    }

    document.getElementById("topUserName").textContent = user.name;
    document.getElementById("sideUserName").textContent = user.name;
    document.getElementById("mainUserName").textContent = user.name;

  } catch (error) {
    alert("Cannot load dashboard");
  }
}

loadDashboard();

document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    window.location.href = "log_in.html";
  });