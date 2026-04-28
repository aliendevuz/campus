/* ============================================
   js/main.js — Global interactions & animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------
     1. NAVBAR — scroll state + burger menu
  ------------------------------------------------ */
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('nav-burger');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  burger?.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
    // Animate burger to X
    const spans = burger.querySelectorAll('span');
    if (navbar.classList.contains('menu-open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on nav link click
  document.querySelectorAll('.navbar__links a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('menu-open');
      const spans = burger?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  });


  /* ------------------------------------------------
     2. SCROLL-TRIGGERED ANIMATIONS
        Watches [data-animate] elements and adds
        .is-visible when they enter the viewport.
  ------------------------------------------------ */
  const animElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15 }
  );

  animElements.forEach(el => observer.observe(el));


  /* ------------------------------------------------
     3. PROGRESS BAR ANIMATION (Hero card)
        Animate fill widths when card is in view.
  ------------------------------------------------ */
  const progressFills = document.querySelectorAll('.fcard__progress-fill');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // CSS custom property drives the width; just ensure the element is ready
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.3 });

  progressFills.forEach(fill => {
    fill.style.opacity = '0';
    fill.style.transition = 'width 1.4s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease';
    progressObserver.observe(fill);
    // Small delay to let CSS pick up the width after paint
    setTimeout(() => { fill.style.opacity = '1'; }, 400);
  });


  /* ------------------------------------------------
     4. SMOOTH ACTIVE NAV LINK HIGHLIGHT
        Highlights the nav link matching the current
        section in the viewport.
  ------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ------------------------------------------------
     5. PARALLAX GLOWS on mouse move (hero only)
  ------------------------------------------------ */
  const hero = document.querySelector('.hero');
  const glow1 = document.querySelector('.hero__glow--1');
  const glow2 = document.querySelector('.hero__glow--2');

  if (hero && glow1 && glow2) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth  - 0.5) * 2; // -1 to 1
      const yPct = (clientY / innerHeight - 0.5) * 2;

      glow1.style.transform = `translate(${xPct * 20}px, ${yPct * 15}px)`;
      glow2.style.transform = `translate(${xPct * -15}px, ${yPct * -20}px)`;
    });
  }


  /* ------------------------------------------------
     6. COUNTER ANIMATION — stat items count up when
        they scroll into view.
  ------------------------------------------------ */
  window.animateCounter = function(el, end, duration = 1800, suffix = '', decimals = 0) {
    if (!el) return;
    const startTime = performance.now();
    const update = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * end;
      el.textContent = (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  // Hook counters to scroll-trigger
  const statValues = document.querySelectorAll('.stat-item__value[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el       = entry.target;
        const end      = parseFloat(el.dataset.count);
        const suffix   = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimal || '0', 10);
        window.animateCounter(el, end, 2000, suffix, decimals);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  statValues.forEach(el => counterObserver.observe(el));


  /* ------------------------------------------------
     7. CARD TILT effect on float-cards (subtle 3-D)
  ------------------------------------------------ */
  document.querySelectorAll('.float-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -6;
      const rotY   = ((x - cx) / cx) *  6;
      card.style.transform  = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });


  /* ------------------------------------------------
     8. COURSE FILTER TABS
        Filters .course-card items by data-cat.
        Cards fade out then hidden, visible ones fade in.
  ------------------------------------------------ */
  const filterTabs  = document.querySelectorAll('.ctab');
  const courseCards = document.querySelectorAll('.course-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('ctab--active'));
      tab.classList.add('ctab--active');

      const filter = tab.dataset.filter;

      courseCards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        if (match) {
          card.style.display    = '';
          card.style.opacity    = '0';
          card.style.transform  = 'translateY(16px)';
          // Force reflow
          void card.offsetWidth;
          card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          card.style.opacity    = '1';
          card.style.transform  = 'translateY(0)';
        } else {
          card.style.transition = 'opacity 0.2s ease';
          card.style.opacity    = '0';
          setTimeout(() => {
            if (tab.classList.contains('ctab--active')) {
              card.style.display = 'none';
            }
          }, 220);
        }
      });
    });
  });


  /* ------------------------------------------------
     9. PRICING BILLING TOGGLE
        Switches prices between monthly and annual
  ------------------------------------------------ */
  const billingToggle = document.getElementById('billing-toggle');
  const priceAmounts = document.querySelectorAll('.price-card .amount');
  const toggleLabels = document.querySelectorAll('.toggle-label');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;
      
      // Update labels active state
      toggleLabels[0].classList.toggle('active', !isAnnual);
      toggleLabels[1].classList.toggle('active', isAnnual);

      // Update price values
      priceAmounts.forEach(el => {
        if (el.dataset.monthly && el.dataset.annual) {
          // Simple fade effect
          el.style.opacity = '0';
          setTimeout(() => {
            el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
            el.style.opacity = '1';
          }, 200);
        }
      });
    });
  }


  /* ------------------------------------------------
     10. ACTIVE NAV LINK style injection
  ------------------------------------------------ */
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .navbar__links a.active {
      color: var(--clr-text);
    }
    .navbar__links a.active::after {
      width: 100%;
    }
    .price-card .amount {
      transition: opacity 0.2s ease;
    }
  `;
  document.head.appendChild(styleEl);

});

