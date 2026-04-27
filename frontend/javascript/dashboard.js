// script.js
const filterButton = document.querySelector(".filter-btn");
const courseCards = document.querySelectorAll(".course-card");
const bars = document.querySelectorAll(".bar");
const xpButton = document.querySelector(".xp-card button");

filterButton.addEventListener("click", () => {
  filterButton.classList.toggle("active");
  filterButton.innerHTML = filterButton.classList.contains("active")
    ? '<i class="fa-regular fa-calendar"></i>Last 7 Days <i class="fa-solid fa-caret-down"></i>'
    : '<i class="fa-regular fa-calendar"></i>Last 2 Weeks <i class="fa-solid fa-caret-down"></i>';
});

courseCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-6px)";
    card.style.transition = "0.25s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

let animated = false;

function animateBarsOnScroll() {
  const activityCard = document.querySelector(".activity-card");
  const trigger = activityCard.getBoundingClientRect().top;

  if (trigger < window.innerHeight - 80 && !animated) {
    bars.forEach((bar, index) => {
      bar.style.animationDelay = `${index * 0.04}s`;
    });
    animated = true;
  }
}

window.addEventListener("scroll", animateBarsOnScroll);
window.addEventListener("load", animateBarsOnScroll);

xpButton.addEventListener("click", () => {
  xpButton.textContent = "Redeemed";
  xpButton.style.background = "#9d51ff";
  xpButton.style.color = "#fff";
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
