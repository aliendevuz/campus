// script.js
const rocketCircle = document.getElementById("rocketCircle");
const comingBadge = document.getElementById("comingBadge");

function animateComingSoon() {
  rocketCircle.classList.toggle("float");
  comingBadge.classList.toggle("show");
}

setInterval(animateComingSoon, 1200);

rocketCircle.addEventListener("mouseenter", () => {
  rocketCircle.style.transform = "translateY(-12px) scale(1.05)";
  comingBadge.style.transform = "scale(1.06)";
});

rocketCircle.addEventListener("mouseleave", () => {
  rocketCircle.style.transform = "";
  comingBadge.style.transform = "";
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
