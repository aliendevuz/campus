
    const toggle = document.getElementById("billingToggle");
    const prices = document.querySelectorAll(".price");
    let yearly = false;

    toggle.addEventListener("click", () => {
      yearly = !yearly;
      toggle.classList.toggle("active");

      prices.forEach((price) => {
        const monthly = price.dataset.monthly;
        const yearlyValue = price.dataset.yearly;

        if (yearly) {
          price.textContent = `$${yearlyValue}/y`;
        } else {
          price.textContent = `$${monthly}/m`;
        }
      });
    });

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", () => {
        faqItems.forEach((faq) => {
          if (faq !== item) faq.classList.remove("active");
        });

        item.classList.toggle("active");
      });
    });

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        return;
      }

      if (!email.includes("@") || !email.includes(".")) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
      }

      formMessage.textContent = "Message sent successfully.";
      form.reset();
    });