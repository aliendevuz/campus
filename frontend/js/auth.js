(() => {
  const TOKEN_KEY = "campus_token";
  const PROTECTED_PAGES = ["dashboard.html", "schedule.html", "grades.html", "messages.html", "campus.html"];
  const t = (key, params) => window.i18n?.t?.(key, params) || key;

  const getCurrentPage = () => window.location.pathname.split("/").pop().toLowerCase();
  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
  const clearToken = () => localStorage.removeItem(TOKEN_KEY);

  const isProtectedPage = () => PROTECTED_PAGES.includes(getCurrentPage());
  const isLoginPage = () => getCurrentPage() === "login.html";

  const protectRoutes = () => {
    if (isProtectedPage() && !getToken()) {
      window.location.href = "login.html";
    }
  };

  const bindLoginForm = () => {
    if (!isLoginPage()) return;

    if (getToken()) {
      window.location.href = "dashboard.html";
      return;
    }

    const form = document.getElementById("login-form");
    const errorEl = document.getElementById("login-error");
    const submitBtn = form?.querySelector("button[type='submit']");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email")?.value?.trim();
      const password = document.getElementById("password")?.value || "";

      if (!email || !password) {
        if (errorEl) {
          errorEl.textContent = t("Please enter email and password.");
          errorEl.style.display = "block";
        }
        return;
      }

      if (errorEl) {
        errorEl.textContent = "";
        errorEl.style.display = "none";
      }
      if (submitBtn) submitBtn.disabled = true;

      try {
        const response = await window.api.auth.login(email, password);
        const token = response?.token || response?.data?.token;

        if (!token) {
          throw new Error("Token missing in response");
        }

        setToken(token);
        window.location.href = "dashboard.html";
      } catch (error) {
        if (errorEl) {
          errorEl.textContent = error.message || t("Login failed");
          errorEl.style.display = "block";
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  };

  const bindLogout = () => {
    const logoutLink = document.querySelector(".dash-sidebar__footer a.dash-nav__link[href='index.html']");
    if (logoutLink) {
      logoutLink.addEventListener("click", (event) => {
        event.preventDefault();
        clearToken();
        window.location.href = "login.html";
      });
    } else {
      document.querySelectorAll("a.dash-nav__link[href='index.html']").forEach((link) => {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          clearToken();
          window.location.href = "login.html";
        });
      });
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    protectRoutes();
    bindLoginForm();
    bindLogout();
  });
})();
