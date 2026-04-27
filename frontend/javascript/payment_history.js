// script.js
const statButtons = document.querySelectorAll(".stats-controls button");
const expensePath = document.getElementById("expensePath");
const incomePath = document.getElementById("incomePath");
const tooltip = document.querySelector(".tooltip");
const quickCards = document.querySelectorAll(".quick-card");
const rows = document.querySelectorAll(".table-row");

const chartData = {
  weekly: {
    expense: "M20 160 C90 80,140 200,210 120 S330 70,400 180 S540 70,610 150 S660 120,690 95",
    income: "M20 130 C90 210,140 230,210 160 S330 60,400 150 S540 40,610 200 S660 180,690 60",
    value: "$430,00"
  },
  monthly: {
    expense: "M20 70 C70 190,120 250,170 160 S270 210,320 80 S420 95,470 170 S570 95,620 125 S670 220,690 65",
    income: "M20 120 C70 260,120 260,170 170 S270 70,320 170 S420 80,470 150 S570 45,620 170 S670 240,690 40",
    value: "$920,00"
  },
  annual: {
    expense: "M20 200 C90 150,140 95,210 110 S330 230,400 130 S540 80,610 170 S660 130,690 40",
    income: "M20 140 C90 70,140 210,210 140 S330 30,400 180 S540 200,610 90 S660 60,690 190",
    value: "$3,840,00"
  }
};

statButtons.forEach((button) => {
  button.addEventListener("click", () => {
    statButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const type = button.textContent.toLowerCase();
    expensePath.setAttribute("d", chartData[type].expense);
    incomePath.setAttribute("d", chartData[type].income);
    tooltip.textContent = chartData[type].value;
  });
});

quickCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.boxShadow = "0 16px 28px rgba(127, 57, 235, 0.12)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "";
  });
});

rows.forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.style.background = "#fafaff";
    row.style.borderRadius = "10px";
  });

  row.addEventListener("mouseleave", () => {
    row.style.background = "transparent";
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
