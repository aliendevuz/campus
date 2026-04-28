document.addEventListener("DOMContentLoaded", () => {
  const THEME_KEY = "campus_theme";
  const LANG_KEY = "campus_lang";

  const createToastContainer = () => {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.style.cssText = "position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:12px;z-index:9999;";
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (message, type = "info") => {
    const container = createToastContainer();
    const toast = document.createElement("div");
    const bg = type === "success" ? "var(--clr-green)" : "var(--clr-surface-2)";
    toast.style.cssText = `background:${bg};color:var(--clr-text);padding:12px 20px;border-radius:8px;border:1px solid var(--clr-border);font-size:14px;font-weight:500;`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2200);
  };

  /* ==========================================
     2. Modal System Implementation
     ========================================== */
  const openModal = (title, bodyContent) => {
    // Check if overlay exists
    let overlay = document.querySelector(".modal-overlay");
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = "modal-overlay";
      document.body.appendChild(overlay);

      // Close modal on click outside
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          setTimeout(() => (overlay.innerHTML = ""), 300);
        }
      });
    }

    // Build modal HTML
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form class="modal-form">
          <div class="modal-body">
            ${bodyContent}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--outline modal-cancel">Cancel</button>
            <button type="submit" class="btn btn--primary">Confirm</button>
          </div>
        </form>
      </div>
    `;
    window.i18n?.translatePage?.(overlay);

    // Show modal
    requestAnimationFrame(() => overlay.classList.add("active"));

    // Handle Close
    const closeBtn = overlay.querySelector(".modal-close");
    const cancelBtn = overlay.querySelector(".modal-cancel");
    const closeAction = () => {
      overlay.classList.remove("active");
      setTimeout(() => (overlay.innerHTML = ""), 300);
    };
    closeBtn.addEventListener("click", closeAction);
    cancelBtn.addEventListener("click", closeAction);

    // Handle Submit
    const form = overlay.querySelector(".modal-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      closeAction();
      showToast(`${title} request submitted successfully!`, "success");
    });
  };

  /* ==========================================
     3. Make Elements Interactable
     ========================================== */
  
  // All regular buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (
        btn.classList.contains("modal-cancel") ||
        btn.closest(".modal-content") ||
        btn.tagName === "A" ||
        btn.id === "send-message-btn"
      ) {
        return;
      }

      e.preventDefault();
      const text = btn.textContent.trim();

      btn.style.transform = "scale(0.95)";
      setTimeout(() => (btn.style.transform = ""), 150);

      if (text.includes("Pre-order")) {
        openModal("Pre-order Food", `
          <label>Select Item</label>
          <select>
            <option>Grilled Chicken Bowl - $6.50</option>
            <option>Vegan Wrap - $5.00</option>
            <option>Classic Burger & Fries - $7.00</option>
          </select>
          <label style="margin-top:12px;">Pickup Time</label>
          <input type="time" value="12:30" />
        `);
      } else if (text.includes("Sign Up") || text.includes("RSVP")) {
        showToast("Successfully registered!", "success");
        btn.textContent = "Enrolled";
        btn.classList.remove("btn--primary");
        btn.classList.add("btn--outline");
      } else if (text.includes("Yes") || text.includes("No")) {
        showToast("Your vote has been recorded.", "success");
      } else {
        showToast(`Action triggered: ${text}`);
      }
    });
  });

  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      this.style.transform = "scale(0.95)";
      setTimeout(() => (this.style.transform = ""), 150);

      const text = this.querySelector("span:not(.action-icon)")
        ? this.querySelector("span:not(.action-icon)").textContent.trim()
        : this.textContent.trim();

      if (text.includes("Book Study Room")) {
        openModal("Book Study Room", `
          <label>Date</label>
          <input type="date" />
          <label style="margin-top:12px;">Duration</label>
          <select><option>1 Hour</option><option>2 Hours</option><option>3 Hours</option></select>
          <label style="margin-top:12px;">Capacity</label>
          <select><option>1-2 People</option><option>3-5 People</option><option>6+ People</option></select>
        `);
      } else if (text.includes("Pre-order Food")) {
        openModal("Pre-order Food", `
          <label>Select Item</label>
          <select>
            <option>Grilled Chicken Bowl - $6.50</option>
            <option>Vegan Wrap - $5.00</option>
            <option>Classic Burger & Fries - $7.00</option>
          </select>
          <label style="margin-top:12px;">Pickup Time</label>
          <input type="time" value="12:30" />
        `);
      } else if (text.includes("Consult Prof") || text.includes("Contact Advisor")) {
        openModal("Request Consultation", `
          <label>Message / Topic</label>
          <textarea placeholder="Briefly describe what you'd like to discuss..."></textarea>
          <label style="margin-top:12px;">Preferred Availability</label>
          <select><option>Morning (9 AM - 12 PM)</option><option>Afternoon (1 PM - 4 PM)</option></select>
        `);
      } else if (text.includes("Request Docs") || text.includes("Request Transcript")) {
        openModal("Request Document", `
          <label>Document Type</label>
          <select>
            <option>Official Transcript</option>
            <option>Proof of Enrollment</option>
            <option>Diploma Copy</option>
          </select>
          <label style="margin-top:12px;">Delivery Method</label>
          <select><option>Digital (PDF to Email)</option><option>Printed (Pick up at Admin)</option></select>
        `);
      } else {
        showToast(`Opening: ${text}`);
      }
    });
  });

  document.querySelectorAll(".form-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault();
        const text = link.textContent.trim();

        if (text.includes("Request Official Documents") || text.includes("Request Transcript")) {
          openModal("Request Document", `
            <label>Document Type</label>
            <select>
              <option>Official Transcript</option>
              <option>Proof of Enrollment</option>
              <option>Diploma Copy</option>
            </select>
            <label style="margin-top:12px;">Delivery Method</label>
            <select><option>Digital (PDF to Email)</option><option>Printed (Pick up at Admin)</option></select>
          `);
        } else if (text.includes("Pay Dorm Fees")) {
          openModal("Pay Dorm Fees", `
            <label>Payment Amount</label>
            <input type="text" value="$450.00" disabled />
            <label style="margin-top:12px;">Payment Method</label>
            <select>
              <option>Credit/Debit Card (ending in 1234)</option>
              <option>Bank Transfer</option>
            </select>
          `);
        } else if (text.includes("Track Document Status")) {
          openModal("Document Status", `
            <div style="padding:12px; background:var(--clr-surface-2); border-radius:4px;">
              <strong>Proof of Enrollment</strong><br/>
              Status: <span style="color:var(--clr-green);">Ready for pickup</span>
            </div>
            <div style="padding:12px; background:var(--clr-surface-2); border-radius:4px; margin-top:8px;">
              <strong>Official Transcript</strong><br/>
              Status: <span style="color:var(--clr-accent-warm);">Processing (Est. 2 days)</span>
            </div>
          `);
        } else if (text.includes("Book Consult")) {
          openModal("Request Consultation", `
            <label>Message / Topic</label>
            <textarea placeholder="Briefly describe what you'd like to discuss..."></textarea>
            <label style="margin-top:12px;">Preferred Availability</label>
            <select><option>Morning (9 AM - 12 PM)</option><option>Afternoon (1 PM - 4 PM)</option></select>
          `);
        } else if (text.includes("Read Council News")) {
          showToast("Opening Student Council News...", "info");
        } else {
          showToast("Navigating to full view...");
        }
      }
    });
  });

  const searchInput = document.querySelector(".header-search input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        showToast(`Searching for: "${searchInput.value}"`);
        searchInput.value = "";
      }
    });
  }

  const notifBtn = document.querySelector(".header-icon-btn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      showToast("You have 2 new notifications.", "info");
      const badge = notifBtn.querySelector(".notif-badge");
      if (badge) badge.style.display = "none";
    });
  }

  const getControls = () => {
    const footerRows = document.querySelectorAll(".dash-sidebar__footer > div > div");
    const langRow = footerRows[0];
    const themeRow = footerRows[1];
    const langSelect = langRow?.querySelector("select");
    const darkToggle = themeRow?.querySelector("input[type='checkbox']");
    return { langSelect, darkToggle };
  };

  const applyTheme = (theme) => {
    document.documentElement.classList.toggle("theme-light", theme === "light");
  };

  const { langSelect, darkToggle } = getControls();
  const savedLang = window.i18n?.getLanguage?.() || localStorage.getItem(LANG_KEY) || "English";
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);
  window.i18n?.setLanguage?.(savedLang);

  if (langSelect) {
    const options = Array.from(langSelect.options);
    if (options.length >= 3) {
      options[0].value = "English";
      options[1].value = "Russian";
      options[2].value = "Uzbek";
    }
    langSelect.value = savedLang;
    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      window.i18n?.setLanguage?.(lang);
      showToast(`Language switched to ${lang}`, "success");
    });
  }

  if (darkToggle) {
    darkToggle.checked = savedTheme === "dark";
    darkToggle.addEventListener("change", (e) => {
      const theme = e.target.checked ? "dark" : "light";
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
    });
  }
});
