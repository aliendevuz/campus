(() => {
  const API_BASE_URL = "http://localhost:3000/api";

  const request = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    const token = localStorage.getItem("campus_token");
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }

    if (!response.ok) {
      throw new Error(payload?.message || "Request failed");
    }

    return payload;
  };

  window.api = {
    auth: {
      login: (email, password) =>
        request("/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        }),
    },
    request,
  };
})();
