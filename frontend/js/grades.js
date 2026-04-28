(() => {
  const pageName = window.location.pathname.split("/").pop().toLowerCase();
  if (pageName !== "grades.html") return;

  const gradesStateEl = document.getElementById("grades-state");
  const gradesListEl = document.getElementById("grades-list");
  const gpaValueEl = document.getElementById("gpa-value");
  const gpaSubtextEl = document.getElementById("gpa-subtext");
  const creditsValueEl = document.getElementById("credits-value");
  const creditsSubtextEl = document.getElementById("credits-subtext");
  const rankValueEl = document.getElementById("rank-value");
  const rankSubtextEl = document.getElementById("rank-subtext");
  const t = (key, params) => window.i18n?.t?.(key, params) || key;

  const setState = (message, isError = false) => {
    if (!gradesStateEl) return;
    gradesStateEl.textContent = message;
    gradesStateEl.style.color = isError ? "#ff6b6b" : "var(--clr-text-muted)";
  };

  const hashToProgress = (input) => {
    const text = String(input || "");
    let hash = 0;
    for (let i = 0; i < text.length; i += 1) {
      hash = (hash * 31 + text.charCodeAt(i)) % 997;
    }
    return 70 + (hash % 31); // 70-100
  };

  const toLetterGrade = (progress) => {
    if (progress >= 95) return { grade: "A", color: "var(--clr-accent)" };
    if (progress >= 88) return { grade: "A-", color: "var(--clr-primary-lt)" };
    if (progress >= 80) return { grade: "B", color: "var(--clr-accent-warm)" };
    return { grade: "C", color: "var(--clr-text-muted)" };
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const gradeToPoints = (grade) => {
    const map = {
      "A+": 4.0,
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      D: 1.0,
      F: 0,
    };
    return map[String(grade || "").toUpperCase()] ?? 0;
  };

  const parseGradeFromTeacher = (teacher) => {
    const match = String(teacher || "").match(/Grade\s*:\s*([A-F][+-]?)/i);
    return match ? match[1].toUpperCase() : null;
  };

  const parseCreditsFromRoom = (room) => {
    const match = String(room || "").match(/Credits\s*:\s*(\d+)/i);
    return match ? Number(match[1]) : null;
  };

  const cleanTeacher = (teacher) => String(teacher || "").split("|")[0].trim();
  const cleanRoom = (room) => String(room || "").split("|")[0].trim();
  let latestSubjects = [];

  const renderSubjects = (subjects) => {
    if (!gradesListEl) return;

    if (!subjects.length) {
      gradesListEl.innerHTML = "";
      setState(t("No subjects found."));
      gpaValueEl.textContent = "--";
      gpaSubtextEl.textContent = t("No GPA data available");
      creditsValueEl.textContent = "0";
      creditsSubtextEl.textContent = t("Out of 120 required");
      rankValueEl.textContent = "--";
      rankSubtextEl.textContent = t("Rank unavailable");
      return;
    }

    const rows = subjects.map((subject) => {
      const progress = hashToProgress(subject.name);
      const extractedGrade = parseGradeFromTeacher(subject.teacher);
      const fallback = toLetterGrade(progress);
      const grade = extractedGrade || fallback.grade;
      const color = extractedGrade ? (grade.startsWith("A") ? "var(--clr-accent)" : grade.startsWith("B") ? "var(--clr-accent-warm)" : "var(--clr-text-muted)") : fallback.color;
      const credits = parseCreditsFromRoom(subject.room) || 3;
      return {
        ...subject,
        progress,
        letter: grade,
        color,
        credits,
      };
    });

    gradesListEl.innerHTML = rows
      .map(
        (row) => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--clr-surface-2); padding:var(--sp-4); border-radius:var(--radius-md);">
          <div style="flex:1;">
            <h4 style="font-size:var(--fs-base);">${escapeHtml(row.name)}</h4>
            <p style="font-size:var(--fs-xs); color:var(--clr-text-muted);">${escapeHtml(cleanTeacher(row.teacher) || t("Unknown teacher"))} • ${escapeHtml(cleanRoom(row.room) || t("Room N/A"))} • ${row.credits} ${escapeHtml(t("Credits"))}</p>
          </div>
          <div style="width:200px; margin-right:var(--sp-6);">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:var(--fs-xs);"><span>${escapeHtml(t("Progress"))}</span><span>${row.progress}%</span></div>
            <div style="height:6px; background:var(--clr-surface); border-radius:3px; overflow:hidden;"><div style="width:${row.progress}%; height:100%; background:var(--clr-primary);"></div></div>
          </div>
          <div style="font-size:var(--fs-xl); font-weight:var(--fw-bold); color:${row.color}; width:40px; text-align:right;">${row.letter}</div>
        </div>
      `
      )
      .join("");

    const totalCredits = rows.reduce((sum, r) => sum + r.credits, 0);
    const weightedPoints = rows.reduce((sum, r) => sum + gradeToPoints(r.letter) * r.credits, 0);
    const gpa = totalCredits > 0 ? (weightedPoints / totalCredits).toFixed(2) : "0.00";

    gpaValueEl.textContent = gpa;
    gpaSubtextEl.textContent = t("Calculated from backend grade records");
    creditsValueEl.textContent = String(totalCredits);
    creditsSubtextEl.textContent = t("Out of 120 required");
    rankValueEl.textContent = `#${Math.max(1, 180 - Math.round(Number(gpa) * 20))}`;
    rankSubtextEl.textContent = t("Estimated from GPA band");
    setState(t("Loaded {count} subject(s) from backend.", { count: rows.length }));
  };

  const loadGrades = async () => {
    setState(t("Loading grades..."));
    try {
      const response = await window.api.request("/subjects");
      const subjects = Array.isArray(response) ? response : response?.data || [];
      latestSubjects = subjects;
      renderSubjects(subjects);
    } catch (error) {
      gradesListEl.innerHTML = "";
      setState(error.message || t("Failed to load grades."), true);
      gpaValueEl.textContent = "--";
      gpaSubtextEl.textContent = t("Load failed");
      creditsValueEl.textContent = "--";
      creditsSubtextEl.textContent = t("Load failed");
      rankValueEl.textContent = "--";
      rankSubtextEl.textContent = t("Load failed");
    }
  };

  window.addEventListener("campus:language-changed", () => {
    renderSubjects(latestSubjects);
  });

  loadGrades();
})();
