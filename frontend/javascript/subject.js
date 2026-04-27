// script.js
const searchInput = document.getElementById("searchInput");
const rows = document.querySelectorAll(".subject-row");
const emptyState = document.getElementById("emptyState");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  rows.forEach((row) => {
    const subject = row.dataset.subject.toLowerCase();
    const teacher = row.dataset.teacher.toLowerCase();
    const matches = subject.includes(query) || teacher.includes(query);

    row.style.display = matches ? "grid" : "none";

    if (matches) visibleCount++;
  });

  emptyState.style.display = visibleCount === 0 ? "block" : "none";
});

rows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.querySelectorAll(".cell").forEach((cell) => {
      cell.style.transform = "translateY(-3px)";
      cell.style.transition = "0.2s ease";
    });
  });

  row.addEventListener("mouseleave", () => {
    row.querySelectorAll(".cell").forEach((cell) => {
      cell.style.transform = "translateY(0)";
    });
  });
});

const userDropdown = document.getElementById("userDropdown");
const userTrigger = document.getElementById("userTrigger");
const userMenu = document.getElementById("userMenu");

userTrigger.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!userDropdown.contains(e.target)) {
    userDropdown.classList.remove("active");
  }
});
