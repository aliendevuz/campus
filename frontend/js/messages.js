(() => {
  const pageName = window.location.pathname.split("/").pop().toLowerCase();
  if (pageName !== "messages.html") {
    return;
  }

  const stateEl = document.getElementById("messages-state");
  const listEl = document.getElementById("messages-list");
  const receiverSearchEl = document.getElementById("receiver-search");
  const receiverSelectEl = document.getElementById("receiver-select");
  const messageEl = document.getElementById("message-text");
  const sendBtn = document.getElementById("send-message-btn");
  const userMap = new Map();
  let allUsers = [];
  const t = (key, params) => window.i18n?.t?.(key, params) || key;
  const locale = () => window.i18n?.getLocale?.() || undefined;
  let latestMessages = [];

  const setState = (text, isError = false) => {
    if (!stateEl) return;
    stateEl.textContent = text;
    stateEl.style.color = isError ? "#ff6b6b" : "var(--clr-text-muted)";
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const formatDate = (isoDate) => {
    if (!isoDate) return t("Unknown time");
    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return t("Unknown time");
    return date.toLocaleString(locale());
  };

  const renderMessages = (messages) => {
    if (!listEl) return;

    if (!messages.length) {
      listEl.innerHTML = "";
      setState(t("No messages yet. Send the first message."));
      return;
    }

    listEl.innerHTML = messages
      .map(
        (msg) => `
      <div style="display:flex; align-items:center; gap:var(--sp-4); padding:var(--sp-3) 0; border-bottom:1px solid var(--clr-border);">
        <div style="width:48px; height:48px; border-radius:50%; background:var(--grad-primary); display:flex; align-items:center; justify-content:center; font-size:0.8rem; color:#fff;">MSG</div>
        <div style="flex:1;">
          <div style="display:flex; justify-content:space-between;">
            <h4 style="font-size:var(--fs-base); margin-bottom:2px;">${escapeHtml(resolveMessageDirection(msg))}</h4>
            <span style="font-size:var(--fs-xs); color:var(--clr-text-muted);">${escapeHtml(formatDate(msg.createdAt))}</span>
          </div>
          <p style="font-size:var(--fs-sm); color:var(--clr-text-muted);">${escapeHtml(msg.text || "")}</p>
        </div>
      </div>
    `
      )
      .join("");

    setState(t("Loaded {count} message(s).", { count: messages.length }));
  };

  const normalizeMessages = (responsePayload) => {
    if (Array.isArray(responsePayload)) return responsePayload;
    if (Array.isArray(responsePayload?.data)) return responsePayload.data;
    return [];
  };

  const displayUser = (id) => {
    if (!id) return t("Unknown user");
    const user = userMap.get(String(id));
    if (!user) return t("Unknown user");
    return `${user.name} (${user.email})`;
  };

  const resolveMessageDirection = (message) => {
    const senderId = String(message.sender || "");
    const receiverId = String(message.receiver || "");
    const currentUserId = localStorage.getItem("campus_user_id") || "";

    if (currentUserId && senderId === currentUserId) {
      return t("To: {name}", { name: displayUser(receiverId) });
    }
    if (currentUserId && receiverId === currentUserId) {
      return t("From: {name}", { name: displayUser(senderId) });
    }
    return t("With: {name}", { name: displayUser(receiverId || senderId) });
  };

  const loadCurrentUser = async () => {
    try {
      const me = await window.api.request("/auth/me");
      const user = me?.data || me;
      if (user?._id) {
        localStorage.setItem("campus_user_id", String(user._id));
      }
    } catch (error) {
      // Non-fatal for page rendering
    }
  };

  const renderUserOptions = (users) => {
    if (!receiverSelectEl) return;
    receiverSelectEl.innerHTML = `<option value="">${t("Select receiver...")}</option>`;
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = String(user._id);
      option.textContent = `${user.name} (${user.email})`;
      receiverSelectEl.appendChild(option);
    });
  };

  const loadUsers = async () => {
    try {
      const response = await window.api.request("/users/list");
      const users = Array.isArray(response) ? response : response?.data || [];
      allUsers = users.map((u) => ({ _id: String(u._id), name: u.name, email: u.email }));
      allUsers.forEach((u) => userMap.set(u._id, u));
      renderUserOptions(allUsers);
    } catch (error) {
      setState(t("Could not load users list for receiver picker."), true);
    }
  };

  receiverSearchEl?.addEventListener("input", () => {
    const query = receiverSearchEl.value.trim().toLowerCase();
    if (!query) {
      renderUserOptions(allUsers);
      return;
    }

    const filtered = allUsers.filter(
      (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
    renderUserOptions(filtered);
  });

  const fetchMessages = async () => {
    setState(t("Loading messages..."));
    try {
      const response = await window.api.request("/messages");
      const data = normalizeMessages(response);
      latestMessages = data;
      renderMessages(data);
    } catch (error) {
      listEl.innerHTML = "";
      if (String(error.message || "").toLowerCase().includes("unauthorized")) {
        setState(t("Session expired. Please login again."), true);
      } else {
        setState(error.message || t("Failed to load messages"), true);
      }
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    const receiver = receiverSelectEl?.value?.trim();
    const text = messageEl?.value?.trim();

    if (!receiver || !text) {
      setState(t("Please select a receiver and enter message text."), true);
      return;
    }

    if (!/^[a-fA-F0-9]{24}$/.test(receiver)) {
      setState(t("Receiver ID must be a valid Mongo ObjectId."), true);
      return;
    }

    sendBtn.disabled = true;
    setState(t("Sending message..."));

    try {
      await window.api.request("/messages", {
        method: "POST",
        body: JSON.stringify({ receiver, text }),
      });

      messageEl.value = "";
      if (receiverSearchEl) receiverSearchEl.value = "";
      setState(t("Message sent successfully."));
      await fetchMessages();
    } catch (error) {
      const msg = String(error.message || "");
      if (msg.toLowerCase().includes("unauthorized")) {
        setState(t("Unauthorized. Please login again."), true);
      } else if (msg.toLowerCase().includes("invalid receiver")) {
        setState(t("Invalid receiver ID."), true);
      } else {
        setState(msg || t("Failed to send message"), true);
      }
    } finally {
      sendBtn.disabled = false;
    }
  };

  // Root-cause fix: dashboard.js listens to all ".btn" clicks and hijacks this button.
  // Use capture phase + stopImmediatePropagation to prevent fake toast handler from running.
  sendBtn?.addEventListener("click", handleSendMessage, true);

  const init = async () => {
    await loadCurrentUser();
    await loadUsers();
    await fetchMessages();
  };

  window.addEventListener("campus:language-changed", () => {
    renderUserOptions(allUsers);
    renderMessages(latestMessages);
  });

  init();
})();
