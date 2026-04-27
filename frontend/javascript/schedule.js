// script.js
const monthLabel = document.getElementById("monthLabel");
const todayLabel = document.getElementById("todayLabel");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const toggleCompleted = document.getElementById("toggleCompleted");
const completedList = document.getElementById("completedList");

const events = {
  "2024-01-15": "Presentation day",
  "2024-01-18": "Extra lesson",
  "2024-01-19": "Meeting with teacher"
};

let currentDate = new Date(2024, 0, 1);

function renderCalendar(date) {
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthLabel.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = firstDay - 1; i >= 0; i--) {
    const cell = document.createElement("div");
    cell.className = "day-cell muted";
    cell.innerHTML = `<span class="day-number">${prevMonthDays - i}</span>`;
    calendarGrid.appendChild(cell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.className = "day-cell";

    const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const event = events[key];

    cell.innerHTML = `<span class="day-number">${day}</span>${event ? `<div class="event">${event}</div>` : ""}`;
    calendarGrid.appendChild(cell);
  }

  while (calendarGrid.children.length < 35) {
    const cell = document.createElement("div");
    cell.className = "day-cell muted";
    cell.innerHTML = `<span class="day-number">${calendarGrid.children.length - daysInMonth - firstDay + 1}</span>`;
    calendarGrid.appendChild(cell);
  }
}

todayLabel.textContent = "17 Jan";

prevMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonth.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

addTaskBtn.addEventListener("click", () => {
  const task = prompt("Enter a new task:");
  if (!task) return;

  const li = document.createElement("li");
  li.innerHTML = `<span class="circle"></span><span>${task}</span>`;
  taskList.appendChild(li);
});

toggleCompleted.addEventListener("click", () => {
  if (completedList.style.display === "none") {
    completedList.style.display = "flex";
  } else {
    completedList.style.display = "none";
  }
});

renderCalendar(currentDate);

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
