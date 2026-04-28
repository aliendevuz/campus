(() => {
  const pageName = window.location.pathname.split("/").pop().toLowerCase();
  if (pageName !== "schedule.html") return;

  const scheduleStateEl = document.getElementById("schedule-state");
  const scheduleTimelineEl = document.getElementById("schedule-timeline");
  const eventsStateEl = document.getElementById("events-state");
  const eventsGridEl = document.getElementById("events-grid");
  const weekdayFilterEl = document.getElementById("weekday-filter");
  let allEvents = [];
  const t = (key, params) => window.i18n?.t?.(key, params) || key;
  const locale = () => window.i18n?.getLocale?.() || undefined;

  const setState = (el, text, isError = false) => {
    if (!el) return;
    el.textContent = text;
    el.style.color = isError ? "#ff6b6b" : "var(--clr-text-muted)";
  };

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const parseTitle = (title) => {
    const [rawTitle, rawType, rawLocation] = String(title || "").split("|").map((s) => s.trim());
    return {
      title: rawTitle || t("Untitled"),
      type: rawType || t("Event"),
      location: rawLocation || t("Campus"),
    };
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return { time: t("Unknown"), day: "--", month: "---", full: t("Invalid date") };
    return {
      time: d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }),
      day: String(d.getDate()),
      month: d.toLocaleString(locale(), { month: "short" }).toUpperCase(),
      full: d.toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }),
    };
  };

  const classifyColor = (type) => {
    const t = String(type).toLowerCase();
    if (t.includes("class")) return "var(--clr-primary)";
    if (t.includes("deadline")) return "var(--clr-accent-warm)";
    if (t.includes("exam")) return "var(--clr-accent-warm)";
    return "var(--clr-accent)";
  };

  const renderTimeline = (items) => {
    if (!scheduleTimelineEl) return;
    if (!items.length) {
      scheduleTimelineEl.innerHTML = "";
      setState(scheduleStateEl, t("No events scheduled."));
      return;
    }

    scheduleTimelineEl.innerHTML = items
      .map((item) => {
        const meta = parseTitle(item.title);
        const dt = formatDate(item.date);
        const borderColor = classifyColor(meta.type);
        return `
          <div class="timeline-item">
            <div class="time-col">${escapeHtml(dt.time)}<br/><span style="color:var(--clr-text-muted);font-size:10px;">${escapeHtml(dt.month)} ${escapeHtml(dt.day)}</span></div>
            <div class="card-col" style="border-left-color:${borderColor};">
              <h4>${escapeHtml(meta.title)}</h4>
              <p>${escapeHtml(meta.location)} • ${escapeHtml(meta.type)}</p>
              <p style="color:var(--clr-text-muted); font-size:var(--fs-xs); margin-top:4px;">${escapeHtml(dt.full)}</p>
            </div>
          </div>
        `;
      })
      .join("");

    setState(scheduleStateEl, t("Loaded {count} timetable item(s).", { count: items.length }));
  };

  const renderEvents = (items) => {
    if (!eventsGridEl) return;
    const upcoming = items.filter((e) => {
      const type = parseTitle(e.title).type.toLowerCase();
      return type.includes("event") || type.includes("deadline");
    });

    if (!upcoming.length) {
      eventsGridEl.innerHTML = "";
      setState(eventsStateEl, t("No campus events scheduled."));
      return;
    }

    eventsGridEl.innerHTML = upcoming
      .map((item) => {
        const meta = parseTitle(item.title);
        const dt = formatDate(item.date);
        const color = classifyColor(meta.type);
        return `
          <div style="display:flex; gap:var(--sp-4); align-items:center; background:var(--clr-surface-2); padding:var(--sp-4); border-radius:var(--radius-md);">
            <div style="background:${color}; color:#fff; width:50px; height:50px; border-radius:var(--radius-sm); display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:bold; line-height:1.1;">
              <span style="font-size:12px;text-transform:uppercase;">${escapeHtml(dt.month)}</span>
              <span style="font-size:18px;">${escapeHtml(dt.day)}</span>
            </div>
            <div style="flex:1;">
              <h4 style="font-size:var(--fs-base); margin-bottom:2px;">${escapeHtml(meta.title)}</h4>
              <p style="font-size:var(--fs-xs); color:var(--clr-text-muted);">${escapeHtml(meta.location)} • ${escapeHtml(dt.time)}</p>
            </div>
            <button class="btn btn--outline" style="padding:4px 12px; font-size:var(--fs-xs);">${t("View")}</button>
          </div>
        `;
      })
      .join("");

    setState(eventsStateEl, t("Loaded {count} upcoming event(s).", { count: upcoming.length }));
  };

  const applyDayFilter = () => {
    if (!Array.isArray(allEvents)) return;
    const selectedDay = Number(weekdayFilterEl?.value || "2"); // Monday=1 ... Friday=5
    const filtered = allEvents.filter((e) => {
      const d = new Date(e.date);
      if (Number.isNaN(d.getTime())) return false;
      return d.getDay() === selectedDay;
    });

    renderTimeline(filtered);
    renderEvents(filtered);
  };

  const loadSchedule = async () => {
    setState(scheduleStateEl, t("Loading schedule..."));
    setState(eventsStateEl, t("Loading events..."));
    try {
      const response = await window.api.request("/events");
      const events = Array.isArray(response) ? response : response?.data || [];
      allEvents = events
        .filter((e) => e && e.date)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      applyDayFilter();
    } catch (error) {
      const message = String(error.message || t("Failed to load schedule."));
      setState(scheduleStateEl, message, true);
      setState(eventsStateEl, message, true);
      scheduleTimelineEl.innerHTML = "";
      eventsGridEl.innerHTML = "";
    }
  };

  weekdayFilterEl?.addEventListener("change", applyDayFilter);
  window.addEventListener("campus:language-changed", () => {
    applyDayFilter();
  });
  loadSchedule();
})();
